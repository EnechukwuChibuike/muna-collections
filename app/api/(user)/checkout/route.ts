import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { AddressInput } from "@/lib/validators/address-validator";

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutBody {
  form: AddressInput;
  items: CheckoutItem[];
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    const body: CheckoutBody = await req.json();
    const { form, items } = body;

    const amount = Math.round(
      items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100
    );

    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    const CALLBACK_URL = process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`
      : undefined;

    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: "Paystack secret key not configured" },
        { status: 500 }
      );
    }

    if (!CALLBACK_URL) {
      return NextResponse.json(
        { error: "Callback URL not configured" },
        { status: 500 }
      );
    }

    // Flatten metadata for Paystack
    const metadata = {
      fullName: form.fullName,
      phone: form.phone,
      address: `${form.street}, ${form.city}, ${form.state}, ${form.country}, ${form.postal}`,
      items: JSON.stringify(
        items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }))
      ),
    };

    console.log(
      "body to Paystack:",
      JSON.stringify(
        {
          email,
          amount,
          currency: "NGN",
          metadata,
          callback_url: CALLBACK_URL,
        },
        null,
        2
      )
    );

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount,
          currency: "NGN",
          metadata,
          callback_url: CALLBACK_URL,
        }),
      }
    );

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }

    return NextResponse.json({ url: data.data.authorization_url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
