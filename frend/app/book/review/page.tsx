
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useBooking } from "../BookingContext";

const durationLabels: Record<string, string> = {
  "1-hour": "1 Hour",
  "2-hours": "2 Hours",
  "4-hours": "4 Hours",
  "8-hours": "8 Hours",
  "12-hours": "12 Hours",
  "24-hours": "24 Hours",
};

export default function ReviewPage() {
  const router = useRouter();
  const { data } = useBooking();

  const [termsAgreed, setTermsAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const summaryRows = [
    ...(data.preferredNurseName
      ? [{ label: "Preferred nurse", value: data.preferredNurseName }]
      : []),
    { label: "Care for", value: data.careForLabel },
    { label: "Care type", value: data.careTypeLabel },
    { label: "Start date", value: data.startDate },
    {
      label: "Duration",
      value:
        durationLabels[data.careDuration] ?? data.careDuration,
    },
    { label: "Location", value: data.careAddress },
  ];

  const handleSubmit = async () => {
    if (!termsAgreed) return;

    setSubmitting(true);

    // TODO: replace with a real POST /api/care-requests call
    console.log("Submitting care request:", data);

    await new Promise((r) => setTimeout(r, 400));

    setSubmitting(false);
    router.push("/book/confirmation");
  };

  return (
    <div className="min-h-screen bg-[#F1F8FB]">
      <Navbar />

      <main className="min-h-[650px] px-4 py-6 sm:px-6 sm:py-8">

        {/* Steps */}
        <div className="mx-auto mb-6 flex w-full max-w-[400px] items-center justify-center">

          {/* Step 1 */}
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#006D77] text-[10px] font-semibold text-white sm:h-8 sm:w-8 sm:text-xs">
              ✓
            </div>

            <div className="h-[2px] w-full bg-[#006D77]" />
          </div>

          {/* Step 2 */}
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#006D77] text-[10px] font-semibold text-white sm:h-8 sm:w-8 sm:text-xs">
              ✓
            </div>

            <div className="h-[2px] w-full bg-[#006D77]" />
          </div>

          {/* Step 3 */}
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#006D77] text-[10px] font-semibold text-white sm:h-8 sm:w-8 sm:text-xs">
              ✓
            </div>

            <div className="h-[2px] w-full bg-[#006D77]" />
          </div>

          {/* Step 4 */}
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#006D77] text-[10px] font-semibold text-white sm:h-8 sm:w-8 sm:text-xs">
              ✓
            </div>

            <div className="h-[2px] w-full bg-[#006D77]" />
          </div>

          {/* Step 5 */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#006D77] text-[10px] font-semibold text-white sm:h-8 sm:w-8 sm:text-xs">
            5
          </div>
        </div>

        {/* Card */}
        <section className="mx-auto w-full max-w-[620px] rounded-xl bg-white px-4 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:px-8 sm:py-7">

          {/* Title */}
          <h1 className="text-[20px] font-bold text-[#092F35] sm:text-[22px]">
            Review &amp; Submit
          </h1>

          <p className="mt-1 max-w-[520px] text-[11px] leading-5 text-gray-600 sm:text-[12px]">
            Please verify the details of your care request before
            submitting.
          </p>

          {/* Summary */}
          <dl className="mt-5 space-y-2 rounded-xl bg-[#F8FAFC] p-3 sm:space-y-2.5 sm:p-4">
            {summaryRows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-0.5 border-b border-gray-100 pb-2 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <dt className="shrink-0 text-[10px] text-gray-500 sm:text-sm">
                  {row.label}
                </dt>

                <dd className="break-words text-left text-[11px] font-medium text-[#17363B] sm:max-w-[65%] sm:text-right sm:text-sm">
                  {row.value || "—"}
                </dd>
              </div>
            ))}
          </dl>

          {/* Notes */}
          {data.notes && (
            <div className="mt-3 rounded-xl bg-[#F8FAFC] p-3 sm:p-4">
              <p className="text-[10px] text-gray-500 sm:text-sm">
                Notes
              </p>

              <p className="mt-1 break-words text-[11px] leading-5 text-[#17363B] sm:text-sm">
                {data.notes}
              </p>
            </div>
          )}

          {/* Terms */}
          <label className="mt-4 flex w-full items-start gap-2 text-[10px] leading-5 text-gray-600 sm:text-xs">
            <input
              type="checkbox"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#006D77] focus:ring-[#006D77]"
            />

            <span>
              By submitting, you agree to our Terms of Service and
              Privacy Policy. Confirmation is typically provided within
              24–48 hours.
            </span>
          </label>

          {/* Divider */}
          <div className="mt-6 border-t border-gray-100" />

          {/* Buttons */}
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">

            {/* Back */}
            <Link
              href="/book/describe-needs"
              className="flex h-10 w-full items-center justify-center gap-1 rounded-md border border-[#D5E0E2] bg-white px-4 text-[10px] font-medium text-[#31565C] transition hover:bg-gray-50 sm:h-auto sm:w-auto sm:py-2"
            >
              ← Back
            </Link>

            {/* Submit */}
            <button
              type="button"
              disabled={!termsAgreed || submitting}
              onClick={handleSubmit}
              className={`flex h-10 w-full items-center justify-center gap-1 rounded-md px-5 text-[10px] font-medium transition sm:h-auto sm:w-auto sm:py-2 ${
                termsAgreed && !submitting
                  ? "bg-[#006D77] text-white hover:bg-[#00535B]"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              }`}
            >
              {submitting
                ? "Submitting..."
                : "Submit Care Request →"}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
