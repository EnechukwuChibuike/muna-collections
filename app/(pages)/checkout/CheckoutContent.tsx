"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CheckoutContent({
  savedAddress,
}: {
  savedAddress: any;
}) {
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: savedAddress?.fullName || "",
    phone: savedAddress?.phone || "",
    country: savedAddress?.country || "",
    state: savedAddress?.state || "",
    city: savedAddress?.city || "",
    street: savedAddress?.street || "",
    postal: savedAddress?.postal || "",
    paymentMethod: "paystack",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ form, items }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE — ADDRESS FORM */}
        <div className="flex-1 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Full Name"
              className="border px-3 py-2 rounded w-full"
            />

            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="Phone Number"
              className="border px-3 py-2 rounded w-full"
            />

            <input
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              placeholder="Country"
              className="border px-3 py-2 rounded w-full"
            />

            <input
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              placeholder="State"
              className="border px-3 py-2 rounded w-full"
            />

            <input
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="City"
              className="border px-3 py-2 rounded w-full"
            />

            <div className="sm:col-span-2">
              <input
                value={form.street}
                onChange={(e) => update("street", e.target.value)}
                placeholder="Street Address"
                className="border px-3 py-2 rounded w-full"
              />
            </div>

            <input
              value={form.postal}
              onChange={(e) => update("postal", e.target.value)}
              placeholder="Postal Code"
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          {/* Payment Method */}
          <h3 className="mt-6 font-semibold">Payment Method</h3>

          <div className="mt-3 flex flex-col gap-3">
            {/* Paystack (default) */}
            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="paystack"
                checked={form.paymentMethod === "paystack"}
                onChange={() => update("paymentMethod", "paystack")}
              />
              <span className="font-medium">Paystack</span>
            </label>

            {/* Flutterwave */}
            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="flutterwave"
                checked={form.paymentMethod === "flutterwave"}
                onChange={() => update("paymentMethod", "flutterwave")}
              />
              <span className="font-medium">Flutterwave</span>
            </label>

            {/* Cash on Delivery */}
            <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={form.paymentMethod === "cod"}
                onChange={() => update("paymentMethod", "cod")}
              />
              <span className="font-medium">Cash on Delivery</span>
            </label>
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
                    className="rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × ${item.price}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="gold-gradient text-black w-full mt-4 flex justify-center items-center"
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></div>
            ) : (
              "Proceed to Payment"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
