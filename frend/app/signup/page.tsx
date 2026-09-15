import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ShieldCheck,
  LockKeyhole,
  Eye,
  UserRound,
} from "lucide-react";

export default function SignupPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F3F8FA] px-3 py-4 sm:px-4 sm:py-6">
        <div className="mx-auto grid w-full max-w-[1180px] overflow-hidden rounded-lg bg-white shadow-sm lg:grid-cols-2">

          {/* ================= LEFT SIDE ================= */}
          <div className="relative h-[300px] overflow-hidden sm:h-[380px] lg:h-[620px]">

            {/* Image */}
            <Image
              src="/images/image1.png"
              alt="Nurse caring for a patient"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#003F46]/45" />

            {/* Text over image */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-8 text-white">

              <div className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-wider sm:text-[10px]">

                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#9FF0FB] text-[#00535B]">
                  <ShieldCheck size={12} />
                </span>

                Trusted & Secure
              </div>

              <h2 className="max-w-[300px] text-2xl font-bold leading-tight sm:text-3xl">
                Empowering your
                <br />
                healthcare journey.
              </h2>

              <p className="mt-2 max-w-[320px] text-[10px] leading-4 text-white/80 sm:mt-3 sm:text-xs sm:leading-5">
                Access verified, compassionate nursing care directly from your
                home. We&apos;re here to support your family&apos;s health.
              </p>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="bg-[#F4FAFC] px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-10">

            {/* Heading */}
            <div className="mb-5 sm:mb-6">

              <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-md bg-[#006D77] text-white sm:mb-4">
                <UserRound size={14} />
              </div>

              <h1 className="text-[19px] font-bold leading-tight text-[#102F3A] sm:text-[20px]">
                Find the care your family
                <br />
                deserves.
              </h1>

              <p className="mt-2 max-w-[390px] text-[10px] leading-4 text-gray-500 sm:text-[11px]">
                Join NurseConnect to connect with verified, compassionate
                nurses in your area.
              </p>
            </div>

            {/* ================= FORM ================= */}
            <form className="space-y-3">

              {/* First Name + Last Name */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1 block text-[9px] font-semibold text-[#173944]"
                  >
                    First Name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={12}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                    />

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Jane"
                      className="h-10 w-full rounded-md border border-transparent bg-white pl-8 pr-3 text-[10px] outline-none placeholder:text-gray-300 focus:border-[#70DCE8]"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1 block text-[9px] font-semibold text-[#173944]"
                  >
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    className="h-10 w-full rounded-md border border-transparent bg-white px-3 text-[10px] outline-none placeholder:text-gray-300 focus:border-[#70DCE8]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-[9px] font-semibold text-[#173944]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-10 w-full rounded-md border border-transparent bg-white px-3 text-[10px] outline-none placeholder:text-gray-300 focus:border-[#70DCE8]"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-[9px] font-semibold text-[#173944]"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  className="h-10 w-full rounded-md border border-transparent bg-white px-3 text-[10px] outline-none placeholder:text-gray-300 focus:border-[#70DCE8]"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-[9px] font-semibold text-[#173944]"
                >
                  Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={12}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                  />

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-10 w-full rounded-md border border-transparent bg-white px-8 text-[10px] outline-none placeholder:text-gray-300 focus:border-[#70DCE8]"
                  />

                  <Eye
                    size={12}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                  />
                </div>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#006D77] text-[10px] font-semibold text-white transition hover:bg-[#00535B] sm:h-11"
              >
                Create Patient Account
                <span>→</span>
              </button>
            </form>

            {/* ================= PRIVACY BOX ================= */}
            <div className="mt-5 flex gap-3 rounded-md border border-[#BCEAF0] bg-[#E1F8FC] p-3 sm:mt-6">

              <ShieldCheck
                size={14}
                className="mt-0.5 shrink-0 text-[#006D77]"
              />

              <div>
                <p className="text-[9px] font-bold text-[#173944]">
                  Secure & Private
                </p>

                <p className="mt-1 text-[8px] leading-3 text-gray-500">
                  HIPAA compliant platform with 256-bit encryption ensuring
                  your data remains completely private.
                </p>
              </div>
            </div>

            {/* ================= LOGIN LINK ================= */}
            <p className="mt-5 text-[9px] text-gray-500 sm:mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#006D77] hover:underline"
              >
                Sign In →
              </Link>
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
