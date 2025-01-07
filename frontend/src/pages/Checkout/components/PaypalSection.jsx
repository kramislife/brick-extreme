import React from "react";
import { ArrowUpRight } from "lucide-react";

const PayPalSection = ({ onSubmit, total }) => {
  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-16 h-16 border border-white/10 rounded-md flex items-center justify-center">
          <ArrowUpRight className="w-8 h-8 text-white/60" />
        </div>
        <p className="text-gray-300 text-sm leading-loose">
          After clicking "Pay with PayPal", you will be redirected to PayPal to
          complete your purchase securely.
        </p>
      </div>

      <button
        className="w-full bg-[#0070ba] hover:bg-[#003087] text-white py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
        type="button"
        onClick={onSubmit}
      >
        <span className="font-semibold">
          Pay ${total?.toFixed(2) || "0.00"} with PayPal
        </span>
      </button>
    </div>
  );
};

export default PayPalSection;
