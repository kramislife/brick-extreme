import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Calendar, HelpCircle } from "lucide-react";
import Stripe from "@/assets/Stripe.svg";
import Mastercard from "@/assets/Mastercard.svg";
import DeliverySection from "./ShippingSection";
import BillingSection from "./BillingSection";

const CardSection = ({
  useShippingAddress,
  setUseShippingAddress,
  billingAddress,
  setBillingAddress,
  onSubmit,
  address,
}) => {
  // Input styles
  const inputClassName =
    "bg-brand/10 border-white/10 border rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300 h-12 placeholder:text-white/80 font-extralight text-white";

  useEffect(() => {
    if (useShippingAddress && address) {
      setBillingAddress(address);
    }
  }, [useShippingAddress, address]);

  return (
    <div className="space-y-6">
      <div className="mt-4 space-y-4">
        {/* Card number input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Card number"
            className={`${inputClassName} pr-20`}
            required
            maxLength="19"
            pattern="\d*"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <img src={Mastercard} alt="Mastercard" className="h-6 w-auto" />
            <img src={Stripe} alt="Stripe" className="h-6 w-auto" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Expiration date input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Expiration date (MM/YY)"
              className={`${inputClassName} pr-10`}
              required
              maxLength="5"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Security code input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Security code"
              className={`${inputClassName} pr-10`}
              required
              maxLength="4"
              pattern="\d*"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <HelpCircle className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Name on card input */}
        <Input
          type="text"
          placeholder="Name on card"
          className={inputClassName}
          required
        />
      </div>

      {/* Use shipping address as billing address checkbox */}
      <div className="mt-6">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useShippingAddress}
            onChange={(e) => setUseShippingAddress(e.target.checked)}
            className="sr-only peer"
          />
          <div className="relative w-5 h-5 border border-white/20 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200">
            <svg
              className={`absolute inset-0 w-full h-full stroke-white stroke-[4] ${
                useShippingAddress ? "opacity-100" : "opacity-0"
              } transition-opacity duration-200`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span className="ml-3 text-sm text-white/90">
            Use shipping address as billing address
          </span>
        </label>
      </div>

      {/* Delivery section - If shipping address is false shows the delivery section fields*/}
      {!useShippingAddress && (
        <div className="mt-6">
          <BillingSection
            address={billingAddress}
            onAddressChange={(field, value) => {
              setBillingAddress((prev) => ({
                ...prev,
                [field]: value,
              }));
            }}
          />
        </div>
      )}
      <button
        className="w-full bg-[#0070ba] hover:bg-[#003087] text-white py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
        type="submit"
        onClick={onSubmit}
      >
        <span className="font-semibold">Pay Now</span>
      </button>
    </div>
  );
};

export default CardSection;
