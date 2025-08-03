"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setIsSubscribed(true)
    setEmail("")
  }

  if (isSubscribed) {
    return (
      <section className="py-20 gold-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-white rounded-lg p-8 shadow-lg">
            <h3 className="font-playfair text-2xl font-bold mb-4 text-gray-900">Thank You!</h3>
            <p className="text-gray-600 mb-4">
              You've successfully subscribed to our newsletter. Get ready for exclusive offers and hair care tips!
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSubscribed(false)}
              className="border-amber-600 text-amber-600 hover:bg-amber-50"
            >
              Subscribe Another Email
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 gold-gradient">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-gray-900">Stay in the Loop</h2>
          <p className="text-lg text-gray-700 mb-8">
            Be the first to know about new arrivals, exclusive offers, and hair care tips from our experts
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
            <Button type="submit" className="bg-black text-white hover:bg-gray-800 px-8 py-2 font-semibold">
              Subscribe
            </Button>
          </form>

          <p className="text-sm text-gray-600 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
