import React from "react";
import { Clock, ImageIcon } from "lucide-react";

const PlaceholderImage = ({ message = "Image Coming Soon" }) => {
  return (
    <div className="w-full bg-brand-gradient flex flex-col items-center justify-center gap-4 border border-slate-700 rounded-t-lg h-[360px]">
      <ImageIcon className="w-12 h-12 text-slate-600" />
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full">
        <Clock className="w-4 h-4 text-slate-400" />
        <span className="text-sm font-medium text-slate-400">{message}</span>
      </div>
    </div>
  );
};

export default PlaceholderImage;
