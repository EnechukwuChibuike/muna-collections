// app/profile/address/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import AddressForm from "./AddressForm";

export const metadata = {
  title: "Delivery Address - Muna Collections",
  description: "Manage your delivery address information",
};

export default async function AddressPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/profile/address");
  }

  const address = await prisma.address.findUnique({
    where: { userId: session.user.id },
  });

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Delivery Address</h1>

      <AddressForm savedAddress={address} />
    </div>
  );
}
