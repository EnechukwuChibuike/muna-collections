import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import Receipt from "./receipt";

export default async function PaymentSuccessPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <p className="text-red-500 text-center p-10">
        You must be logged in to view this page.
      </p>
    );
  }

  const order = await prisma.order.findFirst({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });

  console.log(order);

  if (!order) {
    return <p className="text-center p-10">No recent orders found.</p>;
  }

  const items = JSON.parse(order.items as string);
  const shippingAddress =
    typeof order.shippingAddress === "string"
      ? JSON.parse(order.shippingAddress)
      : order.shippingAddress;

  return (
    <Receipt
      order={order}
      items={items}
      address={shippingAddress}
      user={session.user}
    />
  );
}
