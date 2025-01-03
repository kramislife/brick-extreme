import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PAYMENT_METHODS } from "@/constant/paymentMethod";
import MasterCard from "@/assets/mastercard.svg";
import Visa from "@/assets/visa.png";
import Stripe from "@/assets/stripe.svg";
import PayPal from "@/assets/Paypal.png";
import CardSection from "./CardSection";
import PayPalSection from "./PayPalSection";
import { CreditCard } from "lucide-react";

const PaymentSection = ({
  paymentMethod,
  onPaymentMethodChange,
  total,
  address,
  onSubmit,
  useShippingAddress,
  setUseShippingAddress,
  billingAddress,
  onBillingAddressChange,
}) => {
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
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <CreditCard className="w-5 h-5 text-blue-400" />
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
            <div className="flex items-center gap-1">
              <img src={MasterCard} alt="Credit Card" className="h-8 w-auto" />
              <img src={Visa} alt="Credit Card" className="h-8 w-auto" />
              <img src={Stripe} alt="Credit Card" className="h-6 w-auto" />
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

        {paymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
          <CardSection
            useShippingAddress={useShippingAddress}
            setUseShippingAddress={setUseShippingAddress}
            billingAddress={billingAddress}
            onBillingAddressChange={onBillingAddressChange}
            address={address}
            onSubmit={onSubmit}
          />
        )}

        {paymentMethod === PAYMENT_METHODS.PAYPAL && <PayPalSection />}
      </CardContent>
    </Card>
  );
};

export default PaymentSection;
