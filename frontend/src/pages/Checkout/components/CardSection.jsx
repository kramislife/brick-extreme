import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Calendar, HelpCircle } from "lucide-react";
import Stripe from "@/assets/Stripe.svg";
import Mastercard from "@/assets/Mastercard.svg";
import BillingSection from "./BillingSection";
import { FORM_FIELDS } from "@/constant/paymentMethod";
import { Checkbox } from "@/components/ui/checkbox";

const CardSection = ({
  useShippingAddress,
  setUseShippingAddress,
  billingAddress,
  onBillingAddressChange,
  address,
  onSubmit,
}) => {
  // Input styles
  const inputClassName =
    "bg-brand/10 border-white/10 border rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300 h-12 placeholder:text-white/80 font-light text-white";

  useEffect(() => {
    if (useShippingAddress && address) {
      // Update all billing address fields to match shipping address
      Object.keys(FORM_FIELDS.ADDRESS).forEach((field) => {
        onBillingAddressChange(
          FORM_FIELDS.ADDRESS[field],
          address[FORM_FIELDS.ADDRESS[field]]
        );
      });
    }
  }, [useShippingAddress, address, onBillingAddressChange]);

  return (
    <div className="space-y-6">
      <div className="mt-4 space-y-4">
        {/* Card number input */}
        <div className="relative">
          <Input
            type="text"
            variant="floating"
            label="Card number"
            placeholder=" "
            required
            maxLength="19"
            pattern="\d*"
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, "");
              const formatted = value.match(/.{1,4}/g)?.join("-") || value;
              e.target.value = formatted;
            }}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            <img src={Mastercard} alt="Mastercard" className="h-6 w-auto" />
            <img src={Stripe} alt="Stripe" className="h-6 w-auto" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Expiration date input */}
          <div className="relative">
            <Input
              type="text"
              variant="floating"
              label="Expiration date (MM/YY)"
              placeholder=" "
              required
              maxLength="5"
              pattern="\d*"
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, "");
                const formatted = value.match(/.{1,2}/g)?.join("/") || value;
                e.target.value = formatted;
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Security code (CVV) input */}
          <div className="relative group">
            <Input
              type="text"
              variant="floating"
              label="CVV"
              placeholder=" "
              required
              maxLength="4"
              pattern="\d*"
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, "");
                e.target.value = value;
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-help">
              <HelpCircle className="h-5 w-5 text-gray-400" />
              <div className="invisible group-hover:visible absolute right-0 bottom-full mb-3 w-60 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg leading-relaxed font-light">
                A 3-4 digit security code on back of your card
              </div>
            </div>
          </div>
        </div>

        {/* Name on card input */}
        <Input
          type="text"
          variant="floating"
          label="Name on card"
          placeholder=" "
          required
        />
      </div>

      {/* Use shipping address as billing address checkbox */}
      {/* <div className="mt-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="shipping-billing"
            checked={useShippingAddress}
            onCheckedChange={setUseShippingAddress}
            className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
          />
          <label
            htmlFor="shipping-billing"
            className="text-sm leading-none text-white/90"
          >
            Use shipping address as billing address
          </label>
        </div>
      </div> */}

      {/* Billing section - If shipping address is false shows the billing section fields*/}
      {/* {!useShippingAddress && (
        <div className="mt-6">
          <BillingSection
            address={billingAddress}
            onAddressChange={onBillingAddressChange}
          />
        </div>
      )} */}
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
        type="submit"
        onClick={onSubmit}
      >
        <span className="font-semibold">Pay Now</span>
      </button>
    </div>
  );
};

export default CardSection;
