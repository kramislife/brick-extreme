import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Upload, User, FileText, Instagram, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Metadata from "@/components/layout/Metadata/Metadata";
import { useCreateDesignerMutation } from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";

const AddDesigner = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [createDesigner, { isLoading }] = useCreateDesignerMutation();
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const profilePicture = formData.get("profile_picture");
    const designerData = new FormData();
    
    designerData.append("name", formData.get("name"));
    designerData.append("bio", formData.get("bio"));
    designerData.append("social_links[instagram]", formData.get("instagram"));
    if (profilePicture.size > 0) {
      designerData.append("profile_picture", profilePicture);
    }
    designerData.append("createdBy", user?._id);
    designerData.append("updatedBy", user?._id);

    try {
      await createDesigner(designerData).unwrap();
      toast.success("Designer created successfully!");
      navigate("/admin/designers");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create designer");
    }
  };

  return (
    <>
      <Metadata title="Add Designer" />
      <div className="mx-auto py-6">
        <Card className="shadow-xl border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Designer</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                 
                   {/* Designer Name */}
                  <div className="space-y-3">
                    <Label htmlFor="name" className="flex items-center gap-2 text-lg font-semibold">
                      <User className="h-5 w-5 text-blue-600" />
                      Designer Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter designer name"
                      className="mt-1"
                      required
                    />
                  </div>

                  {/* Designer Bio */}
                  <div className="space-y-3">
                    <Label htmlFor="bio" className="flex items-center gap-2 text-lg font-semibold">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Enter designer bio"
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  {/* Designer Instagram */}
                  <div className="space-y-3">
                    <Label htmlFor="instagram" className="flex items-center gap-2 text-lg font-semibold">
                      <Instagram className="h-5 w-5 text-blue-600" />
                      Instagram Profile
                    </Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      placeholder="https://instagram.com/username"
                      className="mt-1"
                      type="url"
                    />
                  </div>

                  {/* Designer Profile Picture */}
                  <div className="space-y-3">
                    <Label htmlFor="profile_picture" className="flex items-center gap-2 text-lg font-semibold">
                      <ImageIcon className="h-5 w-5 text-blue-600" />
                      Profile Picture
                    </Label>
                    <div className="mt-1 space-y-2">
                      <Input
                        id="profile_picture"
                        name="profile_picture"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1"
                      />
                      {previewImage && (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Create Designer Button */}
                  <div className="flex justify-end space-x-4 pt-6">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isLoading ? (
                        <>Creating...</>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Create Designer
                        </>
                      )}
                    </Button>
                  </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AddDesigner
