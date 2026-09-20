"use client";

import { useEffect, useState } from "react";
import {
  User,
  Baby,
  Accessibility,
  Heart,
  Users,
  ArrowRight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useBooking } from "./BookingContext";
import { getNurseById } from "@/data/nursesDirectory";

type CareOption = {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
};

const careOptions: CareOption[] = [
  {
    id: "myself",
    label: "Myself",
    icon: User,
    color: "#22C55E",
  },
  {
    id: "parent",
    label: "Parent",
    icon: Users,
    color: "#006D77",
  },
  {
    id: "child",
    label: "Child",
    icon: Baby,
    color: "#FACC15",
  },
  {
    id: "disability",
    label: "Person with disability",
    icon: Accessibility,
    color: "#0EA5E9",
  },
  {
    id: "spouse",
    label: "Spouse / Partner",
    icon: Heart,
    color: "#DC2626",
  },
  {
    id: "other",
    label: "Other",
    icon: Users,
    color: "#A21CAF",
  },
];

export default function BookPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, update, isHydrated } = useBooking();

  const [selected, setSelected] = useState<string | null>(null);

  // تحديث الاختيار بعد انتهاء الـ hydration
  useEffect(() => {
    if (data.careForId) {
      setSelected(data.careForId);
    }
  }, [data.careForId]);

  // إدارة معرف الممرض القادم من الرابط أو المحفوظ مسبقاً
  useEffect(() => {
    if (!isHydrated) return;

    const nurseIdParam = searchParams.get("nurseId");

    if (nurseIdParam) {
      const numericId = Number(nurseIdParam);
      if (!isNaN(numericId)) {
        const nurse = getNurseById(numericId);
        update({
          preferredNurseId: numericId,
          preferredNurseName: nurse ? nurse.name : `Nurse #${numericId}`,
        });
      }
    } else if (!data.preferredNurseId) {
      alert("Please select a nurse to continue your booking.");
      router.push("/find-a-nurses");
    }
  }, [searchParams, isHydrated, data.preferredNurseId]);

  const handleContinue = () => {
    if (!selected) return;

    const option = careOptions.find((opt) => opt.id === selected);

    update({
      careForId: selected,
      careForLabel: option?.label ?? null,
    });

    router.push("/book/type-of-care");
  };

  return (
    <div className="min-h-screen bg-[#F1F8FB]">
      <main className="min-h-[650px] px-4 py-6 sm:px-6 sm:py-8">
        {/* Steps */}
        <div className="mx-auto mb-7 flex w-full max-w-[500px] items-center justify-center">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#006D77] text-xs font-semibold text-white">
              1
            </div>
            <div className="h-[3px] w-full bg-[#C7DADD]" />
          </div>

          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C7DADD] text-xs font-semibold text-[#456268]">
              2
            </div>
            <div className="h-[3px] w-full bg-[#C7DADD]" />
          </div>

          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C7DADD] text-xs font-semibold text-[#456268]">
              3
            </div>
            <div className="h-[3px] w-full bg-[#C7DADD]" />
          </div>

          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C7DADD] text-xs font-semibold text-[#456268]">
              4
            </div>
            <div className="h-[3px] w-full bg-[#C7DADD]" />
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C7DADD] text-xs font-semibold text-[#456268]">
            5
          </div>
        </div>

        {/* Main Card */}
        <section className="mx-auto w-full max-w-[620px] rounded-xl bg-white px-4 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:px-8 sm:py-7">
          <h1 className="text-[20px] font-bold text-[#092F35] sm:text-[22px]">
            Who needs care?
          </h1>

          <p className="mt-1 max-w-[520px] text-[11px] leading-5 text-gray-600 sm:text-[12px]">
            Select the primary person requiring nursing services to help us tailor the experience.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {careOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selected === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelected(option.id)}
                  className={`flex min-h-[82px] w-full flex-col items-center justify-center rounded-lg border px-2 py-3 text-center transition-all sm:h-[84px] ${
                    isSelected
                      ? "border-[#006D77] bg-[#E8F7F8] shadow-sm"
                      : "border-[#62AAB2] bg-white hover:bg-[#F5FBFC]"
                  }`}
                >
                  <Icon
                    size={20}
                    strokeWidth={2.5}
                    style={{ color: option.color }}
                    className="shrink-0"
                  />
                  <span className="mt-1.5 text-[10px] font-semibold leading-4 text-[#17363B] sm:text-[10px]">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-7 flex justify-end sm:mt-9">
            <button
              type="button"
              disabled={!selected}
              onClick={handleContinue}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-lg px-8 text-[13px] font-semibold transition-all sm:h-12 sm:w-[150px] ${
                selected
                  ? "bg-[#006D77] text-white hover:bg-[#00535B]"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              }`}
            >
              Continue
              <ArrowRight size={17} strokeWidth={2.5} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}