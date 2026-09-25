"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ResultsCountProps {
  count: number;
}

export default function ResultsCount({
  count,
}: ResultsCountProps) {
  const { t } = useLanguage();

  return (
    <p className="text-sm font-medium text-slate-600">
      <span className="font-bold text-slate-900">
        {count}
      </span>{" "}
      {t("nursesFound")}
    </p>
  );
}
