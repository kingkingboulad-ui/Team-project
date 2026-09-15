"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, HeartPulse } from "lucide-react";
import Button from "@/components/ui/Button";

type Role = "patient" | "nurse";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const [role, setRole] = useState<Role>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      console.log("Logged in user:", data.user);

      router.push(callbackUrl || "/");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleSignIn() {
    signIn("google", {
      callbackUrl: callbackUrl || "/",
    });
  }

  return (
    <div className="w-full max-w-md">
      {/* Icon */}
      <div className="mb-4 flex justify-center lg:justify-start">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-700 text-white">
          <HeartPulse size={19} />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold leading-tight text-navy-900">
        Welcome back
      </h1>

      <p className="mt-1 text-sm text-navy-900/60">
        Sign in to continue your care journey.
      </p>

      {/* Patient / Nurse */}
      <div className="mt-6 grid grid-cols-2 gap-1 rounded-lg bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => {
            setRole("patient");
            setError(null);
          }}
          className={`rounded-md py-2 text-sm font-semibold transition-colors ${
            role === "patient"
              ? "bg-teal-700 text-white"
              : "text-navy-900/60 hover:text-navy-900"
          }`}
        >
          Patient Login
        </button>

        <button
          type="button"
          onClick={() => {
            setRole("nurse");
            setError(null);
          }}
          className={`rounded-md py-2 text-sm font-semibold transition-colors ${
            role === "nurse"
              ? "bg-teal-700 text-white"
              : "text-navy-900/60 hover:text-navy-900"
          }`}
        >
          Nurse Login
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-5 space-y-4 rounded-2xl bg-white p-6 shadow-sm"
      >
        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Email */}
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-medium text-navy-900/70">
            Email Address
          </span>

          <div className="relative flex items-center">
            <Mail
              size={15}
              className="absolute left-3 text-navy-900/35"
            />

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-lg border border-black/10 bg-cloud py-2.5 pl-9 pr-3 text-sm placeholder:text-navy-900/35 focus:border-teal-600 focus:outline-none"
            />
          </div>
        </label>

        {/* Password */}
        <label className="block">
          <span className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-navy-900/70">
            <span>Password</span>

            <Link
              href="/forgot-password"
              className="font-semibold text-teal-700 hover:underline"
            >
              Forgot password?
            </Link>
          </span>

          <div className="relative flex items-center">
            <Lock
              size={15}
              className="absolute left-3 text-navy-900/35"
            />

            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-black/10 bg-cloud py-2.5 pl-9 pr-10 text-sm placeholder:text-navy-900/35 focus:border-teal-600 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 text-navy-900/35 hover:text-navy-900/70"
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={15} />
              ) : (
                <Eye size={15} />
              )}
            </button>
          </div>
        </label>

        {/* Remember */}
        <label className="flex items-center gap-2 text-xs text-navy-900/60">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-black/20 text-teal-700 focus:ring-teal-600"
          />

          Remember me
        </label>

        {/* Login button */}
        <Button
          type="submit"
          variant="solid"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In →"}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 text-[10px] text-navy-900/35">
          <span className="h-px flex-1 bg-black/10" />
          OR CONTINUE WITH
          <span className="h-px flex-1 bg-black/10" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-black/10 bg-white py-2.5 text-sm font-medium text-navy-900 hover:bg-cloud"
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </form>

      {/* Signup */}
      <p className="mt-4 text-center text-xs text-navy-900/55">
        {role === "patient" ? (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-teal-700 hover:underline"
            >
              Create Account
            </Link>
          </>
        ) : (
          <>
            Not a member?{" "}
            <Link
              href="/join-nurse"
              className="font-semibold text-teal-700 hover:underline"
            >
              Join our nursing network
            </Link>
          </>
        )}
      </p>

      {/* Security */}
      <div className="mt-5 rounded-lg border border-teal-100 bg-teal-50 px-4 py-3">
        <p className="text-[11px] font-semibold text-teal-900">
          🔒 Secure & Private
        </p>

        <p className="mt-1 text-[10px] leading-relaxed text-teal-800/70">
          Your account information is protected and handled securely.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />

      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />

      <path
        fill="#FBBC05"
        d="M5.84 14.14A6.6 6.6 0 0 1 5.5 12c0-.74.13-1.47.34-2.14V7.02H2.18A10.97 10.97 0 0 0 1 12c0 1.77.42 3.45 1.18 4.98l3.66-2.84z"
      />

      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.02l3.66 2.84c.87-2.6 3.3-4.48 6.16-4.48z"
      />
    </svg>
  );
}