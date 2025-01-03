import React from "react";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";
import { FORM_FIELDS } from "@/constant/paymentMethod";
import { useCountries } from "@/hooks/Payment/useCountries";
import Select from "react-select";

const BillingSection = ({ address, onAddressChange }) => {
  const { userCountry, setUserCountry, countryOptions, customStyles } =
    useCountries((countryLabel) =>
      onAddressChange(FORM_FIELDS.ADDRESS.COUNTRY, countryLabel)
    );

  const inputClassName =
    "bg-brand/5 border-white/5 border rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300 h-12 placeholder:text-white/80 font-extralight text-white";

  return (
    <div className="space-y-4 p-4 bg-darkBrand/10 rounded-lg border border-white/5">
      <h3 className="text-white/90 text-sm font-medium flex items-center gap-2">
        <CreditCard className="w-4 h-4" />
        Billing Address
      </h3>

      <Select
        options={countryOptions}
        value={userCountry}
        onChange={(option) => {
          setUserCountry(option);
          onAddressChange(FORM_FIELDS.ADDRESS.COUNTRY, option.label);
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

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="First name (optional)"
          value={address?.[FORM_FIELDS.ADDRESS.FIRST_NAME] ?? ""}
          onChange={(e) =>
            onAddressChange(FORM_FIELDS.ADDRESS.FIRST_NAME, e.target.value)
          }
          className={inputClassName}
        />
        <Input
          placeholder="Last name"
          value={address?.[FORM_FIELDS.ADDRESS.LAST_NAME] ?? ""}
          onChange={(e) =>
            onAddressChange(FORM_FIELDS.ADDRESS.LAST_NAME, e.target.value)
          }
          className={inputClassName}
          required
        />
      </div>

      <Input
        placeholder="Street address"
        value={address?.[FORM_FIELDS.ADDRESS.STREET] ?? ""}
        onChange={(e) =>
          onAddressChange(FORM_FIELDS.ADDRESS.STREET, e.target.value)
        }
        className={inputClassName}
        required
      />

      <Input
        placeholder="Apartment, suite, etc. (optional)"
        value={address?.[FORM_FIELDS.ADDRESS.APARTMENT] ?? ""}
        onChange={(e) =>
          onAddressChange(FORM_FIELDS.ADDRESS.APARTMENT, e.target.value)
        }
        className={inputClassName}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Postal code"
          value={address?.[FORM_FIELDS.ADDRESS.ZIP_CODE] ?? ""}
          onChange={(e) =>
            onAddressChange(FORM_FIELDS.ADDRESS.ZIP_CODE, e.target.value)
          }
          className={inputClassName}
          required
        />
        <Input
          placeholder="City"
          value={address?.[FORM_FIELDS.ADDRESS.CITY] ?? ""}
          onChange={(e) =>
            onAddressChange(FORM_FIELDS.ADDRESS.CITY, e.target.value)
          }
          className={inputClassName}
          required
        />
      </div>

      <Input
        placeholder="Region/State"
        value={address?.[FORM_FIELDS.ADDRESS.STATE] ?? ""}
        onChange={(e) =>
          onAddressChange(FORM_FIELDS.ADDRESS.STATE, e.target.value)
        }
        className={inputClassName}
        required
      />

      <Input
        type="tel"
        placeholder="Phone Number"
        value={address?.[FORM_FIELDS.ADDRESS.PHONE] ?? ""}
        onChange={(e) =>
          onAddressChange(FORM_FIELDS.ADDRESS.PHONE, e.target.value)
        }
        className={inputClassName}
        required
      />
    </div>
  );
};

export default BillingSection;
