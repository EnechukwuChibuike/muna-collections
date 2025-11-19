import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { AddressSchema } from "@/lib/validators/address-validator";

export async function POST(req: Request) {
  const body = await req.json();

  // Get session from request automatically
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const data = AddressSchema.parse(body);

  const address = await prisma.address.upsert({
    where: { userId: session.user.id },
    update: data,
    create: { ...data, userId: session.user.id },
  });

  return NextResponse.json(address);
}
