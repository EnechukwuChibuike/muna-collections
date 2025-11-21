import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import ReceiptDownloadButton from "./ReceiptDownloadButton"; // Client component

export default async function PaymentSuccessPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <p className="text-red-500 text-center p-10">
        You must be logged in to view this page.
      </p>
    );
  }

  // Fetch the most recent order
  const order = await prisma.order.findFirst({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });

  if (!order) {
    return <p className="text-center p-10">No recent orders found.</p>;
  }

  // Parse items
  const items: { name: string; quantity: number; price: number }[] =
    typeof order.items === "string" ? JSON.parse(order.items) : order.items;

  // Parse shipping address
  const shippingAddress =
    typeof order.shippingAddress === "string"
      ? JSON.parse(order.shippingAddress)
      : order.shippingAddress;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <ReceiptDownloadButton
        order={order}
        items={items}
        address={shippingAddress}
        user={session.user}
      />
    </div>
  );
}
