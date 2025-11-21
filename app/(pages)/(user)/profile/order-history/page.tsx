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

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  reference: string;
  amount: number;
  status: string;
  orderProgress: string;
  paymentMethod: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  shippingAddress: string;
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/profile/orders");
  }

  const ordersFromDB = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  // ⭐ FIX — Convert Prisma JsonValue into real TS types
  const orders: Order[] = ordersFromDB.map((order) => ({
    ...order,

    items:
      typeof order.items === "string"
        ? (JSON.parse(order.items) as OrderItem[])
        : (order.items as unknown as OrderItem[]),

    shippingAddress:
      typeof order.shippingAddress === "string"
        ? (JSON.parse(order.shippingAddress) as unknown as string)
        : (order.shippingAddress as unknown as string),
  }));

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold mb-6">Order History</h1>
      <OrderList orders={orders} />
    </div>
  );
}
