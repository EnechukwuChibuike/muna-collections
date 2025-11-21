"use client";

import { useState } from "react";

export default function SupportPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const res = await fetch("/api/support-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setLoading(false);
    setStatus(
      data.success ? "Message sent successfully!" : "Failed to send message."
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6 border">
        <h1 className="text-3xl font-bold text-center mb-4">Support</h1>
        <p className="text-center text-gray-600 mb-6">
          We&apos;re here to help you! Choose how you want to reach us.
        </p>

        {/* WhatsApp Chat */}
        <a
          href={`https://wa.me/2347038458200?text=Hello%20Muna%20Collection,%20I%20need%20support.`}
          target="_blank"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-center block mb-6"
        >
          💬 Chat on WhatsApp
        </a>

        {/* Email Form */}
        <h2 className="text-xl font-semibold mb-3">Send us an Email</h2>

        <form onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg p-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg p-3"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <textarea
            placeholder="Your Message"
            className="w-full border rounded-lg p-3 h-28"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p className="text-center mt-2 text-sm text-green-600 font-medium">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
