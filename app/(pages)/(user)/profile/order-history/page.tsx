// app/profile/orders/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import OrderList from "./OrderList";

export const metadata = {
  title: "Order History - Muna Collections",
  description: "View all your orders and their delivery progress",
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/profile/orders");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Order History</h1>
      <OrderList orders={orders} />
    </div>
  );
}
