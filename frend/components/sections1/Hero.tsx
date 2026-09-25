"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

const nurseSlides = [
  {
    image: "/images/profile0.png",
    background: "#00535B",
    highlightColor: "#9FF0FB",
    eyebrow: "joinOurNursingCommunity",
    title: "makeADifference",
    highlight: "careForOthers",
    description: "connectWithPatients",
  },
  {
    image: "/images/prf.png",
    background: "#1E5F8A",
    highlightColor: "#B9E6FF",
    eyebrow: "professionalNursingOpportunities",
    title: "yourSkills",
    highlight: "theirCare",
    description: "findMeaningfulOpportunities",
  },
  {
    image: "/images/profile1.png",
    background: "#063B5C",
    highlightColor: "#FF8FA3",
    eyebrow: "growWithNurseConnect",
    title: "careWithPurpose",
    highlight: "growYourCareer",
    description: "buildYourNursingCareer",
  },
];

export default function NurseHero() {
  const { t, dir } = useLanguage();

  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = nurseSlides[currentSlide];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % nurseSlides.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const previousSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + nurseSlides.length) % nurseSlides.length
    );
  };

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % nurseSlides.length
    );
  };

  return (
    <section
      dir={dir}
      className="relative overflow-hidden text-white transition-colors duration-700"
      style={{ backgroundColor: slide.background }}
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-20">

        {/* LEFT */}
        <div
          key={`text-${currentSlide}`}
          className="animate-fadeIn"
        >
          <span className="eyebrow">
            {t(slide.eyebrow)}
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t(slide.title)}
            <br />

            <span
              className="mt-1 inline-block"
              style={{ color: slide.highlightColor }}
            >
              {t(slide.highlight)}
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
            {t(slide.description)}
          </p>

          {/* BUTTONS */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              href="/join-as-a-nurse"
              variant="primary"
              className="w-full sm:w-auto"
            >
              {t("joinAsANurse")}
            </Button>

            <Button
              href="/find-a-nurses"
              variant="outline"
              className="w-full sm:w-auto"
            >
              {t("findOpportunities")}
            </Button>
          </div>

          {/* STATS */}
          <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-6 sm:mt-12 sm:grid-cols-4 sm:gap-6">
            <div>
              <dt className="text-xl font-bold sm:text-2xl">
                10,000+
              </dt>
              <dd className="mt-1 text-xs text-white/60">
                {t("familiesServed")}
              </dd>
            </div>

            <div>
              <dt className="text-xl font-bold sm:text-2xl">
                2,500+
              </dt>
              <dd className="mt-1 text-xs text-white/60">
                {t("verifiedNurses")}
              </dd>
            </div>

            <div>
              <dt className="text-xl font-bold sm:text-2xl">
                4.9/5
              </dt>
              <dd className="mt-1 text-xs text-white/60">
                {t("averageRating")}
              </dd>
            </div>

            <div>
              <dt className="text-xl font-bold sm:text-2xl">
                24/7
              </dt>
              <dd className="mt-1 text-xs text-white/60">
                {t("supportAvailable")}
              </dd>
            </div>
          </dl>
        </div>

        {/* RIGHT / IMAGE */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">

          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">

            <Image
              key={slide.image}
              src={slide.image}
              alt={t("professionalNurse")}
              width={560}
              height={460}
              priority={currentSlide === 0}
              className="h-[260px] w-full object-cover transition-all duration-700 sm:h-[350px] lg:h-[460px]"
            />

            <div className="absolute inset-0 bg-black/5" />

            {/* PREVIOUS */}
            <button
              type="button"
              onClick={previousSlide}
              aria-label={t("previousSlide")}
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#00535B] shadow-md transition hover:scale-105 sm:left-4 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={20} />
            </button>

            {/* NEXT */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label={t("nextSlide")}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#00535B] shadow-md transition hover:scale-105 sm:right-4 sm:h-10 sm:w-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* DOTS */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-4">
              {nurseSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`${t("goToSlide")} ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-7 bg-white"
                      : "w-2.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* VERIFIED NURSE CARD */}
          <div className="absolute left-2 top-2 flex max-w-[calc(100%-16px)] items-center gap-2 rounded-xl bg-white px-2.5 py-2 text-slate-900 shadow-lg sm:left-4 sm:top-5 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 lg:-left-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 sm:h-9 sm:w-9">
              <CheckCircle2 size={18} />
            </span>

            <div className="min-w-0 leading-tight">
              <p className="truncate text-xs font-semibold sm:text-sm">
                {t("verifiedNurse")}
              </p>

              <p className="truncate text-[9px] text-slate-900/60 sm:text-xs">
                {t("professionalCaregiver")}
              </p>
            </div>
          </div>

          {/* OPPORTUNITY CARD */}
          <div className="absolute bottom-2 right-2 rounded-xl bg-white px-2.5 py-2 text-slate-900 shadow-lg sm:bottom-4 sm:right-4 sm:rounded-2xl sm:px-4 sm:py-3">
            <p className="text-[9px] font-semibold sm:text-xs">
              {t("newOpportunity")}
            </p>

            <p className="text-[9px] text-slate-900/60 sm:text-xs">
              {t("findYourNextPatient")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
