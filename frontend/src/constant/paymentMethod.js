// Payment method options
export const PAYMENT_METHODS = {
  PAYPAL: "paypal",
  CREDIT_CARD: "credit_card",
  BANK_TRANSFER: "bank_transfer",
};

// Form field names (for consistency across components)
export const FORM_FIELDS = {
  EMAIL: "email",
  PAYMENT: {
    CARD_NUMBER: "cardNumber",
    EXPIRY_DATE: "expiryDate",
    SECURITY_CODE: "securityCode",
    NAME_ON_CARD: "nameOnCard",
  },
  // Shared address fields that can be used for both shipping and billing
  ADDRESS: {
    COUNTRY: "country",
    FIRST_NAME: "first_name",
    LAST_NAME: "last_name",
    STREET: "street",
    APARTMENT: "apartment",
    ZIP_CODE: "zip_code",
    CITY: "city",
    STATE: "state",
    PHONE: "phone",
  },
};
