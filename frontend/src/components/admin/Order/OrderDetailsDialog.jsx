import React from 'react';
import { X, Package, Truck, CreditCard, CalendarClock } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black/80"
        onClick={onClose}
      />
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-[800px] translate-x-[-50%] translate-y-[-50%] duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]">
        {children}
      </div>
    </div>
  );
};

const OrderDetailsDialog = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="relative rounded-lg border bg-darkBrand shadow-lg border-none">
        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="space-y-3 border-b border-gray-700 pb-4">
            <h2 className="flex gap-2 items-center text-white font-semibold text-xl leading-none tracking-tight">
              <Package className="h-6 w-6 text-primary" />
              Order Details
            </h2>
            <p className="text-gray-400 text-sm">
              Order ID: <span className="text-primary font-mono">{order._id}</span>
            </p>
          </div>

          {/* Order Content */}
          <div className="mt-6 space-y-6">
            {/* Status Section */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-900/50 rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Order Status:</span>
                  <span className={`px-2 py-0.5 rounded-full text-sm font-medium
                    ${order.orderStatus === "Pending" ? "bg-yellow-500/20 text-yellow-300" : ""}
                    ${order.orderStatus === "Processing" ? "bg-blue-500/20 text-blue-300" : ""}
                    ${order.orderStatus === "Shipped" ? "bg-indigo-500/20 text-indigo-300" : ""}
                    ${order.orderStatus === "Delivered" ? "bg-green-500/20 text-green-300" : ""}
                    ${order.orderStatus === "Cancelled" ? "bg-red-500/20 text-red-300" : ""}
                  `}>
                    {order.orderStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Payment Status:</span>
                  <span className={`px-2 py-0.5 rounded-full text-sm font-medium
                    ${order.paymentInfo?.status === "Success" ? "bg-green-500/20 text-green-300" : ""}
                    ${order.paymentInfo?.status === "Pending" ? "bg-yellow-500/20 text-yellow-300" : ""}
                    ${order.paymentInfo?.status === "Failed" ? "bg-red-500/20 text-red-300" : ""}
                  `}>
                    {order.paymentInfo?.status || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CalendarClock className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Priority:</span>
                  <span className="text-gray-300">{order.priority}</span>
                </div>
              </div>

              <div className="space-y-1 text-right">
                <p className="text-gray-400">Items Price: <span className="text-white">${order.itemsPrice?.toFixed(2)}</span></p>
                <p className="text-gray-400">Tax: <span className="text-white">${order.taxPrice?.toFixed(2)}</span></p>
                <p className="text-gray-400">Shipping: <span className="text-white">${order.shippingPrice?.toFixed(2)}</span></p>
                <p className="text-gray-400">Discount: <span className="text-white">-${order.discountPrice?.toFixed(2)}</span></p>
                <p className="text-lg font-semibold text-primary">Total: ${order.totalPrice?.toFixed(2)}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Customer Information</h3>
              <p className="text-gray-300">Name: <span className="text-white">{order.user?.name}</span></p>
              <p className="text-gray-300">Email: <span className="text-white">{order.user?.email}</span></p>
            </div>

            {/* Notes Section */}
            {order.orderNotes && (
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Order Notes</h3>
                <p className="text-gray-300">{order.orderNotes}</p>
              </div>
            )}

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
              {order.deliveredAt && (
                <p className="text-right">Delivered: {new Date(order.deliveredAt).toLocaleString()}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="text-gray-300 hover:text-white"
            >
              Close
            </Button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none text-gray-400"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </Dialog>
  );
};

export default OrderDetailsDialog;