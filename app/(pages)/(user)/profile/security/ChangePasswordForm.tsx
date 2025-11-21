"use client";

import PasswordInput from "@/components/ui/password-input";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/change-password", {
      method: "POST",
      body: JSON.stringify({ oldPass, newPass }),
    });

    const data = await res.json();
    setLoading(false);
    setMsg(data.message);

    if (res.ok) {
      setOldPass("");
      setNewPass("");
    }
  }

  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordInput
          placeholder="Old Password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          className="w-full p-3 rounded-lg border"
          required
        />

        <PasswordInput
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="w-full p-3 rounded-lg border"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {msg && <p className="text-center text-sm pt-2">{msg}</p>}
      </form>
    </div>
  );
}
