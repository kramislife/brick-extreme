import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAYMENT_METHODS, FORM_FIELDS } from "@/constant/paymentMethod";
import { updateQuantity, removeFromCart } from "@/redux/features/cartSlice";

const useCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

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

      console.log("Processing checkout...", orderData);

      if (paymentMethod === PAYMENT_METHODS.BANK_TRANSFER) {
        setOrderStatus("pending");
        navigate("/bank-transfer-instructions");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setOrderStatus("error");
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
