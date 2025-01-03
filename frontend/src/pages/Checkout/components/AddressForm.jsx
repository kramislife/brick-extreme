import React from "react";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { useCountries } from "@/hooks/Payment/useCountries";

const AddressForm = ({ address, onAddressChange, formFields }) => {
  const { userCountry, setUserCountry, countryOptions, customStyles } =
    useCountries((countryLabel) =>
      onAddressChange(formFields.COUNTRY, countryLabel)
    );

  const inputClassName =
    "bg-brand/5 border-white/5 border rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300 h-12 placeholder:text-white/80 font-light text-white";

  return (
    <div className="space-y-4">
      {/* Select Country */}
      <Select
        options={countryOptions}
        value={userCountry}
        onChange={(option) => {
          setUserCountry(option);
          onAddressChange(formFields.COUNTRY, option.label);
        }}
        styles={customStyles}
        placeholder="Country/Region"
        formatOptionLabel={({ label, flag }) => (
          <div className="flex items-center gap-2">
            <span>{flag}</span>
            <span className="text-sm">{label}</span>
          </div>
        )}
        required
      />

      {/* Name */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="First name (optional)"
          value={address?.[formFields.FIRST_NAME] ?? ""}
          onChange={(e) =>
            onAddressChange(formFields.FIRST_NAME, e.target.value)
          }
          className={inputClassName}
        />
        <Input
          placeholder="Last name"
          value={address?.[formFields.LAST_NAME] ?? ""}
          onChange={(e) =>
            onAddressChange(formFields.LAST_NAME, e.target.value)
          }
          className={inputClassName}
          required
        />
      </div>

      {/* Street Address */}
      <Input
        placeholder="Street address"
        value={address?.[formFields.STREET] ?? ""}
        onChange={(e) => onAddressChange(formFields.STREET, e.target.value)}
        className={inputClassName}
        required
      />

      {/* Apartment, suite, etc. */}
      <Input
        placeholder="Apartment, suite, etc. (optional)"
        value={address?.[formFields.APARTMENT] ?? ""}
        onChange={(e) => onAddressChange(formFields.APARTMENT, e.target.value)}
        className={inputClassName}
      />

      {/* Postal code and City */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Postal code"
          value={address?.[formFields.ZIP_CODE] ?? ""}
          onChange={(e) => onAddressChange(formFields.ZIP_CODE, e.target.value)}
          className={inputClassName}
          required
        />
        <Input
          placeholder="City"
          value={address?.[formFields.CITY] ?? ""}
          onChange={(e) => onAddressChange(formFields.CITY, e.target.value)}
          className={inputClassName}
          required
        />
      </div>

      {/* Region/State */}
      <Input
        placeholder="Region/State"
        value={address?.[formFields.STATE] ?? ""}
        onChange={(e) => onAddressChange(formFields.STATE, e.target.value)}
        className={inputClassName}
        required
      />

      {/* Phone Number */}
      <Input
        type="tel"
        placeholder="Phone Number"
        value={address?.[formFields.PHONE] ?? ""}
        onChange={(e) => onAddressChange(formFields.PHONE, e.target.value)}
        className={inputClassName}
        required
      />
    </div>
  );
};

export default AddressForm;
