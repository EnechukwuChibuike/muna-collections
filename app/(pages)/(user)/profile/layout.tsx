// app/profile/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { ReactNode } from "react";

interface ProfileLayoutProps {
  children: ReactNode;
  params?: {
    tab?:
      | "personal-info"
      | "address-book"
      | "order-history"
      | "security"
      | "support"
      | "delete-account";
  };
}

export const metadata = {
  title: "Your Profile - Muna Collectionz",
  description: "Manage your personal info, orders, addresses, and settings",
};

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  // Auth check
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=/profile`);
  }

  const tabs = [
    { label: "Personal Info", href: "/profile/personal-info" },
    { label: "Address Book", href: "/profile/address-book" },
    { label: "Order History", href: "/profile/order-history" },
    { label: "Security & Settings", href: "/profile/security" },
    { label: "Support", href: "/profile/support" },
  ];

  return (
    <div>
      <div className="min-h-screen bg-background md:flex flex-col md:flex-row hidden">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border bg-card">
          <div className="px-6 py-4 text-xl sm:block hidden font-bold text-primary">
            Profile
          </div>
          <nav className="flex lg:flex-col overflow-x-auto">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="px-6 py-3 border-b lg:border-b border-border hover:bg-gray-50 text-foreground block lg:block whitespace-nowrap"
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      <main className="md:hidden p-6">{children}</main>
    </div>
  );
}
