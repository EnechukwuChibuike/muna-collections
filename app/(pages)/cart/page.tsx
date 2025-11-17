"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-playfair text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <Link href="/shop">
            <Button className="mt-6 bg-amber-600 text-white hover:bg-amber-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={90}
                    className="rounded-md object-cover"
                  />

                  <div>
                    <h2 className="font-medium text-lg">{item.name}</h2>

                    {/* Variants */}
                    <div className="text-sm text-gray-500">
                      {item.length && <p>Length: {item.length}</p>}
                      {item.color && <p>Color: {item.color}</p>}
                    </div>

                    <p className="font-semibold text-amber-600 mt-2">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end space-y-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 border-r hover:bg-amber-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 border-l hover:bg-amber-50"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600 flex items-center text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border rounded-lg p-6 bg-white shadow-sm h-fit">
            <h2 className="font-playfair text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₦{total.toLocaleString()}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-500">Calculated at checkout</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total</span>
              <span className="text-amber-600">₦{total.toLocaleString()}</span>
            </div>

            <Link href="/checkout">
              <Button className="w-full bg-amber-600 text-white hover:bg-amber-700">
                Proceed to Checkout
              </Button>
            </Link>

            <Link href="/shop">
              <Button
                variant="outline"
                className="w-full mt-3 border-amber-500 text-amber-600 hover:bg-amber-50"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
