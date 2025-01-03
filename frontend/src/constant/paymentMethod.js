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
  ADDRESS: {
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    PHONE: "phone",
    STREET: "street",
    APARTMENT: "apartment",
    CITY: "city",
    STATE: "state",
    ZIP_CODE: "zipCode",
    COUNTRY: "country",
  },
  PAYMENT: {
    CARD_NUMBER: "cardNumber",
    EXPIRY_DATE: "expiryDate",
    SECURITY_CODE: "securityCode",
    NAME_ON_CARD: "nameOnCard",
  },
  BILLING_ADDRESS: {
    FIRST_NAME: "billingFirstName",
    LAST_NAME: "billingLastName",
    PHONE: "billingPhone",
    STREET: "billingStreet",
    APARTMENT: "billingApartment",
    CITY: "billingCity",
    STATE: "billingState",
    ZIP_CODE: "billingZipCode",
    COUNTRY: "billingCountry",
  },
  SHIPPING_ADDRESS: {
    FIRST_NAME: "shippingFirstName",
    LAST_NAME: "shippingLastName",
    PHONE: "shippingPhone",
    STREET: "shippingStreet",
    CITY: "shippingCity",
    STATE: "shippingState",
    ZIP_CODE: "shippingZipCode",
    COUNTRY: "shippingCountry",
  },
};

