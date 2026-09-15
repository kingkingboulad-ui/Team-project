"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { HeartPulse, Mail, Lock } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      role: "admin",
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    router.push(callbackUrl || "/admin-dashboard");
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-700/30 bg-navy-950 text-teal-400">
          <HeartPulse size={22} />
        </span>
        <h1 className="mt-4 text-xl font-bold text-white">NurseConnect</h1>
        <p className="text-xs uppercase tracking-wide text-white/40">Admin Portal</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        {error && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>
        )}

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-white/60">Email Address</span>
          <span className="relative flex items-center">
            <Mail size={16} className="absolute left-3 text-white/30" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-lg border border-white/10 bg-navy-950 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-teal-500 focus:outline-none"
            />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-white/60">Password</span>
          <span className="relative flex items-center">
            <Lock size={16} className="absolute left-3 text-white/30" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-navy-950 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-teal-500 focus:outline-none"
            />
          </span>
        </label>

        <Button type="submit" variant="solid" className="w-full" disabled={loading}>
          {loading ? "Signing In…" : "Sign In to Admin Portal"}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-white/30">
        Demo admin login — admin@example.com / Admin123!
      </p>

      <p className="mt-3 text-center text-sm">
        <Link href="/login" className="text-white/50 hover:text-white">
          ← Back to main site login
        </Link>
      </p>
    </div>
  );
}
