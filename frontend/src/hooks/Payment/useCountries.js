import { useState, useEffect } from "react";
import { countries } from "countries-list";

export const useCountries = (onCountrySelect) => {
  const [userCountry, setUserCountry] = useState(null);

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
          onCountrySelect(country.label);
        }
      })
      .catch((error) => console.error("Error fetching location:", error));
  }, []);

  return {
    userCountry,
    setUserCountry,
    countryOptions,
    customStyles,
  };
};
