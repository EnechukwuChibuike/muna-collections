import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Muna Collection - Premium Hair Extensions & Wigs",
  description:
    "Discover luxury hair extensions and wigs at Muna Collection. Premium quality, natural textures, and elegant styles for the modern woman.",
  keywords: "hair extensions, wigs, premium hair, luxury hair, natural hair, hair collection",
  openGraph: {
    title: "Muna Collection - Premium Hair Extensions & Wigs",
    description: "Discover luxury hair extensions and wigs at Muna Collection.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">
        <CartProvider>
          <WishlistProvider>
            <Header />
            {children}
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
