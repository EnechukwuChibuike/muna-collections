import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import Testimonials from "@/components/testimonials"
import Newsletter from "@/components/newsletter"
import WhatsAppButton from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
      <WhatsAppButton />
    </main>
  )
}
