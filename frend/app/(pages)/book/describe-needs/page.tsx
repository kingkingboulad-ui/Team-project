
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useBooking } from "../BookingContext";

export default function DescribeNeedsPage() {
  const router = useRouter();
  const { data, update } = useBooking();

  const [notes, setNotes] = useState(data.notes);
  const [infoAgreed, setInfoAgreed] = useState(data.infoAgreed);

  const canContinue = notes.trim() !== "" && infoAgreed;

  const handleContinue = () => {
    if (!canContinue) return;

    update({
      notes,
      infoAgreed,
    });

    router.push("/book/review");
  };

  return (
    <div className="min-h-screen bg-[#F1F8FB]">
  

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
              4
            </div>

            <div className="h-[2px] w-full bg-[#C7DADD]" />
          </div>

          {/* Step 5 */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C7DADD] text-[10px] font-semibold text-[#456268] sm:h-8 sm:w-8 sm:text-xs">
            5
          </div>
        </div>

        {/* Card */}
        <section className="mx-auto w-full max-w-[620px] rounded-xl bg-white px-4 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:px-8 sm:py-7">

          {/* Title */}
          <h1 className="text-[20px] font-bold text-[#092F35] sm:text-[22px]">
            Describe your needs
          </h1>

          <p className="mt-1 max-w-[520px] text-[11px] leading-5 text-gray-600 sm:text-[12px]">
            Please provide details about the care needed so we can
            match you with the right nurse.
          </p>

          {/* Textarea */}
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="E.g. my mother is 82 years old and has difficulty walking. She needs help with daily medication management, getting around the house safely, and companionship a few times a week..."
            className="mt-5 min-h-[140px] w-full resize-y rounded-lg border border-gray-200 px-3 py-3 text-xs leading-5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#00535B] focus:ring-2 focus:ring-[#00535B]/10 sm:min-h-[150px] sm:text-sm"
          />

          {/* Privacy Checkbox */}
          <label className="mt-4 flex w-full items-start gap-2 text-[10px] leading-5 text-gray-600 sm:text-xs">
            <input
              type="checkbox"
              checked={infoAgreed}
              onChange={(e) => setInfoAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#006D77] focus:ring-[#006D77]"
            />

            <span>
              I understand my information will be shared with
              matched nurses per our Privacy Policy.
            </span>
          </label>

          {/* Divider */}
          <div className="mt-6 border-t border-gray-100" />

          {/* Buttons */}
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">

            {/* Back */}
            <Link
              href="/book/when-where"
              className="flex h-10 w-full items-center justify-center gap-1 rounded-md border border-[#D5E0E2] bg-white px-4 text-[10px] font-medium text-[#31565C] transition hover:bg-gray-50 sm:h-auto sm:w-auto sm:py-2"
            >
              ← Back
            </Link>

            {/* Continue */}
            <button
              type="button"
              disabled={!canContinue}
              onClick={handleContinue}
              className={`flex h-10 w-full items-center justify-center gap-1 rounded-md px-5 text-[10px] font-medium transition sm:h-auto sm:w-auto sm:py-2 ${
                canContinue
                  ? "bg-[#006D77] text-white hover:bg-[#00535B]"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              }`}
            >
              Continue
              <ArrowRight size={12} />
            </button>
          </div>
        </section>
      </main>


    </div>
  );
}
