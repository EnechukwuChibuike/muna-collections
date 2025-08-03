"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Heart, ShoppingBag, Grid, List, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";

const products = [
  {
    id: 1,
    name: "Luxury Straight Bundle",
    price: 299,
    originalPrice: 399,
    image: "/munawig.jpeg",
    category: "bundles",
    length: "22 inches",
    texture: "straight",
    color: "natural black",
    rating: 5,
    reviews: 124,
  },
  {
    id: 2,
    name: "Curly Lace Front Wig",
    price: 459,
    originalPrice: 599,
    image: "/munawig.jpeg",
    category: "wigs",
    length: "18 inches",
    texture: "curly",
    color: "dark brown",
    rating: 5,
    reviews: 89,
  },
  {
    id: 3,
    name: "Body Wave Extensions",
    price: 199,
    originalPrice: 249,
    image: "/munawig.jpeg",
    category: "extensions",
    length: "20 inches",
    texture: "body wave",
    color: "honey blonde",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 4,
    name: "Deep Wave Closure",
    price: 179,
    originalPrice: 229,
    image: "/munawig.jpeg",
    category: "closures",
    length: "16 inches",
    texture: "deep wave",
    color: "natural black",
    rating: 4.9,
    reviews: 92,
  },
  {
    id: 5,
    name: "Kinky Straight Wig",
    price: 389,
    originalPrice: 489,
    image: "/munawig.jpeg",
    category: "wigs",
    length: "24 inches",
    texture: "kinky straight",
    color: "jet black",
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 6,
    name: "Water Wave Bundle",
    price: 259,
    originalPrice: 319,
    image: "/munawig.jpeg",
    category: "bundles",
    length: "18 inches",
    texture: "water wave",
    color: "chocolate brown",
    rating: 4.9,
    reviews: 143,
  },
];

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    texture: "all",
    length: "all",
    color: "all",
    priceRange: [0, 600],
  });
  const [sortBy, setSortBy] = useState("featured");

  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const filteredProducts = products.filter((product) => {
    if (filters.category !== "all" && product.category !== filters.category)
      return false;
    if (filters.texture !== "all" && product.texture !== filters.texture)
      return false;
    if (filters.color !== "all" && product.color !== filters.color)
      return false;
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    )
      return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold mb-4">
            Shop Collection
          </h1>
          <p className="text-gray-600">
            Discover our premium selection of hair extensions and wigs
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div
            className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    setFilters({ ...filters, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="wigs">Wigs</SelectItem>
                    <SelectItem value="extensions">Extensions</SelectItem>
                    <SelectItem value="bundles">Bundles</SelectItem>
                    <SelectItem value="closures">Closures</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Texture Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Texture
                </label>
                <Select
                  value={filters.texture}
                  onValueChange={(value) =>
                    setFilters({ ...filters, texture: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Textures</SelectItem>
                    <SelectItem value="straight">Straight</SelectItem>
                    <SelectItem value="curly">Curly</SelectItem>
                    <SelectItem value="body wave">Body Wave</SelectItem>
                    <SelectItem value="deep wave">Deep Wave</SelectItem>
                    <SelectItem value="water wave">Water Wave</SelectItem>
                    <SelectItem value="kinky straight">
                      Kinky Straight
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Color</label>
                <Select
                  value={filters.color}
                  onValueChange={(value) =>
                    setFilters({ ...filters, color: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colors</SelectItem>
                    <SelectItem value="natural black">Natural Black</SelectItem>
                    <SelectItem value="jet black">Jet Black</SelectItem>
                    <SelectItem value="dark brown">Dark Brown</SelectItem>
                    <SelectItem value="chocolate brown">
                      Chocolate Brown
                    </SelectItem>
                    <SelectItem value="honey blonde">Honey Blonde</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Price Range: ${filters.priceRange[0]} - $
                  {filters.priceRange[1]}
                </label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) =>
                    setFilters({ ...filters, priceRange: value })
                  }
                  max={600}
                  min={0}
                  step={10}
                  className="mt-2"
                />
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() =>
                  setFilters({
                    category: "all",
                    texture: "all",
                    length: "all",
                    color: "all",
                    priceRange: [0, 600],
                  })
                }
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden bg-transparent"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <p className="text-gray-600">
                  Showing {sortedProducts.length} of {products.length} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list" ? "w-48 flex-shrink-0" : ""
                    }`}
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={400}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === "list" ? "w-full h-48" : "w-full h-80"
                      }`}
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleWishlistToggle(product)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isInWishlist(product.id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleAddToCart(product)}
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
                  <CardContent
                    className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}
                  >
                    <div className="flex items-center mb-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.floor(product.rating) ? "★" : "☆"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        ({product.reviews})
                      </span>
                    </div>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="text-sm text-gray-600 mb-3 space-y-1">
                      <p>Length: {product.length}</p>
                      <p>Texture: {product.texture}</p>
                      <p>Color: {product.color}</p>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    {viewMode === "list" && (
                      <Button
                        className="w-full gold-gradient text-black font-semibold hover:opacity-90"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() =>
                    setFilters({
                      category: "all",
                      texture: "all",
                      length: "all",
                      color: "all",
                      priceRange: [0, 600],
                    })
                  }
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
