"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-playfair font-bold mb-6 text-center">
          Login
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2 text-sm font-medium">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4"
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-6"
        />

        <Button
          type="submit"
          className="w-full gold-gradient text-black"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5 mx-auto" />
          ) : (
            "Login"
          )}
        </Button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-amber-600">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
