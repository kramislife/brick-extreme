import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FORM_FIELDS } from "@/constant/paymentMethod";
import Select from "react-select";
import { countries } from "countries-list";
import { MapPin } from "lucide-react";

const ShippingSection = ({ address, onAddressChange }) => {
  const [userCountry, setUserCountry] = useState(null);

  // Extract common input styles
  const inputClassName =
    "bg-brand/10 border-white/10 border rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300 h-12 placeholder:text-white/80 font-extralight text-white";

  // Convert countries object to array format for react-select
  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
    flag: country.emoji,
  }));

  // Custom styles for react-select to match the dark theme
  const customStyles = {
    control: (base) => ({
      ...base,
      background: "rgb(19 39 66 / 0.1)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      "&:hover": {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
      borderRadius: "0.5rem",
      height: "48px",
    }),
    menu: (base) => ({
      ...base,
      background: "rgb(31, 41, 55)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "rgba(255, 255, 255, 0.1)" : "transparent",
      color: "white",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.1)",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    input: (base) => ({
      ...base,
      color: "white",
    }),
  };

  // Get user's country using geolocation and IP
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        const countryCode = data.country_code;
        const country = countryOptions.find(
          (option) => option.value === countryCode
        );
        if (country) {
          setUserCountry(country);
          onAddressChange(FORM_FIELDS.ADDRESS.COUNTRY, country.label);
        }
      })
      .catch((error) => console.error("Error fetching location:", error));
  }, []);

  return (
    <Card className="bg-darkBrand/20 backdrop-blur-xl border-white/10">
      <CardHeader className="flex flex-row items-center gap-3 pb-6">
        <MapPin className="w-5 h-5 text-blue-400" />
        <CardTitle className="text-white text-lg font-medium">Shipping Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Country/Region Selector - Full Width */}
        <div className="w-full">
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
        </div>

        {/* First Name and Last Name - Two Columns */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="First name (optional)"
            value={address[FORM_FIELDS.ADDRESS.FIRST_NAME]}
            onChange={(e) =>
              onAddressChange(FORM_FIELDS.ADDRESS.FIRST_NAME, e.target.value)
            }
            className={inputClassName}
          />
          <Input
            placeholder="Last name"
            value={address[FORM_FIELDS.ADDRESS.LAST_NAME]}
            onChange={(e) =>
              onAddressChange(FORM_FIELDS.ADDRESS.LAST_NAME, e.target.value)
            }
            className={inputClassName}
            required
          />
        </div>

        {/* Address - Full Width */}
        <Input
          placeholder="Address"
          value={address[FORM_FIELDS.ADDRESS.STREET]}
          onChange={(e) =>
            onAddressChange(FORM_FIELDS.ADDRESS.STREET, e.target.value)
          }
          className={inputClassName}
          required
        />

        {/* Apartment (optional) - Full Width */}
        <Input
          placeholder="Apartment, suite, etc. (optional)"
          value={address[FORM_FIELDS.ADDRESS.APARTMENT]}
          onChange={(e) =>
            onAddressChange(FORM_FIELDS.ADDRESS.APARTMENT, e.target.value)
          }
          className={inputClassName}
        />

        {/* Postal Code and City - Two Columns */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Postal code"
            value={address[FORM_FIELDS.ADDRESS.ZIP_CODE]}
            onChange={(e) =>
              onAddressChange(FORM_FIELDS.ADDRESS.ZIP_CODE, e.target.value)
            }
            className={inputClassName}
            required
          />
          <Input
            placeholder="City"
            value={address[FORM_FIELDS.ADDRESS.CITY]}
            onChange={(e) =>
              onAddressChange(FORM_FIELDS.ADDRESS.CITY, e.target.value)
            }
            className={inputClassName}
            required
          />
        </div>

        {/* Region Selector - Full Width */}
        <Input
          placeholder="Region"
          value={address[FORM_FIELDS.ADDRESS.STATE]}
          onChange={(e) =>
            onAddressChange(FORM_FIELDS.ADDRESS.STATE, e.target.value)
          }
          className={inputClassName}
          required
        />

        {/* Phone - Full Width */}
        <Input
          type="tel"
          placeholder="Phone Number"
          value={address[FORM_FIELDS.ADDRESS.PHONE]}
          onChange={(e) =>
            onAddressChange(FORM_FIELDS.ADDRESS.PHONE, e.target.value)
          }
          className={inputClassName}
          required
        />
      </CardContent>
    </Card>
  );
};

export default ShippingSection;
