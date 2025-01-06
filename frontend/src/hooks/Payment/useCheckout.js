import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAYMENT_METHODS, FORM_FIELDS } from "@/constant/paymentMethod";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/features/cartSlice";
import { toast } from "react-toastify";
import { useGetMeQuery, useGetUserAddressesQuery } from "@/redux/api/userApi";

const useCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { data: userData } = useGetMeQuery();
  const { data: userAddresses } = useGetUserAddressesQuery();
  const [useDefaultAddress, setUseDefaultAddress] = useState(false);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);

  // Form states
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    [FORM_FIELDS.ADDRESS.CONTACT_NUMBER]: "",
    [FORM_FIELDS.ADDRESS.ADDRESS_LINE1]: "",
    [FORM_FIELDS.ADDRESS.ADDRESS_LINE2]: "",
    [FORM_FIELDS.ADDRESS.CITY]: "",
    [FORM_FIELDS.ADDRESS.STATE]: "",
    [FORM_FIELDS.ADDRESS.POSTAL_CODE]: "",
    [FORM_FIELDS.ADDRESS.COUNTRY]: "",
  });
  const [billingAddress, setBillingAddress] = useState({ ...shippingAddress });
  const [useShippingAddress, setUseShippingAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(
    PAYMENT_METHODS.CREDIT_CARD
  );
  const [orderStatus, setOrderStatus] = useState(null);

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleEmailChange = (value) => setEmail(value);

  const handleAddressChange = (field, value) => {
    if (field === "selectedAddress") {
      setSelectedShippingAddress(value);
      return;
    }

    const updatedShippingAddress = {
      ...shippingAddress,
      [field]: value,
    };
    setShippingAddress(updatedShippingAddress);

    // Only sync with billing address if useShippingAddress is true
    if (useShippingAddress) {
      setBillingAddress(updatedShippingAddress);
    }
  };

  const handleBillingAddressChange = (field, value) => {
    // Only update billing address if we're not using shipping address
    if (!useShippingAddress) {
      setBillingAddress((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleUseShippingAddressChange = (checked) => {
    setUseShippingAddress(checked);
    if (checked) {
      // If checkbox is checked, copy shipping address to billing
      setBillingAddress({ ...shippingAddress });
    }
  };

  const handlePaymentMethodChange = (value) => setPaymentMethod(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the manually selected address, default address, or form data
      const finalShippingAddress = selectedShippingAddress
        ? {
            full_name: userData?.name,
            contact_number: selectedShippingAddress.contact_number,
            address_line1: selectedShippingAddress.address_line1,
            address_line2: selectedShippingAddress.address_line2,
            city: selectedShippingAddress.city,
            state: selectedShippingAddress.state,
            postal_code: selectedShippingAddress.postal_code,
            country: selectedShippingAddress.country,
          }
        : useDefaultAddress
        ? {
            full_name: userData?.name,
            contact_number: userAddresses?.[0]?.contact_number,
            address_line1: userAddresses?.[0]?.address_line1,
            address_line2: userAddresses?.[0]?.address_line2,
            city: userAddresses?.[0]?.city,
            state: userAddresses?.[0]?.state,
            postal_code: userAddresses?.[0]?.postal_code,
            country: userAddresses?.[0]?.country,
          }
        : {
            ...shippingAddress,
            full_name: userData?.name,
          };

      const orderData = {
        email,
        shippingAddress: finalShippingAddress,
        billingAddress: useShippingAddress
          ? finalShippingAddress
          : {
              ...billingAddress,
              full_name: userData?.name,
            },
        paymentMethod,
        total,
        items: cartItems,
      };

      console.log("Order Checkout Data:", {
        ...orderData,
        selectedAddress: selectedShippingAddress,
        useDefaultAddress,
        userAddresses,
      });

      // Uncomment when ready to implement actual checkout
      // const response = await submitCheckout(orderData).unwrap();
      // setOrderStatus("success");
      // toast.success("Order placed successfully!");
      // dispatch(clearCart());
      // navigate("/order-confirmation", { state: { orderId: response.orderId } });
    } catch (error) {
      console.error("Checkout error:", error);
      setOrderStatus("error");
      toast.error(error.data?.message || "Failed to process checkout");
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ product: productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUseDefaultAddress = (checked) => {
    setUseDefaultAddress(checked);
    if (checked && userAddresses?.length > 0) {
      const defaultAddress =
        userAddresses.find((addr) => addr.is_default) || userAddresses[0];

      setShippingAddress({
        [FORM_FIELDS.ADDRESS.FULL_NAME]: defaultAddress.full_name || "",
        [FORM_FIELDS.ADDRESS.CONTACT_NUMBER]:
          defaultAddress.contact_number || "",
        [FORM_FIELDS.ADDRESS.ADDRESS_LINE1]: defaultAddress.address_line1 || "",
        [FORM_FIELDS.ADDRESS.ADDRESS_LINE2]: defaultAddress.address_line2 || "",
        [FORM_FIELDS.ADDRESS.CITY]: defaultAddress.city || "",
        [FORM_FIELDS.ADDRESS.STATE]: defaultAddress.state || "",
        [FORM_FIELDS.ADDRESS.POSTAL_CODE]: defaultAddress.postal_code || "",
        [FORM_FIELDS.ADDRESS.COUNTRY]: defaultAddress.country || "",
      });
    }
  };

  return {
    email,
    address: shippingAddress,
    billingAddress,
    paymentMethod,
    cartItems,
    total,
    orderStatus,
    useShippingAddress,
    handleEmailChange,
    handleAddressChange,
    handleBillingAddressChange,
    handlePaymentMethodChange,
    handleSubmit,
    handleUseShippingAddressChange,
    handleUpdateQuantity,
    handleRemoveItem,
    useDefaultAddress,
    handleUseDefaultAddress,
    hasDefaultAddress: userAddresses?.length > 0,
    userAddresses,
    user: userData,
    selectedShippingAddress,
  };
};

export default useCheckout;
