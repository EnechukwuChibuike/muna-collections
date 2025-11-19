import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
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

    // Verify transaction with Paystack
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      return NextResponse.json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Get session user
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userEmail = session.user.email;

    // Save order
    await prisma.order.create({
      data: {
        user: { connect: { email: userEmail } },
        reference,
        amount: verifyData.data.amount / 100,
        status: "PAID",
        shippingAddress: JSON.stringify(verifyData.data.metadata.address),
        items: JSON.stringify(verifyData.data.metadata.items),
        paymentMethod: "paystack",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
