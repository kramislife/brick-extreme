import React from "react";
import { CreditCard } from "lucide-react";
import AddressForm from "./AddressForm";
import { FORM_FIELDS } from "@/constant/paymentMethod";

const BillingSection = ({ address, onAddressChange }) => {
  return (
    <div className="space-y-4 p-4 bg-darkBrand/10 rounded-lg border border-white/5">
      <h3 className="text-white/90 text-sm font-medium flex items-center gap-2">
        <CreditCard className="w-4 h-4" />
        Billing Address
      </h3>
      <AddressForm
        address={address}
        onAddressChange={onAddressChange}
        formFields={FORM_FIELDS.ADDRESS}
      />
    </div>
  );
};

export default BillingSection;
