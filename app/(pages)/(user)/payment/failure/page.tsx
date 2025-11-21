import Link from "next/link";

export default function PaymentFailurePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
      <p className="mb-6">Something went wrong with your payment.</p>

      <Link
        href="/checkout"
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
      >
        Try Again
      </Link>
    </div>
  );
}
