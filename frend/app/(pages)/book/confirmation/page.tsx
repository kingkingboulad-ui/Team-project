"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { useBooking } from "../BookingContext";

export default function ConfirmationPage() {
  const { data, reset } = useBooking();
  const { t } = useLanguage();

  const durationLabels: Record<string, string> = {
    "1-hour": t("confirmation.oneHour"),
    "2-hours": t("confirmation.twoHours"),
    "4-hours": t("confirmation.fourHours"),
    "8-hours": t("confirmation.eightHours"),
    "12-hours": t("confirmation.twelveHours"),
    "24-hours": t("confirmation.twentyFourHours"),
  };

  const summaryRows = [
    ...(data.preferredNurseName
      ? [
          {
            label: t("confirmation.preferredNurse"),
            value: data.preferredNurseName,
          },
        ]
      : []),

    {
      label: t("confirmation.careFor"),
      value: data.careForLabel,
    },

    {
      label: t("confirmation.careType"),
      value: data.careTypeLabel,
    },

    {
      label: t("confirmation.startDate"),
      value: data.startDate,
    },

    {
      label: t("confirmation.duration"),
      value:
        durationLabels[data.careDuration] ?? data.careDuration,
    },

    {
      label: t("confirmation.location"),
      value: data.careAddress,
    },
  ];

  // Clear the booking draft when leaving the confirmation page.
  useEffect(() => {
    return () => reset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F8FB]">
      <main className="flex min-h-[650px] items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
        <section className="w-full max-w-[560px] rounded-xl bg-white px-4 py-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:px-8 sm:py-9">

          {/* Success Icon */}
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 sm:h-14 sm:w-14">
            <CheckCircle2
              size={25}
              className="sm:h-7 sm:w-7"
            />
          </span>

          {/* Title */}
          <h1 className="text-[20px] font-bold leading-7 text-[#092F35] sm:text-xl">
            {t("confirmation.title")}
          </h1>

          {/* Description */}
          <p className="mx-auto mt-2 max-w-[390px] text-[11px] leading-5 text-gray-500 sm:text-sm">
            {t("confirmation.description")}
          </p>

          {/* Summary */}
          <dl className="mt-6 space-y-2 rounded-xl bg-[#F8FAFC] p-3 text-left sm:space-y-2.5 sm:p-4">
            {summaryRows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-0.5 border-b border-gray-100 pb-2 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                {/* Label */}
                <dt className="shrink-0 text-[10px] text-gray-500 sm:text-sm">
                  {row.label}
                </dt>

                {/* Value */}
                <dd className="break-words text-left text-[11px] font-medium text-[#17363B] sm:max-w-[65%] sm:text-right sm:text-sm">
                  {row.value || "—"}
                </dd>
              </div>
            ))}
          </dl>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:gap-3">

            {/* Dashboard */}
            <Link
              href="/patient-profile"
              className="flex h-10 w-full items-center justify-center rounded-lg bg-[#006D77] px-4 text-[11px] font-semibold text-white transition hover:bg-[#00535B] sm:h-auto sm:flex-1 sm:py-2.5 sm:text-sm"
            >
              {t("confirmation.dashboard")}
            </Link>

            {/* Browse Nurses */}
            <Link
              href="/find-a-nurses"
              className="flex h-10 w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 text-[11px] font-semibold text-gray-700 transition hover:bg-gray-50 sm:h-auto sm:flex-1 sm:py-2.5 sm:text-sm"
            >
              {t("confirmation.browseNurses")}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}