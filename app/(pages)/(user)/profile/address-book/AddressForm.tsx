"use client";

import { useState } from "react";

type Address = {
  fullName: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  postal: string;
  paymentMethod: string;
};

export default function AddressForm({
  savedAddress,
}: {
  savedAddress: Address | null;
}) {
  const [address, setAddress] = useState<Address>(
    savedAddress || {
      fullName: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      street: "",
      postal: "",
      paymentMethod: "",
    }
  );

  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/address", {
        method: "POST",
        body: JSON.stringify(address),
      });

      if (!res.ok) {
        alert("Failed to save address");
      } else {
        alert("Address saved successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setSaving(false);
  }

  return (
    <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        value={address.fullName}
        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
        className="w-full p-3 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={address.phone}
        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
        className="w-full p-3 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Country"
        value={address.country}
        onChange={(e) => setAddress({ ...address, country: e.target.value })}
        className="w-full p-3 border rounded"
        required
      />

      <input
        type="text"
        placeholder="State"
        value={address.state}
        onChange={(e) => setAddress({ ...address, state: e.target.value })}
        className="w-full p-3 border rounded"
        required
      />

      <input
        type="text"
        placeholder="City"
        value={address.city}
        onChange={(e) => setAddress({ ...address, city: e.target.value })}
        className="w-full p-3 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Street"
        value={address.street}
        onChange={(e) => setAddress({ ...address, street: e.target.value })}
        className="w-full p-3 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Postal Code"
        value={address.postal}
        onChange={(e) => setAddress({ ...address, postal: e.target.value })}
        className="w-full p-3 border rounded"
        required
      />

      <select
        value={address.paymentMethod}
        onChange={(e) =>
          setAddress({ ...address, paymentMethod: e.target.value })
        }
        disabled
        className="w-full p-3 border rounded"
        required
      >
        <option value="">Select Payment Method</option>
        <option value="paystack">Paystack</option>
      </select>

      <button
        type="submit"
        className="w-full bg-black text-white p-3 rounded"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Address"}
      </button>
    </form>
  );
}
