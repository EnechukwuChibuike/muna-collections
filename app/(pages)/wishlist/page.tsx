"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/wishlist-context";
import { useCart } from "@/contexts/cart-context";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-playfair text-3xl font-bold mb-6">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
          <Link href="/shop">
            <Button className="mt-6 bg-amber-600 text-white hover:bg-amber-700">
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <h2 className="font-medium text-lg">{item.name}</h2>

                <p className="text-amber-600 font-semibold">
                  ₦{item.price.toLocaleString()}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                  <Button
                    variant="outline"
                    className="border-amber-500 text-amber-600 hover:bg-amber-50"
                    onClick={() =>
                      addItem({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        price: item.price,
                      })
                    }
                  >
                    Add to Cart
                  </Button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600 flex items-center text-sm"
                  >
                    <HeartOff className="h-4 w-4 mr-1" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
