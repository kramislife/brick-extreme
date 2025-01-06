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
  const [paymentMethod, setPaymentMethod] = useState(
    PAYMENT_METHODS.CREDIT_CARD
  );
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

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

    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePaymentMethodChange = (value) => setPaymentMethod(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const finalShippingAddress = selectedShippingAddress
        ? {
            full_name: userData?.name,
            ...selectedShippingAddress,
          }
        : {
            ...shippingAddress,
            full_name: userData?.name,
          };

      const orderData = {
        email,
        shippingAddress: finalShippingAddress,
        paymentMethod,
        cardDetails: {
          cardNumber: cardDetails.cardNumber,
          expiryDate: cardDetails.expiryDate,
          nameOnCard: cardDetails.nameOnCard,
        },
        total,
        items: cartItems,
      };

      console.log("Order Checkout Data:", orderData);

      // TODO: Implement actual checkout
    } catch (error) {
      console.error("Checkout error:", error);
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

  const handleCardDetailsChange = (field, value) => {
    setCardDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    email,
    address: shippingAddress,
    paymentMethod,
    cartItems,
    total,
    handleEmailChange,
    handleAddressChange,
    handlePaymentMethodChange,
    handleSubmit,
    handleUpdateQuantity,
    handleRemoveItem,
    userAddresses,
    user: userData,
    selectedShippingAddress,
    handleCardDetailsChange,
    cardDetails,
  };
};

export default useCheckout;
