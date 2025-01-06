import React from "react";
import { CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { useCountries } from "@/hooks/Payment/useCountries";

const BillingSection = ({ address, onAddressChange }) => {
  const { userCountry, setUserCountry, countryOptions, customStyles } =
    useCountries((countryLabel) => onAddressChange("country", countryLabel));

  const handleFieldChange = (field, value) => {
    onAddressChange(field, value);
  };

  return (
    <div className="space-y-4 p-4 bg-darkBrand/10 rounded-lg border border-white/5">
      <h3 className="text-white/90 text-sm font-medium flex items-center gap-2">
        <CreditCard className="w-4 h-4" />
        Billing Address
      </h3>

      <div className="space-y-6">
        <Select
          options={countryOptions}
          value={userCountry}
          onChange={(option) => {
            setUserCountry(option);
            handleFieldChange("country", option.label);
          }}
          styles={customStyles}
          placeholder="Select Country"
          formatOptionLabel={({ label, flag }) => (
            <div className="flex items-center gap-2">
              <span>{flag}</span>
              <span className="text-sm">{label}</span>
            </div>
          )}
          required
        />

        <div className="grid grid-cols-1 gap-4">
          <Input
            variant="floating"
            label="Address Label (e.g., Home, Work)"
            value={address?.name || ""}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            required
            placeholder=" "
          />
        </div>

        <Input
          variant="floating"
          label="Phone Number"
          value={address?.contact_number || ""}
          onChange={(e) => handleFieldChange("contact_number", e.target.value)}
          required
          type="tel"
          placeholder=" "
        />

        <Input
          variant="floating"
          label="Street Address"
          value={address?.address_line1 || ""}
          onChange={(e) => handleFieldChange("address_line1", e.target.value)}
          required
          placeholder=" "
        />

        <Input
          variant="floating"
          label="Apartment, suite, etc. (optional)"
          value={address?.address_line2 || ""}
          onChange={(e) => handleFieldChange("address_line2", e.target.value)}
          placeholder=" "
        />

        <div className="grid grid-cols-3 gap-4">
          <Input
            variant="floating"
            label="City"
            value={address?.city || ""}
            onChange={(e) => handleFieldChange("city", e.target.value)}
            required
            placeholder=" "
          />
          <Input
            variant="floating"
            label="State/Province"
            value={address?.state || ""}
            onChange={(e) => handleFieldChange("state", e.target.value)}
            required
            placeholder=" "
          />
          <Input
            variant="floating"
            label="Postal Code"
            value={address?.postal_code || ""}
            onChange={(e) => handleFieldChange("postal_code", e.target.value)}
            required
            placeholder=" "
          />
        </div>
      </div>
    </div>
  );
};

export default BillingSection;