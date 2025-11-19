"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (!reference) {
      router.push("/payment/failure");
      return;
    }

    async function verify() {
      const res = await fetch(`/api/payment/callback?reference=${reference}`);
      const data = await res.json();

      if (data.success) {
        router.push("/payment/success");
      } else {
        router.push("/payment/failure");
      }
    }

    verify();
  }, [reference, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Animated Loader */}
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin h-12 w-12 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>

        <h2 className="text-xl font-semibold text-gray-700">
          Verifying your payment...
        </h2>

        <p className="text-sm text-gray-500 animate-pulse">
          Please wait while we confirm your transaction.
        </p>
      </div>
    </div>
  );
}
