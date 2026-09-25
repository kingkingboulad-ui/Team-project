"use client";

import { Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function AIMatch() {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-[#0F5C64] to-[#2B7A9F] px-4 py-14 text-white sm:px-6 sm:py-20">
      <div className="container-content grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center">
        
        {/* Left Side */}
        <div>
          <span className="eyebrow">
            {t("poweredByAI")}
          </span>

          <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-4xl">
            {t("letAIHelp")}
          </h2>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-teal-100/90 sm:text-base">
            {t("aiMatchingDescription")}
          </p>

          <Button
            href="/Ai-care-assistant"
            variant="primary"
            className="mt-6 sm:mt-8"
          >
            {t("tryAIMatching")}
          </Button>
        </div>

        {/* Right Side */}
        <div className="rounded-2xl bg-white p-4 text-navy-900 shadow-xl sm:p-6">
          
          <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
            <Sparkles size={16} />
            {t("aiMatchSummary")}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-navy-900/70">
            {t("aiMatchSummaryDescription")}
          </p>

          <dl className="mt-5 space-y-4 text-sm">
            
            {/* Recommended Care Type */}
            <div className="flex items-center justify-between gap-4">
              <dt className="text-navy-900/60">
                {t("recommendedCareType")}
              </dt>

              <dd className="font-semibold text-right">
                {t("postSurgicalRecovery")}
              </dd>
            </div>

            {/* Visit Frequency */}
            <div className="flex items-center justify-between gap-4">
              <dt className="text-navy-900/60">
                {t("visitFrequency")}
              </dt>

              <dd className="font-semibold text-right">
                {t("dailyMorningsPreferred")}
              </dd>
            </div>

            {/* Matches Nearby */}
            <div className="flex items-center justify-between gap-4">
              <dt className="text-navy-900/60">
                {t("matchesNearby")}
              </dt>

              <dd className="font-semibold text-right">
                {t("nursesAvailable")}
              </dd>
            </div>

            {/* Estimated Response */}
            <div className="flex items-center justify-between gap-4">
              <dt className="text-navy-900/60">
                {t("estimatedResponse")}
              </dt>

              <dd className="font-semibold text-right text-teal-700">
                {t("underTwoHours")}
              </dd>
            </div>

          </dl>

          <Button
            href="/Ai-care-assistant"
            variant="solid"
            className="mt-6 w-full"
          >
            {t("viewMyMatches")}
          </Button>
        </div>
      </div>
    </section>
  );
}