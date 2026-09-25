"use client";

import React, { useState } from "react";
import {
    Search,
    SlidersHorizontal,
    ChevronDown,
    X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SearchAndFilterProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;

    sortBy: string;
    setSortBy: (value: string) => void;

    selectedCategory: string;
    setSelectedCategory: (value: string) => void;

    minRating: number;
    setMinRating: (value: number) => void;

    priceRange: string;
    setPriceRange: (value: string) => void;

    experienceRange: string;
    setExperienceRange: (value: string) => void;

    locationFilter: string;
    setLocationFilter: (value: string) => void;

    clearFilters: () => void;
}

const categories = [
    "All",
    "Elderly Care",
    "Post-Surgery",
    "Medication Support",
    "Daily Assistance",
    "Disability Support",
    "Palliative Care",
    "Companionship",
];

export default function SearchAndFilter({
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    selectedCategory,
    setSelectedCategory,

    minRating,
    setMinRating,

    priceRange,
    setPriceRange,

    experienceRange,
    setExperienceRange,

    locationFilter,
    setLocationFilter,

    clearFilters,
}: SearchAndFilterProps) {
    const [showFilters, setShowFilters] = useState(false);

    const { t } = useLanguage();

    const categoryKeys: Record<string, string> = {
        "All": "all",
        "Elderly Care": "elderlyCare",
        "Post-Surgery": "postSurgery",
        "Medication Support": "medicationSupport",
        "Daily Assistance": "dailyAssistance",
        "Disability Support": "disabilitySupport",
        "Palliative Care": "palliativeCare",
        "Companionship": "companionship",
    };

    return (
        <div className="w-full">

            {/* SEARCH + FILTER + SORT */}

            <div className="flex flex-col gap-3 lg:flex-row">

                {/* SEARCH */}

                <div className="relative flex-1">
                    <Search
                        size={21}
                        strokeWidth={2}
                        className="
                            absolute
                            left-5
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                    />

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        placeholder={t(
                            "searchByNameSpecialtyLocation"
                        )}
                        className="
                            h-14
                            w-full
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            pl-14
                            pr-5
                            text-base
                            text-slate-800
                            outline-none
                            transition
                            placeholder:text-slate-400
                            focus:border-[#0d7c7b]
                            focus:ring-2
                            focus:ring-[#0d7c7b]/10
                        "
                    />
                </div>

                {/* FILTERS BUTTON */}

                <button
                    type="button"
                    onClick={() =>
                        setShowFilters((prev) => !prev)
                    }
                    className={`
                        flex
                        h-14
                        items-center
                        justify-center
                        gap-2.5
                        rounded-2xl
                        border
                        px-6
                        font-medium
                        transition
                        ${
                            showFilters
                                ? "border-[#0d7c7b] bg-[#0d7c7b] text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:border-[#0d7c7b] hover:bg-[#0d7c7b]/5 hover:text-[#0d7c7b]"
                        }
                    `}
                >
                    <SlidersHorizontal
                        size={19}
                        strokeWidth={2}
                    />

                    <span>{t("filters")}</span>
                </button>

                {/* SORT */}

                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value)
                        }
                        className="
                            h-14
                            w-full
                            appearance-none
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            px-5
                            pr-11
                            text-base
                            text-slate-700
                            outline-none
                            transition
                            focus:border-[#0d7c7b]
                            focus:ring-2
                            focus:ring-[#0d7c7b]/10
                            lg:w-64
                        "
                    >
                        <option value="top-rated">
                            {t("sortTopRated")}
                        </option>

                        <option value="price-low">
                            {t("priceLowToHigh")}
                        </option>

                        <option value="price-high">
                            {t("priceHighToLow")}
                        </option>

                        <option value="name">
                            {t("nameAZ")}
                        </option>

                        <option value="experience">
                            {t("mostExperienced")}
                        </option>
                    </select>

                    <ChevronDown
                        size={18}
                        className="
                            pointer-events-none
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                    />
                </div>
            </div>

            {/* FILTER PANEL */}

            {showFilters && (
                <div
                    className="
                        mt-4
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-5
                        shadow-sm
                        sm:p-6
                    "
                >

                    {/* PANEL HEADER */}

                    <div className="flex items-start justify-between gap-4">

                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                {t("filterNurses")}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                {t("refineSearch")}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setShowFilters(false)
                            }
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                text-slate-400
                                transition
                                hover:bg-slate-100
                                hover:text-slate-700
                            "
                        >
                            <X size={19} />
                        </button>
                    </div>

                    {/* FILTER GRID */}

                    <div
                        className="
                            mt-6
                            grid
                            grid-cols-1
                            gap-5
                            sm:grid-cols-2
                            lg:grid-cols-4
                        "
                    >

                        {/* RATING */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                {t("minimumRating")}
                            </label>

                            <select
                                value={minRating}
                                onChange={(e) =>
                                    setMinRating(
                                        Number(e.target.value)
                                    )
                                }
                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-4
                                    text-sm
                                    text-slate-700
                                    outline-none
                                    focus:border-[#0d7c7b]
                                    focus:ring-2
                                    focus:ring-[#0d7c7b]/10
                                "
                            >
                                <option value={0}>
                                    {t("anyRating")}
                                </option>

                                <option value={4}>
                                    ⭐ 4.0+
                                </option>

                                <option value={4.5}>
                                    ⭐ 4.5+
                                </option>

                                <option value={4.8}>
                                    ⭐ 4.8+
                                </option>
                            </select>
                        </div>

                        {/* PRICE */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                {t("priceRange")}
                            </label>

                            <select
                                value={priceRange}
                                onChange={(e) =>
                                    setPriceRange(
                                        e.target.value
                                    )
                                }
                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-4
                                    text-sm
                                    text-slate-700
                                    outline-none
                                    focus:border-[#0d7c7b]
                                    focus:ring-2
                                    focus:ring-[#0d7c7b]/10
                                "
                            >
                                <option value="any">
                                    {t("anyPrice")}
                                </option>

                                <option value="under50">
                                    {t("under50")}
                                </option>

                                <option value="50-65">
                                    {t("price50To65")}
                                </option>

                                <option value="upper65">
                                    {t("price65Plus")}
                                </option>
                            </select>
                        </div>

                        {/* EXPERIENCE */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                {t("experience")}
                            </label>

                            <select
                                value={experienceRange}
                                onChange={(e) =>
                                    setExperienceRange(
                                        e.target.value
                                    )
                                }
                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-4
                                    text-sm
                                    text-slate-700
                                    outline-none
                                    focus:border-[#0d7c7b]
                                    focus:ring-2
                                    focus:ring-[#0d7c7b]/10
                                "
                            >
                                <option value="any">
                                    {t("anyExperience")}
                                </option>

                                <option value="1-3">
                                    {t("experience1To3")}
                                </option>

                                <option value="3-5">
                                    {t("experience3To5")}
                                </option>

                                <option value="5+">
                                    {t("experience5Plus")}
                                </option>
                            </select>
                        </div>

                        {/* LOCATION */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                {t("location")}
                            </label>

                            <input
                                type="text"
                                value={locationFilter}
                                onChange={(e) =>
                                    setLocationFilter(
                                        e.target.value
                                    )
                                }
                                placeholder={t(
                                    "locationExample"
                                )}
                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-4
                                    text-sm
                                    text-slate-700
                                    outline-none
                                    placeholder:text-slate-400
                                    focus:border-[#0d7c7b]
                                    focus:ring-2
                                    focus:ring-[#0d7c7b]/10
                                "
                            />
                        </div>
                    </div>

                    {/* CLEAR BUTTON */}

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-slate-600
                                transition
                                hover:border-red-200
                                hover:bg-red-50
                                hover:text-red-600
                            "
                        >
                            {t("clearFilters")}
                        </button>
                    </div>
                </div>
            )}

            {/* CATEGORIES */}

            <div className="mt-5 w-full overflow-x-auto pb-2">
                <div className="flex min-w-max gap-2">

                    {categories.map((category) => {
                        const active =
                            selectedCategory === category;

                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() =>
                                    setSelectedCategory(
                                        category
                                    )
                                }
                                className={`
                                    whitespace-nowrap
                                    rounded-full
                                    border
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-medium
                                    transition
                                    ${
                                        active
                                            ? "border-[#0d7c7b] bg-[#0d7c7b] text-white"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-[#0d7c7b] hover:bg-[#0d7c7b]/5 hover:text-[#0d7c7b]"
                                    }
                                `}
                            >
                                {t(categoryKeys[category])}
                            </button>
                        );
                    })}

                </div>
            </div>
        </div>
    );
}
