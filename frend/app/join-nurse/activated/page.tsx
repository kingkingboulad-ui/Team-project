"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2 } from "lucide-react";

export default function ActivatedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F1F8FB]">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px]">

          {/* Header */}
          <div className="mb-7">

            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7E83]">
              REGISTRATION SUBMITTED
            </p>

            <h1 className="mt-1 text-[22px] font-bold text-[#092F35]">
              Account Activated
            </h1>

          </div>

          {/* Progress */}
          <div className="mb-8 rounded-lg border border-[#D7E3E5] bg-white px-5 py-5 shadow-sm">

            <div className="flex items-center">

              {[
                "PROFILE",
                "LICENSE",
                "BACKGROUND",
                "ACTIVATION",
              ].map((step, index) => (

                <div
                  key={step}
                  className={`flex ${
                    index === 3 ? "" : "flex-1"
                  } items-center`}
                >

                  <div className="flex flex-col items-center">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#006D77] text-white">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="mt-2 text-[9px] font-semibold text-[#456268]">
                      {step}
                    </span>

                  </div>

                  {index < 3 && (
                    <div className="mx-2 h-[2px] flex-1 bg-[#006D77]" />
                  )}

                </div>

              ))}

            </div>

          </div>

          {/* Success */}
          <div className="mb-7 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DDF5F8]">

              <CheckCircle2
                size={34}
                className="text-[#006D77]"
              />

            </div>

            <h2 className="mt-5 text-[22px] font-bold text-[#092F35]">
              Account Activated & Ready for Work!
            </h2>

            <p className="mx-auto mt-2 max-w-[550px] text-[11px] leading-5 text-[#71858A]">
              Welcome to the team. Your clinical credentials have been
              verified, and your profile is now active on NurseConnect.
            </p>

          </div>

          {/* Cards */}
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

            {/* First Steps */}
            <section className="rounded-lg border border-[#D7E3E5] bg-white p-6 shadow-sm">

              <h3 className="text-[16px] font-bold text-[#092F35]">
                Your First Steps
              </h3>

              <div className="mt-5 space-y-3">

                {/* 1 */}
                <div className="flex gap-3 rounded-md bg-[#F7FAFB] p-4">

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#006D77] text-[10px] font-bold text-white">
                    1
                  </div>

                  <div>

                    <h4 className="text-[11px] font-semibold text-[#17363B]">
                      Complete Your Profile
                    </h4>

                    <p className="mt-1 text-[10px] leading-4 text-[#71858A]">
                      Add your professional experience and preferences so
                      patients can find you.
                    </p>

                  </div>

                </div>

                {/* 2 */}
                <div className="flex gap-3 rounded-md bg-[#F7FAFB] p-4">

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#006D77] text-[10px] font-bold text-white">
                    2
                  </div>

                  <div>

                    <h4 className="text-[11px] font-semibold text-[#17363B]">
                      Set Your Availability
                    </h4>

                    <p className="mt-1 text-[10px] leading-4 text-[#71858A]">
                      Choose when you are available for new nursing requests.
                    </p>

                  </div>

                </div>

                {/* 3 */}
                <div className="flex gap-3 rounded-md bg-[#F7FAFB] p-4">

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#006D77] text-[10px] font-bold text-white">
                    3
                  </div>

                  <div>

                    <h4 className="text-[11px] font-semibold text-[#17363B]">
                      Browse Care Requests
                    </h4>

                    <p className="mt-1 text-[10px] leading-4 text-[#71858A]">
                      View suitable patient requests and apply to provide
                      care.
                    </p>

                  </div>

                </div>

              </div>

            </section>

            {/* Nurse Profile */}
            <aside className="rounded-lg bg-[#006D77] p-5 text-white shadow-sm">

              <p className="text-[9px] font-semibold uppercase tracking-wide text-white/70">
                NURSECONNECT
              </p>

              <div className="mt-5 flex items-center gap-3">

                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white/20">

                  <img
                    src="/images/nurse1.png"
                    alt="Nurse"
                    className="h-full w-full object-contain"
                  />

                </div>

                <div>

                  <h3 className="text-[12px] font-bold">
                    Sarah Jenkins, RN
                  </h3>

                  <p className="mt-1 text-[9px] text-white/70">
                    Registered Nurse
                  </p>

                </div>

              </div>

              <div className="mt-6 rounded-md bg-white/10 p-4">

                <p className="text-[10px] font-semibold">
                  Your profile is ready.
                </p>

                <p className="mt-1 text-[9px] leading-4 text-white/70">
                  Patients can now discover your profile and send care
                  requests.
                </p>

              </div>

              <button
                onClick={() => router.push("/nurses")}
                className="mt-5 w-full rounded-md bg-white py-2.5 text-[10px] font-bold text-[#006D77]"
              >
                Go to Profile →
              </button>

            </aside>

          </div>

          {/* Final Button */}
          <div className="mt-7 flex justify-center">

            <button
              onClick={() => router.push("/nurses")}
              className="rounded-md bg-[#006D77] px-7 py-3 text-[10px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#00535B]"
            >
              Start Finding Care Requests →
            </button>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}