import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-playfair text-3xl font-bold text-gradient mb-4">
              Muna Collectionz
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Premium hair extensions and wigs crafted for the modern woman.
              Experience luxury, quality, and elegance in every strand.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/munacollectionz"
                target="_blank"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/munacollectionz"
                target="_blank"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=extensions"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Extensions
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=wigs"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Wigs
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=bundles"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Bundles
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Muna Collectionz. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
