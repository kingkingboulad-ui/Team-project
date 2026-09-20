"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";

export default function LicenseVerificationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F1F8FB]">
    

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1100px]">

          {/* Header */}
          <div className="mb-7">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7E83]">
              REGISTRATION SUBMITTED
            </p>

            <h1 className="mt-1 text-[22px] font-bold text-[#092F35]">
              Onboarding Status
            </h1>

            <p className="mt-1 text-[11px] text-[#71858A]">
              Track your application and complete the required steps.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-7 rounded-lg border border-[#D7E3E5] bg-white px-5 py-5 shadow-sm">
            <div className="flex items-center">

              {/* 01 */}
              <div className="flex flex-1 items-center">
                <div className="flex flex-col items-center">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#006D77] text-white">
                    <CheckCircle2 size={15} />
                  </div>

                  <span className="mt-2 text-[9px] font-semibold text-[#456268]">
                    ACCOUNT CREATED
                  </span>

                </div>

                <div className="mx-2 h-[2px] flex-1 bg-[#006D77]" />
              </div>

              {/* 02 */}
              <div className="flex flex-1 items-center">
                <div className="flex flex-col items-center">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#006D77] text-[10px] font-bold text-white">
                    02
                  </div>

                  <span className="mt-2 text-[9px] font-semibold text-[#456268]">
                    LICENSE VERIFICATION
                  </span>

                </div>

                <div className="mx-2 h-[2px] flex-1 bg-[#D7E3E5]" />
              </div>

              {/* 03 */}
              <div className="flex flex-1 items-center">
                <div className="flex flex-col items-center">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7EFF1] text-[10px] font-bold text-[#71858A]">
                    03
                  </div>

                  <span className="mt-2 text-[9px] font-semibold text-[#8A9B9F]">
                    BACKGROUND CHECK
                  </span>

                </div>

                <div className="mx-2 h-[2px] flex-1 bg-[#D7E3E5]" />
              </div>

              {/* 04 */}
              <div className="flex flex-col items-center">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7EFF1] text-[10px] font-bold text-[#71858A]">
                  04
                </div>

                <span className="mt-2 text-[9px] font-semibold text-[#8A9B9F]">
                  ACTIVATION
                </span>

              </div>

            </div>
          </div>

          {/* Content */}
          <div className="grid gap-6 lg:grid-cols-[1fr_260px]">

            {/* Main Card */}
            <section className="rounded-lg border border-[#D7E3E5] bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between border-b border-[#E1EAEC] pb-5">

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#006D77]">
                    ACTIVE PROCESS
                  </p>

                  <h2 className="mt-1 text-[19px] font-bold text-[#092F35]">
                    License Verification
                  </h2>
                </div>

                <span className="flex items-center gap-1 rounded-full bg-[#E8F6F3] px-3 py-1 text-[9px] font-semibold text-[#006D77]">
                  <Clock3 size={11} />
                  IN PROGRESS
                </span>

              </div>

              <p className="mt-5 text-[11px] leading-5 text-[#657B80]">
                We have received your documents and your professional
                credentials are currently being reviewed. This verification
                helps ensure all nurses meet our professional standards.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                {/* Documents */}
                <div className="rounded-md border border-[#D7E3E5] bg-[#F8FBFC] p-4">

                  <FileCheck2
                    size={18}
                    className="text-[#006D77]"
                  />

                  <p className="mt-3 text-[10px] font-semibold uppercase text-[#456268]">
                    DOCUMENTS SUBMITTED
                  </p>

                  <p className="mt-2 text-[11px] text-[#657B80]">
                    ✓ Nursing License
                  </p>

                  <p className="mt-1 text-[11px] text-[#657B80]">
                    ✓ Curriculum Vitae
                  </p>

                </div>

                {/* Status */}
                <div className="rounded-md border border-[#D7E3E5] bg-[#F8FBFC] p-4">

                  <ShieldCheck
                    size={18}
                    className="text-[#006D77]"
                  />

                  <p className="mt-3 text-[10px] font-semibold uppercase text-[#456268]">
                    VERIFICATION STATUS
                  </p>

                  <p className="mt-2 text-[11px] font-semibold text-[#006D77]">
                    Documents Under Review
                  </p>

                  <p className="mt-1 text-[10px] text-[#71858A]">
                    Usually completed within 24–48 hours.
                  </p>

                </div>

              </div>

              <div className="mt-5 rounded-md bg-[#DDF5F8] px-4 py-3">

                <p className="text-[10px] leading-5 text-[#31565C]">
                  Your documents are securely reviewed by our verification
                  team. You will be notified when this step is complete.
                </p>

              </div>

            </section>

            {/* Right Side */}
            <aside className="rounded-lg border border-[#D7E3E5] bg-white p-5 shadow-sm">

              <p className="text-[10px] font-semibold uppercase text-[#71858A]">
                REQUIRED ACTIONS
              </p>

              <h3 className="mt-2 text-[15px] font-bold text-[#092F35]">
                Application Submitted
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-[#71858A]">
                Your registration has been successfully submitted.
                No additional action is required at this stage.
              </p>

              <div className="mt-5 rounded-md bg-[#F1F8FB] p-3">

                <p className="text-[9px] font-semibold uppercase text-[#71858A]">
                  NEXT STEP
                </p>

                <p className="mt-1 text-[11px] font-semibold text-[#006D77]">
                  Background Check
                </p>

              </div>

            </aside>

          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-between">

            <button
              onClick={() => router.push("/join-as-a-nurse")}
              className="rounded-md border border-[#CBDADD] bg-white px-5 py-2 text-[10px] font-semibold text-[#567278]"
            >
              ← Back
            </button>

            <button
              onClick={() =>
                router.push("/join-as-a-nurse/background-check")
              }
              className="rounded-md bg-[#006D77] px-6 py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#00535B]"
            >
              Continue →
            </button>

          </div>

        </div>
      </main>

      
    </div>
  );
}