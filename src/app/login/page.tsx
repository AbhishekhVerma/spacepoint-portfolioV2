"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials. Try again.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-md border-2 border-[var(--gray-light)] p-8 shadow-[8px_8px_0px_0px_var(--gray-dark)] bg-neutral-900">
        <h1 className="font-mono text-2xl font-bold text-[var(--accent-telemetry-orange)] mb-6 uppercase">
          &gt; OPERATOR_LOGIN
        </h1>
        
        {error && (
          <div className="bg-red-900/30 border-l-4 border-red-500 p-3 mb-6 font-mono text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-mono text-[var(--gray-light)] text-sm mb-2">
              [ EMAIL_ADDRESS ]
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-800 border border-[var(--gray-light)] text-[var(--foreground)] p-3 font-mono focus:outline-none focus:border-[var(--accent-telemetry-orange)]"
              placeholder="operator@spacepoint.com"
            />
          </div>

          <div>
            <label className="block font-mono text-[var(--gray-light)] text-sm mb-2">
              [ AUTH_TOKEN / PASSWORD ]
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-800 border border-[var(--gray-light)] text-[var(--foreground)] p-3 font-mono focus:outline-none focus:border-[var(--accent-telemetry-orange)]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--accent-telemetry-orange)] text-[var(--background)] font-mono font-bold uppercase p-3 hover:bg-[var(--accent-neon-red)] transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? "AUTHENTICATING..." : "ESTABLISH_CONNECTION"}
          </button>
        </form>
      </div>
    </div>
  );
}
