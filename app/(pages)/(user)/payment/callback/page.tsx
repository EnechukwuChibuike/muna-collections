// app/payment/callback/page.tsx
import { Suspense } from "react";
import CallbackPageClient from "./CallbackPageClient";

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <CallbackPageClient />
    </Suspense>
  );
}
