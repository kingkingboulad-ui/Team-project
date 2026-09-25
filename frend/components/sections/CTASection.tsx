"use client";

import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#006D77] py-20 text-center text-white">
    
	  <div className="container-content">
        <h2 className="text-3xl font-bold sm:text-4xl">
          {t("readyToFindTrustedCare")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-teal-100/90">
          {t("readyToFindDescription")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/find-a-nurses" variant="primary">
            {t("getStartedToday")}
          </Button>
          <Button href="/for-nurses" variant="outline">
            {t("joinAsNurse")}
          </Button>
        </div>
      </div>
    </section>
  );
}