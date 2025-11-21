"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function LogoutDeleteActions() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleDelete() {
    if (!confirm("Are you sure? This action cannot be undone.")) return;

    setLoading(true);

    const res = await fetch("/api/user/delete-account", {
      method: "DELETE",
    });

    const data = await res.json();
    setMsg(data.message || "");

    if (res.ok) {
      signOut({ callbackUrl: "/" });
    }

    setLoading(false);
  }

  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white space-y-4">
      <h2 className="text-xl font-semibold">Account Actions</h2>

      <Button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="w-full p-3 rounded-lg bg-gray-200 hover:bg-gray-300"
      >
        Logout
      </Button>

      <Button
        onClick={handleDelete}
        disabled={loading}
        className="w-full p-3 rounded-lg bg-red-600 text-white hover:bg-red-700"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </Button>

      {msg && <p className="text-center text-sm">{msg}</p>}
    </div>
  );
}
