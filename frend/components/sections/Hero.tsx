"use client";//byeshte8el aa client side 
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { stats } from "@/data/content";

const slides = [
  {image:"/images/nurse.png",
    background: "#00535B",
    highlightColor: "#9FF0FB",
    eyebrow: "Trusted by 10,000+ families",
    title: "Trusted Care,",
    highlight: "When You Need It.",
    description:
      "Connect with qualified nurses and caregivers who are ready to provide the care you or your loved ones need at home.",
  },
  {
    image:
      "/images/image.png",
    background: "#1E5F8A",
    highlightColor: "#B9E6FF",
    eyebrow: "Professional Nursing Care",
    title: "Expert Nurses,",
    highlight: "Right at Home.",
    description:
      "Get compassionate and professional nursing care from qualified caregivers in the comfort of your home.",
  },
  {
    image:"/images/nurse-care.png",
    background: "#063B5C",
    highlightColor: "#FF8FA3",
    eyebrow: "Care You Can Trust",
    title: "Your Health,",
    highlight: "Our Priority.",
    description:
      "Personalized home healthcare designed around you and your loved ones, delivered by caring professionals.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);//ra2em slide by default 0 

  const slide = slides[currentSlide];

  // Automatic slider
  //useEffect lama hero components byeshte8el nafez code li jwetu
  //setInterval hiyeh bt3id code bi time x 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Previous slide
  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  // Next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      className="relative text-white transition-colors duration-700"
      style={{ backgroundColor: slide.background }}
    >
      {/* HERO CONTENT */}
      <div className="container-content grid gap-10 px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:pb-24 lg:pt-20">

        {/* LEFT SIDE */}
        <div
          key={`text-${currentSlide}`}
          className="animate-fadeIn"
        >
          <span className="eyebrow">
            {slide.eyebrow}
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            {slide.title}
            <br />

            <span
              className="mt-2 inline-block transition-colors duration-700"
              style={{ color: slide.highlightColor }}
            >
              {slide.highlight}
            </span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/95 sm:text-base">
            {slide.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              href="/find-nurse"
              variant="primary"
              className="w-full sm:w-auto"
            >
              Find a Nurse
            </Button>

            <Button
              href="/I'm-a-nurse"
              variant="outline"
              className="w-full sm:w-auto"
            >
              I'm a Nurse 
            </Button>
          </div>

          {/* STATS */}
          <dl className="mt-10 grid grid-cols-2 gap-6 sm:mt-12 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-bold">
                  {stat.value}
                </dt>

                <dd className="mt-1 text-xs text-teal-100/70">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative">

          <div className="relative overflow-hidden rounded-3xl">

            {/* IMAGE */}
            <Image
              key={slide.image}
              src={slide.image}
              alt="Professional nurse providing home healthcare"
              width={560}
              height={460}
              className="h-[280px] w-full object-cover transition-all duration-700 sm:h-[340px] lg:h-[420px]"
              priority={currentSlide === 0}
            />

            {/* IMAGE OVERLAY */}
            <div className="absolute inset-0 bg-black/5" />

            {/* PREVIOUS */}
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#00535B] shadow-md transition hover:scale-105 hover:bg-white sm:left-4 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={20} />
            </button>

            {/* NEXT */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#00535B] shadow-md transition hover:scale-105 hover:bg-white sm:right-4 sm:h-10 sm:w-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* DOTS  ... bi sura */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
             {/* hiyeh (item, index) hun ma este3melne la2en ma mehtejina faa htayna _ */}
			  {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-7 bg-white"
                      : "w-2.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* NURSE CARD */}
          <div className="absolute left-2 top-3 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-lg sm:left-4 sm:top-5 sm:gap-3 sm:px-4 sm:py-3 lg:-left-8 lg:top-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 sm:h-9 sm:w-9">
              <CheckCircle2 size={18} />
            </span>

            <div className="leading-tight text-navy-900">
              <p className="text-xs font-semibold sm:text-sm">
                Sarah M.
              </p>

              <p className="text-[10px] text-navy-900/60 sm:text-xs">
                Registered Nurse
              </p>
            </div>
          </div>

          {/* VISIT CARD */}
          <div className="absolute -bottom-3 right-2 rounded-2xl bg-white px-3 py-2 shadow-lg sm:-bottom-5 sm:right-4 sm:px-4 sm:py-3 lg:right-6">
            <p className="text-[10px] font-semibold text-navy-900 sm:text-xs">
              Visit Confirmed
            </p>

            <p className="text-[10px] text-navy-900/60 sm:text-xs">
              Today at 2:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH CARD */}
      <div className="container-content relative z-20 px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-20">
        <div className="rounded-2xl bg-white p-5 text-navy-900 shadow-2xl sm:p-6 lg:p-8">

          {/* TITLE */}
          <div className="mb-5">
            <p className="text-lg font-bold text-navy-900 sm:text-xl">
              Find your ideal caregiver
            </p>

            <p className="mt-1 text-sm leading-relaxed text-navy-900/60">
              Choose your care preferences and find the right professional for you.
            </p>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">

            {/* CARE TYPE */}
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-navy-900/70">
                Care Type
              </span>

              <select className="w-full rounded-xl border border-black/10 bg-white px-4 py-3  pr-16 text-sm text-navy-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100">
                <option>In-Home Care</option>
                <option>Post-Surgical Care</option>
                <option>Pediatric Care</option>
                <option>Elderly Care</option>
              </select>
   </label>

            {/* CARE STYLE */}
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-navy-900/70">
                Care Style
              </span>

              <select className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100">
                <option>One-time Visit</option>
                <option>Recurring Care</option>
                <option>24/7 Support</option>
              </select>
            </label>

            {/* LOCATION */}
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-navy-900/70">
                Location
              </span>

              <input
                type="text"
                placeholder="Enter your ZIP code"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition placeholder:text-navy-900/40 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </label>

            {/* BUTTON */}
            <div className="flex items-end">
              <Button
			    href="/find-care"
                variant="solid"
                className="flex w-full items-center justify-center gap-2 px-6 py-3 lg:w-auto"
              >
                <Search size={18} />
                Find Care
              </Button>
            </div>

          </div>

          {/* AI MESSAGE */}
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-teal-50 px-4 py-3">
            <span className="shrink-0 text-sm">
              ✨
            </span>

            <p className="text-sm leading-relaxed text-teal-800 sm:text-sm">
              Not sure what you need? Let our AI matching help you find
              the right caregiver for your needs.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
