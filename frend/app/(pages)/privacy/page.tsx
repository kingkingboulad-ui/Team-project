"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  LockKeyhole,
  EyeOff,
  FolderOpen,
  UsersRound,
  Settings,
  Mail,
  ArrowLeft,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function PrivacyPage() {
  const { t, dir } = useLanguage();

  const sections = [
    {
      icon: FolderOpen,
      title: "privacy.collectTitle",
      tag: "privacy.collectTag",
      description: "privacy.collectDescription",
    },
    {
      icon: UsersRound,
      title: "privacy.useTitle",
      tag: "privacy.useTag",
      description: "privacy.useDescription",
    },
    {
      icon: LockKeyhole,
      title: "privacy.protectionTitle",
      tag: "privacy.protectionTag",
      description: "privacy.protectionDescription",
    },
    {
      icon: Settings,
      title: "privacy.rightsTitle",
      tag: "privacy.rightsTag",
      description: "privacy.rightsDescription",
    },
    {
      icon: Mail,
      title: "privacy.contactTitle",
      tag: "privacy.contactTag",
      description: "privacy.contactDescription",
    },
  ];

  return (
    <div
      dir={dir}
      className="min-h-screen bg-[#EDFCFF] text-[#001F24]"
    >
   

      <main className="w-full bg-[#EDFCFF] pt-20">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-16 lg:py-8">

          {/* HERO */}
          <header className="relative mb-6 overflow-hidden rounded-xl bg-[#DBF9FF] p-6 shadow-sm lg:p-10">
            <div className="relative z-10 flex max-w-3xl flex-col gap-4">

              {/* Badge */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#A9ECE5] px-4 py-2 text-[#286D67]">
                <ShieldCheck size={16} />

                <span className="text-xs font-semibold uppercase tracking-wider">
                  {t("privacy.badge")}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold tracking-tight text-[#001F24] sm:text-4xl lg:text-[42px] lg:leading-[50px]">
                {t("privacy.title")}
              </h1>

              {/* Description */}
              <p className="max-w-2xl text-base leading-relaxed text-[#3E494A] sm:text-lg">
                {t("privacy.description")}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs text-[#3E494A]">
                <span className="flex items-center gap-2">
                  <Clock3 size={17} className="text-[#00535B]" />
                  {t("privacy.readTime")}
                </span>

                <span className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-[#00535B]" />
                  {t("privacy.dataProtection")}
                </span>
              </div>
            </div>

            {/* Decorative Circle */}
            <div className="pointer-events-none absolute -right-16 -top-16 hidden h-72 w-72 rounded-full border border-[#006972]/20 lg:block" />

            <div className="pointer-events-none absolute -right-4 top-8 hidden h-56 w-56 rounded-full border border-[#006972]/15 lg:block" />
          </header>

          {/* TRUST CARDS */}
          <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* Card 1 */}
            <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ACEFE7] text-[#00535B]">
                <ShieldCheck size={25} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#001F24]">
                  {t("privacy.trustOneTitle")}
                </h3>

                <p className="text-xs leading-relaxed text-[#3E494A]">
                  {t("privacy.trustOneDescription")}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#9FF0FB] text-[#00535B]">
                <LockKeyhole size={25} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#001F24]">
                  {t("privacy.trustTwoTitle")}
                </h3>

                <p className="text-xs leading-relaxed text-[#3E494A]">
                  {t("privacy.trustTwoDescription")}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C2E9F1] text-[#00535B]">
                <EyeOff size={25} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#001F24]">
                  {t("privacy.trustThreeTitle")}
                </h3>

                <p className="text-xs leading-relaxed text-[#3E494A]">
                  {t("privacy.trustThreeDescription")}
                </p>
              </div>
            </div>
          </section>

          {/* MAIN CONTENT */}
          <div className="mb-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

            {/* Privacy Sections */}
            <div className="flex flex-col gap-4 lg:col-span-8">
              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <article
                    key={section.title}
                    className="rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md lg:p-6"
                  >
                    <div className="flex items-start gap-4">

                      {/* Icon */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C2E9F1] text-[#00535B]">
                        <Icon size={21} />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col gap-2">

                        {/* Title + Tag */}
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <h2 className="text-lg font-bold text-[#001F24]">
                            {t(section.title)}
                          </h2>

                          <span className="w-fit rounded-full bg-[#C7EFF7] px-3 py-1 text-xs font-medium text-[#3E494A]">
                            {t(section.tag)}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-[#3E494A]">
                          {t(section.description)}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* SIDEBAR */}
            <aside className="flex flex-col gap-4 lg:col-span-4">

              {/* Data Protection */}
              <div className="flex flex-col gap-4 rounded-xl bg-[#DBF9FF] p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <LockKeyhole
                    size={23}
                    className="text-[#00535B]"
                  />

                  <h3 className="text-xl font-bold text-[#001F24]">
                    {t("privacy.protectionBoxTitle")}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-[#3E494A]">
                  {t("privacy.protectionBoxDescription")}
                </p>

                {/* Protection Steps */}
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-4">

                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#00535B]">
                        {t("privacy.protectionStepOne")}
                      </span>

                      <span className="text-[#3E494A]">
                        {t("privacy.protectionStepOneStatus")}
                      </span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-[#C2E9F1]">
                      <div className="h-2 w-full rounded-full bg-[#00535B]" />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#00535B]">
                        {t("privacy.protectionStepTwo")}
                      </span>

                      <span className="text-[#3E494A]">
                        {t("privacy.protectionStepTwoStatus")}
                      </span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-[#C2E9F1]">
                      <div className="h-2 w-4/5 rounded-full bg-[#00535B]" />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#00535B]">
                        {t("privacy.protectionStepThree")}
                      </span>

                      <span className="text-[#3E494A]">
                        {t("privacy.protectionStepThreeStatus")}
                      </span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-[#C2E9F1]">
                      <div className="h-2 w-3/4 rounded-full bg-[#236863]" />
                    </div>
                  </div>
                </div>

                {/* Checks */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-[#001F24]">
                    <CheckCircle2
                      size={16}
                      className="text-[#00535B]"
                    />

                    <span>{t("privacy.protectionCheckOne")}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#001F24]">
                    <CheckCircle2
                      size={16}
                      className="text-[#00535B]"
                    />

                    <span>{t("privacy.protectionCheckTwo")}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#001F24]">
                    <CheckCircle2
                      size={16}
                      className="text-[#00535B]"
                    />

                    <span>{t("privacy.protectionCheckThree")}</span>
                  </div>
                </div>
              </div>

              {/* Privacy Contact */}
              <div className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3E494A]">
                  {t("privacy.contactBoxLabel")}
                </span>

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A9ECE5] text-[#00535B]">
                    <Mail size={21} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#001F24]">
                      {t("privacy.contactBoxTitle")}
                    </h3>

                    <p className="text-xs text-[#3E494A]">
                      {t("privacy.contactBoxDescription")}
                    </p>
                  </div>
                </div>

                <a
                  href="mailto:privacy@nurseconnect.health"
                  className="text-sm font-semibold text-[#00535B] hover:underline"
                >
                  privacy@nurseconnect.health
                </a>
              </div>
            </aside>
          </div>

          {/* CTA */}
          <section className="flex flex-col items-center justify-between gap-6 rounded-xl bg-[#00535B] p-6 text-center shadow-xl md:flex-row md:text-start lg:p-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {t("privacy.ctaTitle")}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#9FF0FB]">
                {t("privacy.ctaDescription")}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap justify-center gap-3">
              <a
                href="mailto:privacy@nurseconnect.health"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#00535B] shadow-md transition-all hover:bg-[#DBF9FF]"
              >
                <Mail size={19} />
                {t("privacy.contactButton")}
              </a>

              <a
                href="/"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#006D77] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#166270]"
              >
                <ArrowLeft
                  size={19}
                  className={dir === "rtl" ? "rotate-180" : ""}
                />

                {t("privacy.homeButton")}
              </a>
            </div>
          </section>
        </div>
      </main>

   
    </div>
  );
}