import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAYMENT_METHODS, FORM_FIELDS } from "@/constant/paymentMethod";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/features/cartSlice";
// import { useSubmitCheckoutMutation } from "@/redux/api/checkoutApi";
import { toast } from "react-toastify";

const useCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  // const [submitCheckout, { isLoading }] = useSubmitCheckoutMutation();

  // Form states
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    [FORM_FIELDS.ADDRESS.FIRST_NAME]: "",
    [FORM_FIELDS.ADDRESS.LAST_NAME]: "",
    [FORM_FIELDS.ADDRESS.PHONE]: "",
    [FORM_FIELDS.ADDRESS.STREET]: "",
    [FORM_FIELDS.ADDRESS.APARTMENT]: "",
    [FORM_FIELDS.ADDRESS.CITY]: "",
    [FORM_FIELDS.ADDRESS.STATE]: "",
    [FORM_FIELDS.ADDRESS.ZIP_CODE]: "",
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
    // If unchecked, keep the current billing address (don't reset it)
  };

  const handlePaymentMethodChange = (value) => setPaymentMethod(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        email,
        shippingAddress,
        billingAddress: useShippingAddress ? shippingAddress : billingAddress,
        paymentMethod,
        total,
        items: cartItems,
      };

      console.log("Order Checkout Data", orderData);

      // const response = await submitCheckout(orderData).unwrap();

      // // Handle successful checkout
      // setOrderStatus("success");
      // toast.success("Order placed successfully!");

      // // Clear cart after successful checkout
      // dispatch(clearCart());

      // // Redirect based on payment method
      // if (paymentMethod === PAYMENT_METHODS.BANK_TRANSFER) {
      //   navigate("/bank-transfer-instructions", {
      //     state: { orderId: response.orderId },
      //   });
      // } else {
      //   navigate("/order-confirmation", {
      //     state: { orderId: response.orderId },
      //   });
      // }
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

  return {
    email,
    address: shippingAddress,
    billingAddress,
    paymentMethod,
    cartItems,
    total,
    orderStatus,
    // isLoading,
    useShippingAddress,
    handleEmailChange,
    handleAddressChange,
    handleBillingAddressChange,
    handlePaymentMethodChange,
    handleSubmit,
    handleUseShippingAddressChange,
    handleUpdateQuantity,
    handleRemoveItem,
  };
};

export default useCheckout;
