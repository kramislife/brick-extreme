// Payment method options
export const PAYMENT_METHODS = {
  PAYPAL: "paypal",
  CREDIT_CARD: "credit_card",
  BANK_TRANSFER: "bank_transfer",
};

// Shipping options (if you want to add different shipping methods later)
export const SHIPPING_METHODS = {
  FREE: "free",
  EXPRESS: "express",
};

// Order status constants
export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
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
  BILLING_ADDRESS: {
    COUNTRY: "billing_country",
    FIRST_NAME: "billing_first_name",
    LAST_NAME: "billing_last_name",
    STREET: "billing_street",
    APARTMENT: "billing_apartment",
    ZIP_CODE: "billing_zip_code",
    CITY: "billing_city",
    STATE: "billing_state",
    PHONE: "billing_phone",
  },
  SHIPPING_ADDRESS: {
    COUNTRY: "shipping_country",
    FIRST_NAME: "shipping_first_name",
    LAST_NAME: "shipping_last_name",
    STREET: "shipping_street",
    APARTMENT: "shipping_apartment",
    ZIP_CODE: "shipping_zip_code",
    CITY: "shipping_city",
    STATE: "shipping_state",
    PHONE: "shipping_phone",
  },
};
