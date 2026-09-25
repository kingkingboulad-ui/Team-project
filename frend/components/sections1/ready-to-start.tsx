"use client";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function ReadyToStart() {
  const { t, dir } = useLanguage();

  return (
    <section
      dir={dir}
      className="bg-[#00535B] py-16 text-center text-white md:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
          {t("readyToStart")}
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-xs text-teal-100/90 sm:text-sm">
          {t("readyToStartDescription")}
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            href="/nurse-register"
            variant="primary"
            className="bg-white px-6 py-2.5 text-xs font-semibold text-[#00535B] shadow-md hover:bg-teal-50 sm:text-sm"
          >
            {t("joinAsANurseToday")}
          </Button>
        </div>
      </div>
    </section>
  );
}