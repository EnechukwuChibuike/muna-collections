import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await prisma.user.delete({
    where: { email: session.user.email },
  });

  return NextResponse.json({ message: "Account deleted successfully." });
}
