
"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BackgroundCheckPage() {
  const router = useRouter();
  const { t, dir } = useLanguage();

  const verificationItems = [
    t("backgroundCheck.criminalRecords"),
    t("backgroundCheck.sexRegistry"),
    t("backgroundCheck.employmentVerification"),
    t("backgroundCheck.educationVerification"),
  ];

  return (
    <div
      className="min-h-screen bg-[#F1F8FB]"
      dir={dir}
    >
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px]">

          {/* Header */}
          <div className="mb-7">

            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7E83]">
              {t("backgroundCheck.registrationSubmitted")}
            </p>

            <h1 className="mt-1 text-[22px] font-bold text-[#092F35]">
              {t("backgroundCheck.title")}
            </h1>

            <p className="mt-1 text-[11px] text-[#71858A]">
              {t("backgroundCheck.stepDescription")}
            </p>

          </div>

          {/* Progress */}
          <div className="mb-7 rounded-lg border border-[#D7E3E5] bg-white px-5 py-5 shadow-sm">

            <div className="flex items-center">

              {[
                {
                  key: "profile",
                  label: t("backgroundCheck.profile"),
                },
                {
                  key: "license",
                  label: t("backgroundCheck.license"),
                },
                {
                  key: "background",
                  label: t("backgroundCheck.background"),
                },
                {
                  key: "activation",
                  label: t("backgroundCheck.activation"),
                },
              ].map((step, index) => (

                <div
                  key={step.key}
                  className={`flex ${
                    index === 3 ? "" : "flex-1"
                  } items-center`}
                >

                  <div className="flex flex-col items-center">

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${
                        index <= 2
                          ? "bg-[#006D77] text-white"
                          : "bg-[#E7EFF1] text-[#71858A]"
                      }`}
                    >
                      {index <= 2 ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        "04"
                      )}
                    </div>

                    <span className="mt-2 text-[9px] font-semibold text-[#456268]">
                      {step.label}
                    </span>

                  </div>

                  {index < 3 && (
                    <div
                      className={`mx-2 h-[2px] flex-1 ${
                        index < 2
                          ? "bg-[#006D77]"
                          : "bg-[#D7E3E5]"
                      }`}
                    />
                  )}

                </div>

              ))}

            </div>

          </div>

          {/* Content */}
          <div className="grid gap-6 lg:grid-cols-[1fr_270px]">

            {/* Main */}
            <section className="rounded-lg border border-[#D7E3E5] bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between border-b border-[#E1EAEC] pb-5">

                <div>

                  <p className="text-[10px] font-semibold uppercase text-[#006D77]">
                    {t("backgroundCheck.currentStatus")}
                  </p>

                  <h2 className="mt-1 text-[19px] font-bold text-[#092F35]">
                    {t("backgroundCheck.title")}
                  </h2>

                </div>

                <span className="flex items-center gap-1 rounded-full bg-[#E8F6F3] px-3 py-1 text-[9px] font-semibold text-[#006D77]">
                  <Clock3 size={11} />
                  {t("backgroundCheck.inProgress")}
                </span>

              </div>

              <p className="mt-5 text-[11px] leading-5 text-[#657B80]">
                {t("backgroundCheck.description")}
              </p>

              {/* Required Actions */}
              <div className="mt-6 rounded-md border border-[#F0D9D9] bg-[#FFF7F7] p-5">

                <p className="text-[9px] font-bold uppercase text-[#B85C5C]">
                  {t("backgroundCheck.requiredActions")}
                </p>

                <h3 className="mt-2 text-[14px] font-bold text-[#092F35]">
                  {t("backgroundCheck.verificationInformation")}
                </h3>

                <p className="mt-1 text-[10px] leading-5 text-[#657B80]">
                  {t("backgroundCheck.informationDescription")}
                </p>

                <button   onClick={() => router.push("/profile")}  className="mt-4 rounded-md bg-[#006D77] px-5 py-2 text-[10px] font-semibold text-white">
                  {t("backgroundCheck.reviewInformation")}
                </button>

              </div>

              {/* Security */}
              <div className="mt-5 flex gap-3 rounded-md bg-[#DDF5F8] p-4">

                <ShieldCheck
                  size={18}
                  className="shrink-0 text-[#006D77]"
                />

                <p className="text-[10px] leading-5 text-[#31565C]">
                  {t("backgroundCheck.securityMessage")}
                </p>

              </div>

            </section>

            {/* Right */}
            <aside className="space-y-5">

              {/* Scope */}
              <div className="rounded-lg border border-[#D7E3E5] bg-white p-5 shadow-sm">

                <h3 className="text-[14px] font-bold text-[#092F35]">
                  {t("backgroundCheck.verificationScope")}
                </h3>

                <div className="mt-4 space-y-3">

                  {verificationItems.map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-2 text-[10px] text-[#657B80]"
                    >

                      <CheckCircle2
                        size={13}
                        className="text-[#006D77]"
                      />

                      {item}

                    </div>

                  ))}

                </div>

              </div>

              {/* Timeline */}
              <div className="rounded-lg border border-[#D7E3E5] bg-white p-5 shadow-sm">

                <h3 className="text-[14px] font-bold text-[#092F35]">
                  {t("backgroundCheck.timeline")}
                </h3>

                <div className="mt-4 space-y-4">

                  <div>
                    <p className="text-[10px] font-semibold text-[#006D77]">
                      ✓ {t("backgroundCheck.requestSubmitted")}
                    </p>

                    <p className="mt-1 text-[9px] text-[#8A9B9F]">
                      {t("backgroundCheck.backgroundStarted")}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-[#006D77]">
                      ● {t("backgroundCheck.backgroundReview")}
                    </p>

                    <p className="mt-1 text-[9px] text-[#8A9B9F]">
                      {t("backgroundCheck.currentlyInProgress")}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-[#A2B0B3]">
                      ○ {t("backgroundCheck.approval")}
                    </p>

                    <p className="mt-1 text-[9px] text-[#A2B0B3]">
                      {t("backgroundCheck.waitingVerification")}
                    </p>
                  </div>

                </div>

              </div>

            </aside>

          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-between">

            <button
              onClick={() =>
                router.push("/join-as-a-nurse/license-verification")
              }
              className="rounded-md border border-[#CBDADD] bg-white px-5 py-2 text-[10px] font-semibold text-[#567278]"
            >
              {dir === "rtl" ? "→" : "←"}{" "}
              {t("common.back")}
            </button>

            <button
              onClick={() =>
                router.push("/join-as-a-nurse/activated")
              }
              className="rounded-md bg-[#006D77] px-6 py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#00535B]"
            >
              {t("common.continue")}{" "}
              {dir === "rtl" ? "←" : "→"}
            </button>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
