import React from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ContactSection = ({ email, onEmailChange }) => {
  return (
    <Card className="bg-darkBrand/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Contact Information</CardTitle>
        <CardDescription className="text-gray-400">
          Enter your email for order updates
        </CardDescription>
      </CardHeader>

      {/* Email input */}
      <CardContent>
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="bg-brand/10 border-white/10 border rounded-lg px-4 py-2 transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300 h-12 placeholder:text-white/80 font-extralight text-white"
          required
        />
      </CardContent>
    </Card>
  );
};

export default ContactSection;
