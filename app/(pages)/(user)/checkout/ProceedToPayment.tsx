"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { AddressInput } from "@/lib/validators/address-validator";

interface ProceedToPaymentProps {
  savedAddress: AddressInput;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

export default function ProceedToPayment({
  savedAddress,
  items,
}: ProceedToPaymentProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: savedAddress, items }),
      });

      const data: { url?: string } = await res.json();
      setLoading(false);

      if (!res.ok || !data.url) {
        toast.error("Payment initialization failed.");
        return;
      }

      // Redirect to Paystack (or other payment provider)
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="gold-gradient text-black w-full mt-4"
    >
      {loading ? "Processing..." : "Proceed to Payment"}
    </Button>
  );
}
