// app/profile/personal-info/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { updatePersonalInfo } from "./actions";
import SubmitButton from "./submit-button";

export const metadata = {
  title: "Personal Information — Muna Collections",
};

export default async function PersonalInfoPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/login?callbackUrl=/profile/personal-info`);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { id: true, name: true, email: true },
  });

  if (!user) redirect("/login");

  return (
    <div className="sm:max-w-3xl mx-auto sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Personal Information</h1>

      <form action={updatePersonalInfo} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            required
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            required
            className="w-full border p-2 rounded-md"
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
