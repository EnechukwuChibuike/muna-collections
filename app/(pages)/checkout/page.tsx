import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import CheckoutContent from "./CheckoutContent";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/checkout");
  }

  const address = await prisma.address.findFirst({
    where: { userId: session.user.id },
  });

  // Cast paymentMethod to the expected union type
  const savedAddress = address
    ? {
        ...address,
        paymentMethod: address.paymentMethod as
          | "paystack"
          | "flutterwave"
          | "cod",
      }
    : null;

  return <CheckoutContent savedAddress={savedAddress} />;
}
