"use client";

import {
  ShieldCheck,
  Star,
  Leaf,
  MessageCircle,
  Lock,
  BadgeCheck,
} from "lucide-react";
import { trustFeatures } from "@/data/content";
import { useLanguage } from "@/context/LanguageContext";

const icons = {
  "shield-check": ShieldCheck,
  star: Star,
  leaf: Leaf,
  "message-circle": MessageCircle,
  lock: Lock,
  "badge-check": BadgeCheck,
};

const featureTranslationKeys = {
  "shield-check": {
    title: "backgroundVerified",
    description: "backgroundVerifiedDescription",
  },
  star: {
    title: "ratingsReviews",
    description: "ratingsReviewsDescription",
  },
  leaf: {
    title: "flexibleScheduling",
    description: "flexibleSchedulingDescription",
  },
  "message-circle": {
    title: "secureMessaging",
    description: "secureMessagingDescription",
  },
  lock: {
    title: "securePayments",
    description: "securePaymentsDescription",
  },
  "badge-check": {
    title: "licensedInsured",
    description: "licensedInsuredDescription",
  },
};

export default function CareYouCanTrust() {
  const { t } = useLanguage();

  return (
    <section className="bg-cloud py-20">
      <div className="container-content text-center">
        <span className="eyebrow-light">
          {t("whyFamiliesChooseUs")}
        </span>

        <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">
          {t("careYouCanTrust")}
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-navy-900/60">
          {t("whyChooseDescription")}
        </p>

        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {/* bel content.ts 3na:
              {
                icon: "shield-check",
                title: "Background-Verified",
              }

              feature.icon = "shield-check"
              weste3mela la na3ref ayya icon n7ot
          */}

          {trustFeatures.map((feature) => {
            const Icon = icons[feature.icon as keyof typeof icons];

            const translation =
              featureTranslationKeys[
                feature.icon as keyof typeof featureTranslationKeys
              ];

            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <Icon size={20} />
                  </span>

                  <h3 className="font-semibold text-navy-900">
                    {t(translation.title)}
                  </h3>
                </div>

                <p className="mt-3 text-sm text-navy-900/60">
                  {t(translation.description)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}