import React from "react";
import ContactSection from "./components/ContactSection";
import ShippingSection from "./components/ShippingSection";
import PaymentSection from "./components/PaymentSection";
import OrderSummary from "./components/OrderSummary";
import useCheckout from "@/hooks/Payment/useCheckout";

const Checkout = () => {
  const {
    email,
    address,
    paymentMethod,
    cartItems,
    total,
    handleEmailChange,
    handleAddressChange,
    handlePaymentMethodChange,
    handleSubmit,
    handleUpdateQuantity,
    handleRemoveItem,
    useShippingAddress,
    billingAddress,
    handleBillingAddressChange,
    handleUseShippingAddressChange,
  } = useCheckout();

  return (
    <div className="min-h-screen bg-brand-gradient py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left Column - Forms */}
          <div className="space-y-6 overflow-y-auto ">
            <form onSubmit={handleSubmit} className="space-y-5">
              <ContactSection email={email} onEmailChange={handleEmailChange} />
              <ShippingSection
                address={address}
                onAddressChange={handleAddressChange}
              />
              <PaymentSection
                paymentMethod={paymentMethod}
                onPaymentMethodChange={handlePaymentMethodChange}
                total={total}
                useShippingAddress={useShippingAddress}
                setUseShippingAddress={handleUseShippingAddressChange}
                billingAddress={billingAddress}
                onBillingAddressChange={handleBillingAddressChange}
                onSubmit={handleSubmit}
              />
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-28 h-fit">
            <OrderSummary
              cartItems={cartItems}
              total={total}
              updateQuantity={handleUpdateQuantity}
              removeItem={handleRemoveItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
