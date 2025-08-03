import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuredProducts = [
  {
    id: 1,
    name: "Luxury Straight Bundle",
    price: 299,
    originalPrice: 399,
    image: "/munawig.jpeg",
    rating: 5,
    reviews: 124,
  },
  {
    id: 2,
    name: "Curly Lace Front Wig",
    price: 459,
    originalPrice: 599,
    image: "/munawig.jpeg",
    rating: 5,
    reviews: 89,
  },
  {
    id: 3,
    name: "Body Wave Extensions",
    price: 199,
    originalPrice: 249,
    image: "/munawig.jpeg",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 4,
    name: "Deep Wave Closure",
    price: 179,
    originalPrice: 229,
    image: "/munawig.jpeg",
    rating: 4.9,
    reviews: 92,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 luxury-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Featured Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked premium pieces that embody luxury, quality, and timeless
            elegance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </div>
                {product.originalPrice > product.price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                    SALE
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < Math.floor(product.rating) ? "★" : "☆"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviews})
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop">
            <Button
              size="lg"
              className="gold-gradient text-black font-semibold px-8 py-3 hover:opacity-90 transition-opacity"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
