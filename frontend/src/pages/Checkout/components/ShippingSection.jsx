import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FORM_FIELDS } from "@/constant/paymentMethod";
import { MapPin } from "lucide-react";
import AddressForm from "./AddressForm";

const ShippingSection = ({ address, onAddressChange }) => {
  return (
    <Card className="bg-darkBrand/20 backdrop-blur-xl border-white/10">
      <CardHeader className="flex flex-row items-center gap-3 pb-6">
        <MapPin className="w-5 h-5 text-blue-400" />
        <CardTitle className="text-white text-lg font-medium">
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AddressForm
          address={address}
          onAddressChange={onAddressChange}
          formFields={FORM_FIELDS.ADDRESS}
        />
      </CardContent>
    </Card>
  );
};

export default ShippingSection;
