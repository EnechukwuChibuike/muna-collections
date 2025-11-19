"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Order = {
  reference: string;
  createdAt: string | Date;
  amount: number;
};

type ReceiptProps = {
  order: Order;
  items: string[]; // items are strings like "Luxury Straight Bundle x1"
  address: string; // shippingAddress already parsed as string
  user: { name?: string }; // only need the name for greeting
};

export default function Receipt({ order, items, address, user }: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!receiptRef.current) return;

    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`receipt-${order.reference}.pdf`);
  };

  return (
    <div className="min-h-screen p-6 bg-background flex justify-center items-start">
      <div className="w-full max-w-lg">
        {/* Success header */}
        <div className="text-center mb-8">
          <span className="font-playfair text-3xl font-bold text-gradient mb-2 block">
            Muna Collectionz
          </span>

          <h1 className="text-3xl font-bold text-primary mb-2">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground text-sm">
            Thank you for shopping with us, {user.name?.split(" ")[0]}.
          </p>
        </div>

        {/* Receipt Card */}
        <div
          ref={receiptRef}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
          }}
          className="bg-card shadow-xl rounded-2xl p-6 border border-border"
        >
          <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
            🧾 Order Receipt
          </h2>

          <div className="border-b border-border pb-3 mb-4 text-sm text-foreground">
            <p>
              <span className="font-semibold">Order Ref:</span>{" "}
              {order.reference}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <h3 className="font-semibold text-foreground mb-2">Items</h3>
          <ul className="space-y-2 mb-4 text-sm text-foreground">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between border-b border-border py-1"
              >
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-foreground mb-2">
            Shipping Address
          </h3>
          <p className="text-sm text-foreground mb-4">{address}</p>

          <div className="border-t border-border mt-4 pt-4 flex justify-between text-lg font-bold text-foreground">
            <p>Total</p>
            <p className="text-primary">₦{order.amount.toLocaleString()}</p>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={downloadPDF}
          className="mt-6 w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow hover:brightness-110 transition"
        >
          Download Receipt (PDF)
        </button>
      </div>
    </div>
  );
}
