import { Suspense } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="grid min-h-[640px] lg:grid-cols-2">
        {/* LEFT - Image */}
        <div className="relative hidden min-h-[640px] lg:block">
          <Image
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&h=1100&fit=crop"
            alt="Nurse caring for a patient"
            fill
            className="object-cover"
            priority
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

          {/* Text over image */}
          <div className="absolute bottom-10 left-8 right-8 text-white">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-teal-200">
              <span className="h-2 w-2 rounded-full bg-teal-300" />
              Trusted & Secure
            </div>

            <h2 className="max-w-md text-3xl font-bold leading-tight">
              Welcome back to your
              <br />
              healthcare journey.
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
              Sign in to connect with trusted nurses and continue
              managing your family&apos;s care with confidence.
            </p>
          </div>
        </div>

        {/* RIGHT - Login */}
        <div className="flex items-center justify-center bg-cloud px-6 py-12 lg:px-12">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}