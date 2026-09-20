"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useBooking } from "../BookingContext";

type CareOption = {
  id: string;
  label: string;
  emoji: string;
};

const careOptions: CareOption[] = [
  { id: "daily", label: "Daily Assistance", emoji: "🏠" },
  { id: "elderly", label: "Elderly Care", emoji: "🧓" },
  { id: "medication", label: "Medication Support", emoji: "💊" },
  { id: "mobility", label: "Mobility Assistance", emoji: "♿" },
  { id: "post-surgery", label: "Post-Surgery Care", emoji: "🧑‍⚕️" },
  { id: "disability", label: "Disability Support", emoji: "🦽" },
  { id: "companionship", label: "Companionship", emoji: "🤝" },
  { id: "other", label: "Other", emoji: "+" },
];

export default function TypeOfCarePage() {
  const router = useRouter();
  const { data, update } = useBooking();

  const [selected, setSelected] = useState<string | null>(
    data.careTypeId
  );

  const handleContinue = () => {
    if (!selected) return;

    const option = careOptions.find(
      (option) => option.id === selected
    );

    update({
      careTypeId: selected,
      careTypeLabel: option?.label ?? null,
    });

    router.push("/book/when-where");
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
              2
            </div>

            <div className="h-[2px] w-full bg-[#C7DADD]" />
          </div>

          {/* Step 3 */}
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C7DADD] text-[10px] font-semibold text-[#456268] sm:h-8 sm:w-8 sm:text-xs">
              3
            </div>

            <div className="h-[2px] w-full bg-[#C7DADD]" />
          </div>

          {/* Step 4 */}
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C7DADD] text-[10px] font-semibold text-[#456268] sm:h-8 sm:w-8 sm:text-xs">
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
          <h1 className="text-[20px] font-bold text-[#092F35] sm:text-[22px]">
            Type of care
          </h1>

          <p className="mt-1 max-w-[520px] text-[11px] leading-5 text-gray-600 sm:text-[12px]">
            Please select the primary type of care required. You can
            discuss specific details later.
          </p>

          {/* Care Options */}
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
            {careOptions.map((option) => {
              const isSelected = selected === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelected(option.id)}
                  className={`flex min-h-[52px] w-full items-center gap-2 rounded-lg border px-2.5 text-left transition-all sm:h-[56px] sm:gap-3 sm:px-3 ${
                    isSelected
                      ? "border-[#006D77] bg-[#EAF8F9] shadow-sm"
                      : "border-[#E5E7EB] bg-white hover:border-[#7BAEB3] hover:bg-[#F8FCFC]"
                  }`}
                >
                  {option.id === "other" ? (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center text-[#8B5CF6]">
                      <Plus size={17} />
                    </div>
                  ) : (
                    <span className="shrink-0 text-[20px] sm:text-[23px]">
                      {option.emoji}
                    </span>
                  )}

                  <span className="text-[9px] font-medium leading-4 text-[#17363B] sm:text-[10px]">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="mt-6 border-t border-gray-100" />

          {/* Buttons */}
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => router.push("/book")}
              className="flex h-10 w-full items-center justify-center gap-1 rounded-md border border-[#D5E0E2] bg-white px-4 text-[10px] font-medium text-[#31565C] transition hover:bg-gray-50 sm:h-auto sm:w-auto sm:py-2"
            >
              <ArrowLeft size={12} />
              Back
            </button>

            <button
              type="button"
              disabled={!selected}
              onClick={handleContinue}
              className={`flex h-10 w-full items-center justify-center gap-1 rounded-md px-5 text-[10px] font-medium transition sm:h-auto sm:w-auto sm:py-2 ${
                selected
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
