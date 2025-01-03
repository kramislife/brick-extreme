import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PAYMENT_METHODS } from "@/constant/paymentMethod";
import CreditCard from "@/assets/Creditcard.png";
import PayPal from "@/assets/Paypal.png";
import CardSection from "./CardSection";
import PayPalSection from "./PayPalSection";

const PaymentSection = ({
  paymentMethod,
  onPaymentMethodChange,
  total,
  address,
  onSubmit,
}) => {
  const [useShippingAddress, setUseShippingAddress] = useState(true);
  const [billingAddress, setBillingAddress] = useState({});

  // Get payment button styles
  const getPaymentButtonStyles = (isSelected) => {
    return `w-full h-10 rounded-md transition-all duration-200 flex items-center justify-center ${
      isSelected
        ? "ring-2 ring-blue-500"
        : "hover:border-blue-300 border border-white/10"
    }`;
  };

  return (
    <Card className="bg-darkBrand/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onPaymentMethodChange(PAYMENT_METHODS.CREDIT_CARD)}
            className={`${getPaymentButtonStyles(
              paymentMethod === PAYMENT_METHODS.CREDIT_CARD
            )} bg-white`}
          >
            <div className="flex items-center gap-2">
              <img src={CreditCard} alt="Credit Card" className="h-8 w-auto" />
              <span className="text-black">Credit and Debit Card</span>
            </div>
          </button>

          <button
            onClick={() => onPaymentMethodChange(PAYMENT_METHODS.PAYPAL)}
            className={`${getPaymentButtonStyles(
              paymentMethod === PAYMENT_METHODS.PAYPAL
            )} bg-yellow-300`}
          >
            <img src={PayPal} alt="PayPal" className="h-20 w-auto" />
          </button>
        </div>

        {/* Card Section - If payment method is credit and debit card */}
        {paymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
          <CardSection
            useShippingAddress={useShippingAddress}
            setUseShippingAddress={setUseShippingAddress}
            billingAddress={billingAddress}
            setBillingAddress={setBillingAddress}
            onSubmit={onSubmit}
          />
        )}

        {/* PayPal Section - If payment method is PayPal */}
        {paymentMethod === PAYMENT_METHODS.PAYPAL && <PayPalSection />}
      </CardContent>
    </Card>
  );
};

export default PaymentSection;
