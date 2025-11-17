"use client";

import { IoLogoWhatsapp } from "react-icons/io5";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "2347038458200";
    const message =
      "Hi! I'm interested in your hair collection. Can you help me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
      size="icon"
    >
      <IoLogoWhatsapp className="text-white" size={35} />
    </Button>
  );
}
