"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  LockKeyhole,
  FileCheck2,
  UsersRound,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function SafetyPage() {
  const { t, dir } = useLanguage();

  const cards = [
    {
      icon: ShieldCheck,
      title: "safety.verifiedNurses",
      description: "safety.verifiedNursesDesc",
      check: "safety.verifiedNursesCheck",
    },
    {
      icon: LockKeyhole,
      title: "safety.secureBooking",
      description: "safety.secureBookingDesc",
      check: "safety.secureBookingCheck",
    },
    {
      icon: FileCheck2,
      title: "safety.transparentProfiles",
      description: "safety.transparentProfilesDesc",
      check: "safety.transparentProfilesCheck",
    },
    {
      icon: UsersRound,
      title: "safety.familyFocused",
      description: "safety.familyFocusedDesc",
      check: "safety.familyFocusedCheck",
    },
  ];

  return (
    <div
      dir={dir}
      className="min-h-screen bg-[#EDFCFF] text-[#001F24]"
    >
  
      <main className="w-full pt-20">
        {/* Background Glow */}
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-[#ACEFE7]/40 blur-3xl" />

          <div className="pointer-events-none absolute left-[-80px] top-1/2 h-80 w-80 rounded-full bg-[#C7EFF7]/60 blur-2xl" />

          {/* HERO */}
          <section className="mx-auto flex max-w-[1280px] flex-col items-center px-4 pb-12 pt-12 text-center sm:px-6 lg:px-16 lg:pb-16 lg:pt-16">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#C7EFF7] px-4 py-2 text-[#00535B] shadow-sm">
              <ShieldCheck size={17} strokeWidth={2.2} />

              <span className="text-xs font-semibold uppercase tracking-wider">
                {t("safety.badge")}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-[#001F24] sm:text-4xl lg:text-[42px] lg:leading-[50px]">
              {t("safety.title")}
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-base leading-relaxed text-[#3E494A] sm:text-lg">
              {t("safety.heroDescription")}
            </p>
          </section>

          {/* TRUST CARDS */}
          <section className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-16 lg:py-10">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              {cards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="group flex flex-col justify-between rounded-xl bg-white p-6 shadow-[0_4px_24px_rgba(0,45,51,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,45,51,0.08)] lg:p-8"
                  >
                    <div>
                      {/* Icon */}
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C2E9F1] text-[#00535B]">
                        <Icon size={25} strokeWidth={2} />
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-xl font-bold text-[#001F24]">
                        {t(card.title)}
                      </h3>

                      {/* Description */}
                      <p className="text-base leading-relaxed text-[#3E494A]">
                        {t(card.description)}
                      </p>
                    </div>

                    {/* Check */}
                    <div className="mt-6 flex items-center gap-2 text-[#00535B]">
                      <CheckCircle2 size={16} strokeWidth={2.3} />

                      <span className="text-xs font-semibold">
                        {t(card.check)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SAFETY NOTE */}
          <section className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-16">
            <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 rounded-xl bg-[#C7EFF7]/60 p-5 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:p-6">
              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#00535B] text-white">
                <ShieldCheck size={23} />
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-base leading-relaxed text-[#001F24]">
                  <span className="font-bold text-[#00535B]">
                    {t("safety.safetyNoteTitle")}
                  </span>{" "}
                  {t("safety.safetyNoteDescription")}
                </p>
              </div>

              {/* Trust Badge */}
              <div className="shrink-0 self-end sm:self-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#236863] shadow-sm">
                  <CheckCircle2 size={14} />
                  {t("safety.trustedCare")}
                </span>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mx-auto max-w-[1280px] px-4 pb-20 pt-10 text-center sm:px-6 lg:px-16">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#001F24] sm:text-3xl">
                {t("safety.trustedCare")}
              </h2>

              <p className="mb-8 text-base text-[#3E494A]">
                {t("safety.trustedCareDescription")}
              </p>

              <a
                href="/find-a-nurses"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#00535B] px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,83,91,0.2)] transition-all hover:bg-[#006D77] hover:shadow-[0_6px_24px_rgba(0,83,91,0.28)]"
              >
                <span>{t("safety.findNurse")}</span>

                <ArrowRight
                  size={19}
                  className={dir === "rtl" ? "rotate-180" : ""}
                />
              </a>
            </div>
          </section>
        </div>
      </main>
  
    </div>
  );
}