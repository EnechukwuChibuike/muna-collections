"use client";

// app/checkout/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { useCart } from "@/contexts/cart-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/checkout");
  }

  return <CheckoutContent />;
}

function CheckoutContent() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    // Here you would integrate your payment (Paystack/Flutterwave)
    // Example: await fetch("/api/payment", {...})
    setTimeout(() => setLoading(false), 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
        <Link href="/shop">
          <Button className="gold-gradient text-black cursor-pointer">
            Go to Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="font-playfair text-4xl font-bold mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Summary */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            <h2 className="font-semibold text-xl mb-4">Your Cart</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">
                        {item.length ? `Length: ${item.length}` : ""}{" "}
                        {item.color ? `Color: ${item.color}` : ""}
                      </p>
                      <p className="text-gray-700 font-semibold">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-16 border rounded px-2 py-1 text-center"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-4 bg-transparent"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>

          {/* Payment Summary */}
          <div className="w-full lg:w-96 bg-white rounded-lg shadow p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-xl">Order Summary</h2>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-gray-900 font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button
              className="gold-gradient text-black font-semibold mt-4 flex justify-center items-center"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : null}
              {loading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
