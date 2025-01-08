import React from "react";
import { useGetUserOrdersQuery } from "@/redux/api/orderApi";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

const OrderHistory = () => {
  const { data: orders, isLoading, error } = useGetUserOrdersQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading orders: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-white mb-8">Order History</h1>

      {orders.data.length === 0 ? (
        <div className="text-center text-gray-400">
          <p>You haven't placed any orders yet.</p>
          <Link
            to="/products"
            className="text-emerald-400 hover:text-emerald-300 mt-4 inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.data.map((order) => (
            <Link
              key={order._id}
              to={`/order/${order._id}`}
              className="block bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/70 transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-gray-400">Order #{order._id}</p>
                  <p className="text-white">
                    {format(new Date(order.createdAt), "PPP")}
                  </p>
                  <p className="text-sm text-gray-400">
                    {order.orderItems.length} items
                  </p>
                </div>

                <div className="space-y-2 md:text-right">
                  <p className="text-emerald-400 font-semibold">
                    ${order.totalPrice.toFixed(2)}
                  </p>
                  <p className={`text-sm ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {order.orderItems.slice(0, 4).map((item) => (
                  <img
                    key={item._id}
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />
                ))}
                {order.orderItems.length > 4 && (
                  <div className="w-16 h-16 bg-gray-700 rounded-md flex items-center justify-center text-gray-400">
                    +{order.orderItems.length - 4}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case "Processing":
      return "text-blue-400";
    case "Shipped":
      return "text-yellow-400";
    case "Delivered":
      return "text-emerald-400";
    case "Cancelled":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

export default OrderHistory;
