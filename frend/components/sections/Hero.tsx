
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { stats } from "@/data/content";
import { useLanguage } from "@/context/LanguageContext";

const slides = [
  {
    image: "/images/nurse.png",
    background: "#00535B",
    highlightColor: "#9FF0FB",
    eyebrow: "Trusted by 10,000+ families",
    title: "Trusted Care,",
    highlight: "When You Need It.",
    description:
      "Connect with qualified nurses and caregivers who are ready to provide the care you or your loved ones need at home.",
  },
  {
    image: "/images/image.png",
    background: "#1E5F8A",
    highlightColor: "#B9E6FF",
    eyebrow: "Professional Nursing Care",
    title: "Expert Nurses,",
    highlight: "Right at Home.",
    description:
      "Get compassionate and professional nursing care from qualified caregivers in the comfort of your home.",
  },
  {
    image: "/images/nurse-care.png",
    background: "#063B5C",
    highlightColor: "#FF8FA3",
    eyebrow: "Care You Can Trust",
    title: "Your Health,",
    highlight: "Our Priority.",
    description:
      "Personalized home healthcare designed around you and your loved ones, delivered by caring professionals.",
  },
];

// التصنيفات الفعلية المأخوذة مباشرة من جدول nurse_categories
const REAL_CATEGORIES = [
  "Elderly Care",
  "Post-Surgery",
  "Medication Support",
  "Daily Assistance",
  "Companionship",
  "Disability Support",
  "Palliative Care",
];

export default function Hero() {
  const router = useRouter();
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // حالات حقول البحث - الافتراضي All حتى يظهر جميع الممرضين
  const [careType, setCareType] = useState("All");
  const [careStyle, setCareStyle] = useState("One-time Visit");
  const [location, setLocation] = useState("");

  const slide = slides[currentSlide];

  // التبديل التلقائي للشرائح
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // معالجة البحث وتمرير المتغيرات لصفحة البحث
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (careType && careType !== "All") {
      params.set("careType", careType);
    }

    if (careStyle) {
      params.set("careStyle", careStyle);
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    router.push(`/find-care?${params.toString()}`);
  };

  const slideEyebrowKeys = [
    "trustedByFamilies",
    "professionalNursingCare",
    "careYouCanTrustEyebrow",
  ];

  const slideTitleKeys = [
    "trustedCareTitle",
    "expertNursesTitle",
    "yourHealthTitle",
  ];

  const slideHighlightKeys = [
    "trustedCareHighlight",
    "rightAtHome",
    "ourPriority",
  ];

  const slideDescriptionKeys = [
    "trustedCareDescription",
    "professionalCareDescription",
    "personalizedHealthcareDescription",
  ];

  // ترجمة تصنيفات الرعاية
  const categoryKeys: Record<string, string> = {
    "Elderly Care": "elderlyCare",
    "Post-Surgery": "postSurgery",
    "Medication Support": "medicationSupport",
    "Daily Assistance": "dailyAssistance",
    Companionship: "companionship",
    "Disability Support": "disabilitySupport",
    "Palliative Care": "palliativeCare",
  };

  return (
    <section
      className="relative text-white transition-colors duration-700"
      style={{ backgroundColor: slide.background }}
    >
      {/* HERO CONTENT */}
      <div className="container-content grid gap-10 px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:pb-24 lg:pt-20">
        
        {/* LEFT SIDE */}
        <div key={`text-${currentSlide}`} className="animate-fadeIn">
          <span className="eyebrow">
            {t(slideEyebrowKeys[currentSlide])}
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            {t(slideTitleKeys[currentSlide])}
            <br />
            <span
              className="mt-2 inline-block transition-colors duration-700"
              style={{ color: slide.highlightColor }}
            >
              {t(slideHighlightKeys[currentSlide])}
            </span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/95 sm:text-base">
            {t(slideDescriptionKeys[currentSlide])}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              href="/find-care"
              variant="primary"
              className="w-full sm:w-auto"
            >
              {t("findNurse")}
            </Button>

            <Button
              href="/join-as-a-nurse"
              variant="outline"
              className="w-full sm:w-auto"
            >
              {t("imANurse")}
            </Button>
          </div>

          {/* STATS */}
          <dl className="mt-10 grid grid-cols-2 gap-6 sm:mt-12 sm:grid-cols-4">
        {stats.map((stat) => (
  <div key={stat.key}>
    <dt className="text-2xl font-bold">
      {stat.value}
    </dt>

    <dd className="mt-1 text-xs text-teal-100/70">
      {t(stat.key)}
    </dd>
  </div>
))}
          </dl>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              key={slide.image}
              src={slide.image}
              alt={t("professionalNurseAlt")}
              width={560}
              height={460}
              className="h-[280px] w-full object-cover transition-all duration-700 sm:h-[340px] lg:h-[420px]"
              priority={currentSlide === 0}
            />

            <div className="absolute inset-0 bg-black/5" />

            {/* PREVIOUS */}
            <button
              type="button"
              onClick={previousSlide}
              aria-label={t("previousSlide")}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#00535B] shadow-md transition hover:scale-105 hover:bg-white sm:left-4 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={20} />
            </button>

            {/* NEXT */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label={t("nextSlide")}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#00535B] shadow-md transition hover:scale-105 hover:bg-white sm:right-4 sm:h-10 sm:w-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* DOTS */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={t("goToSlide").replace(
                    "{number}",
                    String(index + 1)
                  )}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-7 bg-white"
                      : "w-2.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* NURSE BADGE CARD */}
          <div className="absolute left-2 top-3 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-lg sm:left-4 sm:top-5 sm:gap-3 sm:px-4 sm:py-3 lg:-left-8 lg:top-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 sm:h-9 sm:w-9">
              <CheckCircle2 size={18} />
            </span>

            <div className="leading-tight text-slate-900">
              <p className="text-xs font-semibold sm:text-sm">Sarah M.</p>

              <p className="text-[10px] text-slate-500 sm:text-xs">
                {t("registeredNurse")}
              </p>
            </div>
          </div>

          {/* VISIT CONFIRMED CARD */}
          <div className="absolute -bottom-3 right-2 rounded-2xl bg-white px-3 py-2 shadow-lg sm:-bottom-5 sm:right-4 sm:px-4 sm:py-3 lg:right-6">
            <p className="text-[10px] font-semibold text-slate-900 sm:text-xs">
              {t("visitConfirmed")}
            </p>

            <p className="text-[10px] text-slate-500 sm:text-xs">
              {t("todayAtTwo")}
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH CARD */}
      <div className="container-content relative z-20 px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-20">
        <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-2xl sm:p-6 lg:p-8">
          
          <div className="mb-5">
            <p className="text-lg font-bold text-slate-900 sm:text-xl">
              {t("findYourIdealCaregiver")}
            </p>

            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              {t("chooseCarePreferences")}
            </p>
          </div>

          {/* SEARCH FORM */}
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
          >
            {/* CARE TYPE SELECT */}
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                {t("careType")}
              </span>

              <select
                value={careType}
                onChange={(e) => setCareType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 cursor-pointer"
              >
                <option value="All">{t("allCareTypes")}</option>

                {REAL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {t(categoryKeys[cat])}
                  </option>
                ))}
              </select>
            </label>

            {/* CARE SCHEDULE */}
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                {t("careSchedule")}
              </span>

              <select
                value={careStyle}
                onChange={(e) => setCareStyle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 cursor-pointer"
              >
                <option value="One-time Visit">
                  {t("oneTimeVisit")}
                </option>

                <option value="Recurring Care">
                  {t("recurringCare")}
                </option>

                <option value="24/7 Support">
                  {t("fullSupport247")}
                </option>
              </select>
            </label>

            {/* LOCATION */}
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                {t("location")}
              </span>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t("locationPlaceholder")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </label>

            {/* SUBMIT BUTTON */}
            <div className="flex items-end">
              <button
                type="submit"
                className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#00535B] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#003d42] lg:w-auto cursor-pointer"
              >
                <Search size={18} />
                <span>{t("findCare")}</span>
              </button>
            </div>
          </form>

          {/* AI CARE ASSISTANT LINK */}
          <Link
            href="/ai-care-assistant"
            className="mt-5 flex items-start gap-3 rounded-xl bg-teal-50/80 p-3.5 transition-colors hover:bg-teal-100/70"
          >
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#00535B]" />

            <p className="text-xs leading-relaxed text-teal-900 sm:text-sm">
              <strong className="font-semibold">
                {t("notSureWhatCareYouNeed")}
              </strong>{" "}
              {t("letOurAI")}{" "}
              <span className="underline decoration-[#00535B] underline-offset-2">
                {t("aiCareAssistant")}
              </span>{" "}
              {t("analyzeSymptoms")}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
