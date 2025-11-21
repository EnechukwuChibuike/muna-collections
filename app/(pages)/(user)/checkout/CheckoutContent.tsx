"use client";

import { useState, useRef } from "react";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  AddressInput,
  AddressSchema,
} from "@/lib/validators/address-validator";
import toast from "react-hot-toast";
import ProceedToPayment from "./ProceedToPayment";

interface CheckoutProps {
  savedAddress: Partial<AddressInput> | null;
}

export default function CheckoutContent({ savedAddress }: CheckoutProps) {
  const { items, total } = useCart();
  console.log(items);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(!!savedAddress);
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressInput, string>>
  >({});

  const inputRefs = useRef<
    Partial<Record<keyof AddressInput, HTMLInputElement | null>>
  >({});

  const [form, setForm] = useState<AddressInput>({
    fullName: savedAddress?.fullName || "",
    phone: savedAddress?.phone || "",
    country: savedAddress?.country || "",
    state: savedAddress?.state || "",
    city: savedAddress?.city || "",
    street: savedAddress?.street || "",
    postal: savedAddress?.postal || "",
    paymentMethod: "paystack",
  });

  const update = (field: keyof AddressInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    if (saved && savedAddress && value !== savedAddress[field]) setSaved(false);
  };

  const scrollToFirstError = (
    fieldErrors: Partial<Record<keyof AddressInput, string>>
  ) => {
    for (const key of Object.keys(fieldErrors) as (keyof AddressInput)[]) {
      if (fieldErrors[key] && inputRefs.current[key]) {
        inputRefs.current[key]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        inputRefs.current[key]?.focus();
        break;
      }
    }
  };

  const handleSave = async () => {
    const result = AddressSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors as Record<
        keyof AddressInput,
        string[]
      >;
      const simplifiedErrors: Partial<Record<keyof AddressInput, string>> = {};
      for (const key in fieldErrors) {
        if (fieldErrors[key as keyof AddressInput]?.length)
          simplifiedErrors[key as keyof AddressInput] =
            fieldErrors[key as keyof AddressInput][0];
      }
      setErrors(simplifiedErrors);
      scrollToFirstError(simplifiedErrors);
      toast.error("Please fix the errors before saving.");
      return;
    }

    setSaving(true);
    const res = await fetch("/api/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });
    setSaving(false);

    if (!res.ok) {
      toast.error("Failed to save address. Try again.");
      return;
    }

    toast.success("Address saved successfully!");
    setSaved(true);
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE */}
        <div className="flex-1 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(
              [
                "fullName",
                "phone",
                "country",
                "state",
                "city",
                "street",
                "postal",
              ] as (keyof AddressInput)[]
            ).map((field) => (
              <div
                key={field}
                className={field === "street" ? "sm:col-span-2" : ""}
              >
                <input
                  ref={(el) => {
                    inputRefs.current[field] = el;
                  }}
                  value={form[field]}
                  onChange={(e) => update(field, e.target.value)}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="border px-3 py-2 rounded w-full"
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={handleSave}
            disabled={saving || saved}
            className="mt-6 bg-black text-white px-6 py-2 rounded"
          >
            {saving ? "Saving..." : saved ? "Saved" : "Save Address"}
          </Button>

          <h3 className="mt-8 font-semibold">Payment Method</h3>
          <div className="mt-3 flex flex-col gap-3">
            {["paystack", "flutterwave", "cod"].map((method) => (
              <label
                key={method}
                className="flex items-center gap-3 border p-3 rounded cursor-pointer"
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={form.paymentMethod === method}
                  onChange={() =>
                    update(
                      "paymentMethod",
                      method as AddressInput["paymentMethod"]
                    )
                  }
                />
                <span className="font-medium capitalize">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        <div className="w-full lg:w-96 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex gap-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × &#8358;{item.price}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <p>Total:</p>
            <p>&#8358;{total.toFixed(2)}</p>
          </div>

          <ProceedToPayment
            savedAddress={form}
            items={items.map((item) => ({
              ...item,
              id: String(item.id), // convert number to string
            }))}
          />
        </div>
      </div>
    </div>
  );
}
