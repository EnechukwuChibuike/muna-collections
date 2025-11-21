import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { oldPass, newPass } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user?.password)
    return NextResponse.json(
      { message: "Password change not allowed for this account." },
      { status: 400 }
    );

  const isValid = await bcrypt.compare(oldPass, user.password);
  if (!isValid)
    return NextResponse.json(
      { message: "Old password is incorrect." },
      { status: 400 }
    );

  const hashed = await bcrypt.hash(newPass, 10);

  await prisma.user.update({
    where: { email: session.user.email },
    data: { password: hashed },
  });

  return NextResponse.json({ message: "Password updated successfully!" });
}
