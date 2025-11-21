import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json({
        success: false,
        message: "No reference provided",
      });
    }

    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json({
        success: false,
        message: "Server config error",
      });
    }

    // VERIFY PAYMENT
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
      }
    );

    const verifyData = await verifyRes.json();
    console.log("VERIFY RESPONSE:", verifyData);

    if (!verifyData.status || verifyData.data.status !== "success") {
      return NextResponse.json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // FIX: correct session method
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        message: "User not logged in",
      });
    }

    const userEmail = session.user.email;

    const metadata = verifyData.data.metadata;
    console.log("METADATA:", metadata);

    await prisma.order.upsert({
      where: { reference },
      update: {},
      create: {
        user: { connect: { email: userEmail } },
        reference,
        amount: verifyData.data.amount / 100,
        status: "PAID",
        orderProgress: "PENDING",
        shippingAddress: JSON.stringify(metadata.address),
        items: JSON.parse(metadata.items),
        paymentMethod: "paystack",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
