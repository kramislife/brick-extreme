import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

// Validate environment variables
if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
  throw new Error("PayPal credentials are not configured properly");
}

// Configure PayPal environment with error handling
const getPayPalClient = () => {
  try {
    const environment =
      process.env.NODE_ENV === "production"
        ? new paypal.core.LiveEnvironment(
            process.env.PAYPAL_CLIENT_ID,
            process.env.PAYPAL_CLIENT_SECRET
          )
        : new paypal.core.SandboxEnvironment(
            process.env.PAYPAL_CLIENT_ID,
            process.env.PAYPAL_CLIENT_SECRET
          );

    return new paypal.core.PayPalHttpClient(environment);
  } catch (error) {
    throw new Error(`Failed to initialize PayPal client: ${error.message}`);
  }
};

// Create PayPal order with validation
export const createPayPalOrder = async (items, totalAmount) => {
  // Validate inputs
  if (!items?.length || !totalAmount || totalAmount <= 0) {
    throw new Error("Invalid order data");
  }

  try {
    const client = getPayPalClient();
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    // Format items and validate amounts
    const formattedItems = items.map((item) => ({
      name: item.name?.substring(0, 127) || "Product", // PayPal limit
      quantity: String(item.quantity),
      unit_amount: {
        currency_code: "USD",
        value: (Math.round(item.price * 100) / 100).toFixed(2), // Ensure proper decimal format
      },
    }));

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (Math.round(totalAmount * 100) / 100).toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: (Math.round(totalAmount * 100) / 100).toFixed(2),
              },
            },
          },
          items: formattedItems,
        },
      ],
    });

    const order = await client.execute(request);
    return {
      orderID: order.result.id,
      status: order.result.status,
      links: order.result.links,
    };
  } catch (error) {
    console.error("PayPal order creation error:", error);
    throw new Error(`Failed to create PayPal order: ${error.message}`);
  }
};

// Capture PayPal payment with additional verification
export const capturePayPalPayment = async (orderID) => {
  if (!orderID) {
    throw new Error("Order ID is required");
  }

  try {
    const client = getPayPalClient();

    // First verify the order status
    const verifyRequest = new paypal.orders.OrdersGetRequest(orderID);
    const verifyResponse = await client.execute(verifyRequest);

    if (verifyResponse.result.status !== "APPROVED") {
      throw new Error(`Invalid order status: ${verifyResponse.result.status}`);
    }

    // Proceed with capture
    const captureRequest = new paypal.orders.OrdersCaptureRequest(orderID);
    const captureResponse = await client.execute(captureRequest);

    // Verify capture success
    const capture =
      captureResponse.result.purchase_units[0].payments.captures[0];
    if (capture.status !== "COMPLETED") {
      throw new Error(`Payment capture failed: ${capture.status}`);
    }

    return {
      captureID: capture.id,
      status: captureResponse.result.status,
      orderData: captureResponse.result,
      transactionDetails: {
        amount: capture.amount,
        create_time: capture.create_time,
        update_time: capture.update_time,
        status: capture.status,
      },
    };
  } catch (error) {
    console.error("PayPal capture error:", error);
    throw new Error(`Failed to capture PayPal payment: ${error.message}`);
  }
};

// Verify PayPal payment status with detailed response
export const verifyPayPalPayment = async (orderID) => {
  if (!orderID) {
    throw new Error("Order ID is required");
  }

  try {
    const client = getPayPalClient();
    const request = new paypal.orders.OrdersGetRequest(orderID);
    const order = await client.execute(request);

    return {
      status: order.result.status,
      orderData: order.result,
      verification: {
        intent: order.result.intent,
        create_time: order.result.create_time,
        update_time: order.result.update_time,
        payer: order.result.payer,
      },
    };
  } catch (error) {
    console.error("PayPal verification error:", error);
    throw new Error(`Failed to verify PayPal payment: ${error.message}`);
  }
};
