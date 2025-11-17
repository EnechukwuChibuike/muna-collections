import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The quality is absolutely incredible! I've never had hair extensions that looked and felt so natural. Muna Collectionz has exceeded all my expectations.",
    product: "Luxury Straight Bundle",
  },
  {
    id: 2,
    name: "Maya Patel",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "I'm obsessed with my new wig! The lace front is so seamless, and the hair is so soft and manageable. Worth every penny!",
    product: "Curly Lace Front Wig",
  },
  {
    id: 3,
    name: "Jessica Williams",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Customer service was amazing, and the hair arrived quickly. The body wave pattern is exactly what I wanted. I'll definitely be ordering again!",
    product: "Body Wave Extensions",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from the women who trust
            Muna Collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Purchased: {testimonial.product}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
