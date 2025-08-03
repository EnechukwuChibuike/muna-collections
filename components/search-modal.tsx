"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchSuggestions = [
  {
    id: 1,
    name: "Straight Hair Extensions",
    image: "/placeholder.svg?height=60&width=60",
    price: 299,
  },
  {
    id: 2,
    name: "Curly Wigs",
    image: "/placeholder.svg?height=60&width=60",
    price: 459,
  },
  {
    id: 3,
    name: "Body Wave Bundles",
    image: "/placeholder.svg?height=60&width=60",
    price: 199,
  },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">
            Search Products
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search for hair extensions, wigs, bundles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 text-lg"
            autoFocus
          />
        </div>

        {searchQuery === "" && (
          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Searches</h3>
            <div className="space-y-3">
              {searchSuggestions.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  onClick={onClose}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-amber-600 font-semibold">
                      ${item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {searchQuery !== "" && (
          <div>
            <p className="text-gray-600 mb-4">
              Searching for &quot;{searchQuery}&quot;...
            </p>
            {/* Search results would be displayed here */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
