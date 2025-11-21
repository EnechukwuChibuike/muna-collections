import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export const metadata = {
  title: "Your Profile — Muna Collectionz",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/login?callbackUrl=/profile`);
  }

  return (
    <div className="max-w-lg mx-auto block md:hidden">
      <h1 className="text-2xl font-bold mb-6">Your Account</h1>

      <div className="space-y-3">
        <Link
          href="/profile/personal-info"
          className="block w-full border p-4 rounded-md bg-white shadow-sm"
        >
          Personal Information
        </Link>

        <Link
          href="/profile/address-book"
          className="block w-full border p-4 rounded-md bg-white shadow-sm"
        >
          Address Book
        </Link>

        <Link
          href="/profile/orders"
          className="block w-full border p-4 rounded-md bg-white shadow-sm"
        >
          Order History
        </Link>

        <Link
          href="/profile/security"
          className="block w-full border p-4 rounded-md bg-white shadow-sm"
        >
          Security & Settings
        </Link>

        <Link
          href="/profile/support"
          className="block w-full border p-4 rounded-md bg-white shadow-sm"
        >
          Support
        </Link>

        <Link
          href="/profile/delete-account"
          className="block w-full border p-4 rounded-md bg-white shadow-sm text-red-600"
        >
          Delete Account
        </Link>
      </div>
    </div>
  );
}
