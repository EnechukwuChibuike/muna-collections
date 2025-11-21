"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function updatePersonalInfo(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/login?callbackUrl=/profile/personal-info`);

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();

  if (!name || !email) return;

  await prisma.user.update({
    where: { email: session.user.email! },
    data: { name, email },
  });
}
