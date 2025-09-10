"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import SearchModal from "./search-modal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-playfair text-2xl font-bold text-gradient">
                Muna Collectionz
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-sm font-medium hover:text-amber-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-sm font-medium hover:text-amber-600 transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-amber-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-amber-600 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium hover:text-amber-600 transition-colors"
              >
                FAQ
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="hover:bg-amber-50"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Link href="/account">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-amber-50"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              <Link href="/wishlist" className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-amber-50"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-500 text-xs text-white flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/cart" className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-amber-50"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-500 text-xs text-white flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-amber-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="text-sm font-medium hover:text-amber-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium hover:text-amber-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium hover:text-amber-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/faq"
                  className="text-sm font-medium hover:text-amber-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
