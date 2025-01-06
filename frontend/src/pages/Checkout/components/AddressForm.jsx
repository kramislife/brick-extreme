import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { useCountries } from "@/hooks/Payment/useCountries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useGetUserAddressesQuery,
} from "@/redux/api/userApi";
import { toast } from "react-toastify";

const AddressForm = ({
  address,
  onAddressChange,
  formFields,
  isEdit = false,
  editAddress = null,
  userName = "",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    is_default: false,
  });

  const { userCountry, setUserCountry, countryOptions, customStyles } =
    useCountries((countryLabel) => handleFieldChange("country", countryLabel));

  const [createAddress] = useCreateAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [open, setOpen] = useState(false);
  const { refetch } = useGetUserAddressesQuery();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (isEdit && editAddress) {
        setFormData({
          name: editAddress.name || "",
          contact_number: editAddress.contact_number || "",
          address_line1: editAddress.address_line1 || "",
          address_line2: editAddress.address_line2 || "",
          city: editAddress.city || "",
          state: editAddress.state || "",
          postal_code: editAddress.postal_code || "",
          country: editAddress.country || "",
          is_default: editAddress.is_default || false,
          full_name: editAddress.full_name || userName || "",
        });
      } else {
        setFormData({
          name: "",
          contact_number: "",
          address_line1: "",
          address_line2: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
          is_default: false,
          full_name: userName || "",
        });
        setUserCountry(null);
      }
    }
  }, [open, isEdit, editAddress, userName]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const addressData = {
        name: formData.name || "Home",
        full_name: formData.full_name,
        contact_number: formData.contact_number,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2,
        city: formData.city,
        state: formData.state,
        postal_code: formData.postal_code,
        country: formData.country,
        is_default: formData.is_default,
      };

      let response;
      if (isEdit) {
        response = await updateAddress({
          id: editAddress._id,
          addressData,
        }).unwrap();
      } else {
        response = await createAddress(addressData).unwrap();
      }

      toast.success(response.message);
      await refetch();
      setOpen(false);
    } catch (error) {
      toast.error(
        error.data?.message || `Failed to ${isEdit ? "update" : "add"} address`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={`flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors ${
          isEdit
            ? "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            : ""
        }`}
      >
        {isEdit ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        <span>{isEdit ? "" : "Add Address"}</span>
      </DialogTrigger>
      <DialogContent className="bg-brand-gradient backdrop-blur-xl border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            {isEdit ? "Edit address" : "Add a new address"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 sr-only">
            {isEdit
              ? "Update your shipping address details below"
              : "Fill in your shipping address details below"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Select
              options={countryOptions}
              value={userCountry}
              onChange={(option) => {
                setUserCountry(option);
                handleFieldChange("country", option.label);
              }}
              styles={customStyles}
              placeholder="Select Country"
              formatOptionLabel={({ label, flag }) => (
                <div className="flex items-center gap-2">
                  <span>{flag}</span>
                  <span className="text-sm">{label}</span>
                </div>
              )}
              required
            />

            <div className="grid grid-cols-1 gap-4">
              {/* <Input
                variant="floating"
                label="Full Name"
                value={userName}
                disabled
                placeholder=" "
              /> */}

              <Input
                variant="floating"
                label="Address Label (e.g., Home, Work)"
                value={formData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                required
                placeholder=" "
              />
            </div>

            <Input
              variant="floating"
              label="Phone Number"
              value={formData.contact_number}
              onChange={(e) =>
                handleFieldChange("contact_number", e.target.value)
              }
              required
              type="tel"
              placeholder=" "
            />

            <Input
              variant="floating"
              label="Street Address"
              value={formData.address_line1}
              onChange={(e) =>
                handleFieldChange("address_line1", e.target.value)
              }
              required
              placeholder=" "
            />

            <Input
              variant="floating"
              label="Apartment, suite, etc. (optional)"
              value={formData.address_line2}
              onChange={(e) =>
                handleFieldChange("address_line2", e.target.value)
              }
              placeholder=" "
            />

            <div className="grid grid-cols-3 gap-4">
              <Input
                variant="floating"
                label="City"
                value={formData.city}
                onChange={(e) => handleFieldChange("city", e.target.value)}
                required
                placeholder=" "
              />
              <Input
                variant="floating"
                label="State/Province"
                value={formData.state}
                onChange={(e) => handleFieldChange("state", e.target.value)}
                required
                placeholder=" "
              />
              <Input
                variant="floating"
                label="Postal Code"
                value={formData.postal_code}
                onChange={(e) =>
                  handleFieldChange("postal_code", e.target.value)
                }
                required
                placeholder=" "
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_default"
                checked={formData.is_default}
                onCheckedChange={(checked) =>
                  handleFieldChange("is_default", checked)
                }
                className="border-white/10 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <label
                htmlFor="is_default"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              >
                Set as default address
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12"
              disabled={isLoading}
            >
              {isEdit
                ? isLoading
                  ? "Updating address..."
                  : "Update address"
                : isLoading
                ? "Adding address..."
                : "Add address"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressForm;
