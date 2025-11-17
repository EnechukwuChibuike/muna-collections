"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    category: "Shipping & Delivery",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "We offer free standard shipping (5-7 business days) and express shipping (2-3 business days). International shipping typically takes 7-14 business days depending on your location.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes! We ship worldwide. International shipping costs and delivery times vary by location. All international orders may be subject to customs duties and taxes.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account on our website.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for unused items in their original packaging. Hair must be in its original state - unwashed, uncut, and undyed. Custom-colored items cannot be returned.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Contact our customer service team within 30 days of delivery. We'll provide you with a return authorization number and prepaid shipping label for eligible returns.",
      },
      {
        question: "Can I exchange my hair for a different length or color?",
        answer:
          "Yes, exchanges are possible within 30 days for unused items. You'll be responsible for return shipping costs, and we'll cover shipping for the replacement item.",
      },
    ],
  },
  {
    category: "Product Care",
    questions: [
      {
        question: "How do I wash my hair extensions?",
        answer:
          "Wash gently with sulfate-free shampoo in lukewarm water. Apply conditioner from mid-length to ends, avoiding the roots. Rinse thoroughly and gently squeeze out excess water. Air dry when possible.",
      },
      {
        question: "Can I color or bleach the hair?",
        answer:
          "Yes, our virgin hair can be colored or bleached by a professional colorist. However, we recommend consulting with a hair professional before any chemical processing to maintain hair quality.",
      },
      {
        question: "How long will my hair extensions last?",
        answer:
          "With proper care, our premium hair extensions can last 12-18 months or longer. Lifespan depends on care routine, frequency of use, and styling practices.",
      },
      {
        question: "Can I use heat styling tools?",
        answer:
          "Yes, you can use heat styling tools up to 350°F (175°C). Always use a heat protectant spray and avoid excessive heat to maintain the hair's integrity and longevity.",
      },
    ],
  },
  {
    category: "Installation & Styling",
    questions: [
      {
        question: "Do I need professional installation?",
        answer:
          "While some methods like clip-ins can be self-installed, we recommend professional installation for sew-ins, tape-ins, and fusion methods to ensure proper application and hair health.",
      },
      {
        question: "How do I choose the right color match?",
        answer:
          "We recommend ordering color samples or consulting with our color specialists. Take photos in natural lighting and consider your hair's undertones for the best match.",
      },
      {
        question: "Can I sleep with my extensions in?",
        answer:
          "Yes, but we recommend braiding or loosely tying your hair before bed and using a silk or satin pillowcase to reduce friction and tangling.",
      },
    ],
  },
  {
    category: "Orders & Payment",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, PayPal, and offer payment plans through Klarna and Afterpay for qualifying orders.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "Orders can be modified or cancelled within 2 hours of placement. After this time, orders enter processing and cannot be changed. Contact us immediately if you need to make changes.",
      },
      {
        question: "Do you offer wholesale pricing?",
        answer:
          "Yes, we offer wholesale pricing for salons and beauty professionals. Contact our wholesale team for more information about minimum orders and pricing tiers.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 luxury-gradient">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, care
            instructions, and more.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="font-playfair text-3xl font-bold mb-8 text-gray-900 border-b-2 border-amber-200 pb-4">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const itemId = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <Card
                      key={questionIndex}
                      className="border-0 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="font-semibold text-lg text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-amber-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-amber-600 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="max-w-2xl mx-auto text-center mt-16">
          <Card className="border-0 shadow-lg gold-gradient">
            <CardContent className="p-8">
              <h3 className="font-playfair text-2xl font-bold mb-4 text-gray-900">
                Still Have Questions?
              </h3>
              <p className="text-gray-700 mb-6">
                Our expert team is here to help! Get personalized assistance
                with product selection, care instructions, or any other
                questions you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
                >
                  Contact Us
                </a>
                <button
                  onClick={() => {
                    const phoneNumber = "2347038458200";
                    const message =
                      "Hi! I have a question about your hair products.";
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="inline-flex items-center cursor-pointer justify-center px-6 py-3 border-2 border-black text-black font-semibold rounded-md hover:bg-black hover:text-white transition-colors"
                >
                  WhatsApp Chat
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
