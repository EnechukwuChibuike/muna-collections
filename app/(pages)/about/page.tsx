import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 luxury-gradient">
        <div className="absolute inset-0 z-0">
          <video
            className="absolute top-0 left-0 w-full h-full bg-cover object-cover"
            src="/munavideos.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-white">
              Our Story
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Founded with a passion for empowering women through premium hair
              solutions, Muna Collectionz represents the pinnacle of luxury and
              quality in the hair industry.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-4xl font-bold mb-6 text-gray-900">
                The Beginning
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Muna Collectionz was born from a simple yet powerful vision:
                  every woman deserves to feel confident and beautiful in her
                  own skin. Our founder, inspired by her own journey with hair,
                  recognized the need for premium quality hair extensions and
                  wigs that not only looked natural but felt luxurious.
                </p>
                <p>
                  What started as a personal quest for the perfect hair solution
                  has evolved into a brand that serves thousands of women
                  worldwide, each seeking that perfect blend of quality, style,
                  and confidence that only Muna Collectionz can provide.
                </p>
                <p>
                  Today, we continue to push the boundaries of what&apos;s
                  possible in hair fashion, sourcing only the finest materials
                  and employing master craftspeople who share our commitment to
                  excellence.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/munaceo.jpg"
                alt="Our founder"
                width={500}
                height={600}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 luxury-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold mb-4 text-gray-900">
              Our Mission & Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything we do is guided by our core values and unwavering
              commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">Q</span>
              </div>
              <h3 className="font-playfair text-2xl font-bold mb-4">
                Quality First
              </h3>
              <p className="text-gray-700">
                We source only the finest human hair and employ rigorous quality
                control processes to ensure every product meets our exacting
                standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">E</span>
              </div>
              <h3 className="font-playfair text-2xl font-bold mb-4">
                Empowerment
              </h3>
              <p className="text-gray-700">
                We believe that beautiful hair is more than an
                accessory—it&apos;s a source of confidence and self-expression
                that empowers women to embrace their unique beauty.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">I</span>
              </div>
              <h3 className="font-playfair text-2xl font-bold mb-4">
                Innovation
              </h3>
              <p className="text-gray-700">
                We continuously innovate our techniques and products, staying
                ahead of trends while maintaining the timeless elegance that
                defines the Muna Collectionz brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl font-bold mb-4 text-gray-900">
                What Makes Us Different
              </h2>
              <p className="text-lg text-gray-600">
                Discover the Muna Collectionz advantage that sets us apart in
                the luxury hair industry
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-black">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      Premium Sourcing
                    </h3>
                    <p className="text-gray-700">
                      We work directly with trusted suppliers to source 100%
                      virgin human hair, ensuring authenticity and superior
                      quality in every strand.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-black">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      Expert Craftsmanship
                    </h3>
                    <p className="text-gray-700">
                      Our skilled artisans bring decades of experience to every
                      piece, hand-crafting each product with meticulous
                      attention to detail.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-black">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      Personalized Service
                    </h3>
                    <p className="text-gray-700">
                      From consultation to aftercare, our dedicated team
                      provides personalized support to help you find the perfect
                      hair solution for your lifestyle.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-black">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      Sustainable Practices
                    </h3>
                    <p className="text-gray-700">
                      We&apos;re committed to ethical sourcing and sustainable
                      practices that respect both our environment and the
                      communities we work with.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-black">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      Innovation Focus
                    </h3>
                    <p className="text-gray-700">
                      We continuously invest in research and development to
                      bring you the latest innovations in hair technology and
                      styling techniques.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-black">6</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      Lifetime Support
                    </h3>
                    <p className="text-gray-700">
                      Your relationship with Muna Collectionz doesn&apos;t end
                      at purchase. We provide ongoing care guidance and support
                      for the life of your hair.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gold-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl font-bold mb-6 text-gray-900">
            Ready to Experience the Difference?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the luxury
            and quality that only Muna Collectionz can provide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-semibold"
              >
                Shop Collection
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-black text-black hover:bg-black hover:text-white px-8 py-3 text-lg font-semibold bg-transparent"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
