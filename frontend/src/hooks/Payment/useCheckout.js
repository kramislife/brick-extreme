import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAYMENT_METHODS, FORM_FIELDS } from "@/constant/paymentMethod";
import { updateQuantity, removeFromCart } from "@/redux/features/cartSlice";

const useCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    [FORM_FIELDS.ADDRESS.FIRST_NAME]: "",
    [FORM_FIELDS.ADDRESS.LAST_NAME]: "",
    [FORM_FIELDS.ADDRESS.PHONE]: "",
    [FORM_FIELDS.ADDRESS.STREET]: "",
    [FORM_FIELDS.ADDRESS.CITY]: "",
    [FORM_FIELDS.ADDRESS.STATE]: "",
    [FORM_FIELDS.ADDRESS.ZIP_CODE]: "",
    [FORM_FIELDS.ADDRESS.COUNTRY]: "",
  });
  const [paymentMethod, setPaymentMethod] = useState(
    PAYMENT_METHODS.CREDIT_CARD
  );
  const [orderStatus, setOrderStatus] = useState(null);
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    [FORM_FIELDS.BILLING_ADDRESS.FIRST_NAME]: "",
    [FORM_FIELDS.BILLING_ADDRESS.LAST_NAME]: "",
    [FORM_FIELDS.BILLING_ADDRESS.PHONE]: "",
    [FORM_FIELDS.BILLING_ADDRESS.STREET]: "",
    [FORM_FIELDS.BILLING_ADDRESS.APARTMENT]: "",
    [FORM_FIELDS.BILLING_ADDRESS.CITY]: "",
    [FORM_FIELDS.BILLING_ADDRESS.STATE]: "",
    [FORM_FIELDS.BILLING_ADDRESS.ZIP_CODE]: "",
    [FORM_FIELDS.BILLING_ADDRESS.COUNTRY]: "",
  });

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleAddressChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handlePaypalSuccess = (details) => {
    setOrderStatus("processing");
    // Handle successful payment
    console.log("Payment successful!", details);
    // Navigate to success page or show success message
    navigate("/order-success");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Process the checkout here
      const orderData = {
        email,
        address,
        paymentMethod,
        total,
        items: cartItems,
        status: "pending",
      };

      console.log("Processing checkout...", orderData);

      // If it's PayPal, the PayPal component will handle the payment
      if (paymentMethod === PAYMENT_METHODS.BANK_TRANSFER) {
        // Handle bank transfer logic
        setOrderStatus("pending");
        // You might want to navigate to a bank transfer instructions page
        navigate("/bank-transfer-instructions");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setOrderStatus("error");
    }
  };

  const handleUseSameAddressChange = (checked) => {
    setUseSameAddress(checked);
    // If checked, reset billing address
    if (checked) {
      setBillingAddress({
        [FORM_FIELDS.BILLING_ADDRESS.FIRST_NAME]: "",
        [FORM_FIELDS.BILLING_ADDRESS.LAST_NAME]: "",
        [FORM_FIELDS.BILLING_ADDRESS.PHONE]: "",
        [FORM_FIELDS.BILLING_ADDRESS.STREET]: "",
        [FORM_FIELDS.BILLING_ADDRESS.APARTMENT]: "",
        [FORM_FIELDS.BILLING_ADDRESS.CITY]: "",
        [FORM_FIELDS.BILLING_ADDRESS.STATE]: "",
        [FORM_FIELDS.BILLING_ADDRESS.ZIP_CODE]: "",
        [FORM_FIELDS.BILLING_ADDRESS.COUNTRY]: "",
      });
    }
  };

  const handleBillingAddressChange = (field, value) => {
    setBillingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
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
    address,
    paymentMethod,
    cartItems,
    total,
    orderStatus,
    handleEmailChange,
    handleAddressChange,
    handlePaymentMethodChange,
    handlePaypalSuccess,
    handleSubmit,
    useSameAddress,
    billingAddress,
    handleUseSameAddressChange,
    handleBillingAddressChange,
    handleUpdateQuantity,
    handleRemoveItem,
  };
};

export default useCheckout;
