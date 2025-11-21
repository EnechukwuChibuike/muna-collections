"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import Receipt from "./receipt";
import type { Order } from "@prisma/client";
import { useCart } from "@/contexts/cart-context";
import { useEffect } from "react";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

interface Props {
  order: Order;
  items: OrderItem[];
  address: string;
  user: { name?: string };
}

export default function ReceiptDownloadButton({
  order,
  items,
  address,
  user,
}: Props) {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center text-center">
      {/* Header */}
      <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 mb-4">
        🎉 Hurray! Payment Successful!
      </h1>

      {/* Greeting */}
      <p className="text-lg text-gray-700 mb-2">
        Thank you for shopping with us,{" "}
        <span className="font-semibold">{user.name?.split(" ")[0]}</span>!
      </p>

      {/* Extra message */}
      <p className="text-sm text-gray-500 mb-6">
        Your order <span className="font-medium">{order.reference}</span> has
        been received. You can download your receipt below or keep it for your
        records.
      </p>

      {/* Card for order summary */}
      <div className="w-full bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 mb-6">
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Order Ref:</span> {order.reference}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Total:</span> ₦
          {order.amount.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Shipping:</span> {address}
        </p>
      </div>

      {/* Download button */}
      <PDFDownloadLink
        document={
          <Receipt order={order} items={items} address={address} user={user} />
        }
        fileName={`receipt-${order.reference}.pdf`}
        className="py-3 px-8 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black font-semibold rounded-xl shadow-lg hover:brightness-105 transition-all duration-200"
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download Receipt")}
      </PDFDownloadLink>

      {/* Footer note */}
      <p className="text-xs text-gray-400 mt-4">
        Keep this receipt for your records. Contact support if you have any
        issues.
      </p>
    </div>
  );
}
