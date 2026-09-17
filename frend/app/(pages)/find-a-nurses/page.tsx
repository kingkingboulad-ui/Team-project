
"use client";

import React, { useEffect, useMemo, useState } from "react";

import PageHeader from "../../../components/nurse-search/PageHeader";
import SearchAndFilter from "../../../components/nurse-search/SearchAndFilter";
import ResultsCount from "../../../components/nurse-search/ResultsCount";
import NurseCard, {
    Nurse,
} from "../../../components/nurse-search/NurseCard";

const NURSES_PER_PAGE = 6;

export default function NurseSearchPage() {
    /* =========================
       STATES
    ========================= */

    const [nurses, setNurses] = useState<Nurse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("top-rated");
    const [selectedCategory, setSelectedCategory] =
        useState("All");

    // Filters
    const [minRating, setMinRating] = useState(0);
    const [priceRange, setPriceRange] =
        useState("any");
    const [experienceRange, setExperienceRange] =
        useState("any");
    const [locationFilter, setLocationFilter] =
        useState("");

    const [currentPage, setCurrentPage] = useState(1);

    /* =========================
       GET NURSES
    ========================= */

    useEffect(() => {
        const fetchNurses = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    "http://localhost:5000/api/nurses/getall",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        credentials: "include",
                    }
                );

                const data = await response.json();

                console.log(
                    "Nurses API:",
                    data
                );

                if (
                    response.ok &&
                    data.success
                ) {
                    setNurses(
                        data.nurses || []
                    );
                } else {
                    setError(
                        data.message ||
                            "Failed to load nurses"
                    );
                }
            } catch (err) {
                console.error(
                    "Fetch error:",
                    err
                );

                setError(
                    "Error connecting to backend server"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchNurses();
    }, []);

    /* =========================
       SEARCH + FILTERS + SORT
    ========================= */

    const filteredNurses = useMemo(() => {
        let result = [...nurses];

        /* =========================
           SEARCH
        ========================= */

        const searchValue =
            searchTerm
                .trim()
                .toLowerCase();

        if (searchValue) {
            result = result.filter(
                (nurse) => {
                    const name =
                        nurse.name ||
                        nurse.fullName ||
                        `${nurse.first_name || ""} ${
                            nurse.last_name || ""
                        }`;

                    const role =
                        nurse.role ||
                        nurse.specialization ||
                        "";

                    const location =
                        nurse.location || "";

                    const categoriesText =
                        Array.isArray(
                            nurse.categories
                        )
                            ? nurse.categories.join(
                                  " "
                              )
                            : "";

                    return (
                        name
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        role
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        location
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||
                        categoriesText
                            .toLowerCase()
                            .includes(
                                searchValue
                            )
                    );
                }
            );
        }

        /* =========================
           CATEGORY FROM DATABASE
        ========================= */

        if (
            selectedCategory !==
            "All"
        ) {
            result = result.filter(
                (nurse) => {
                    if (
                        !Array.isArray(
                            nurse.categories
                        )
                    ) {
                        return false;
                    }

                    return nurse.categories.some(
                        (category) =>
                            category
                                .toLowerCase()
                                .trim() ===
                            selectedCategory
                                .toLowerCase()
                                .trim()
                    );
                }
            );
        }

        /* =========================
           MINIMUM RATING
        ========================= */

        if (minRating > 0) {
            result = result.filter(
                (nurse) =>
                    Number(
                        nurse.rating || 0
                    ) >= minRating
            );
        }

        /* =========================
           PRICE FILTER
        ========================= */

if (priceRange === "under50") {
    result = result.filter(
        (nurse) => Number(nurse.price || 0) < 50
    );
}

if (priceRange === "50-65") {
    result = result.filter(
        (nurse) => {
            const price = Number(nurse.price || 0);
            return price >= 50 && price <= 65;
        }
    );
}

if (priceRange === "upper65") {
    result = result.filter(
        (nurse) => Number(nurse.price || 0) > 65
    );
}


        /* =========================
           EXPERIENCE FILTER
        ========================= */

        if (
            experienceRange ===
            "1-3"
        ) {
            result = result.filter(
                (nurse) => {
                    const years =
                        parseInt(
                            String(
                                nurse.experience ||
                                    0
                            )
                        ) || 0;

                    return (
                        years >= 1 &&
                        years <= 3
                    );
                }
            );
        }

        if (
            experienceRange ===
            "3-5"
        ) {
            result = result.filter(
                (nurse) => {
                    const years =
                        parseInt(
                            String(
                                nurse.experience ||
                                    0
                            )
                        ) || 0;

                    return (
                        years >= 3 &&
                        years <= 5
                    );
                }
            );
        }

        if (
            experienceRange ===
            "5+"
        ) {
            result = result.filter(
                (nurse) => {
                    const years =
                        parseInt(
                            String(
                                nurse.experience ||
                                    0
                            )
                        ) || 0;

                    return years >= 5;
                }
            );
        }

        /* =========================
           LOCATION FILTER
        ========================= */

        if (
            locationFilter.trim()
        ) {
            const locationValue =
                locationFilter
                    .trim()
                    .toLowerCase();

            result = result.filter(
                (nurse) =>
                    (
                        nurse.location ||
                        ""
                    )
                        .toLowerCase()
                        .includes(
                            locationValue
                        )
            );
        }

        /* =========================
           SORT
        ========================= */

        if (
            sortBy ===
            "top-rated"
        ) {
            result.sort(
                (a, b) =>
                    Number(
                        b.rating || 0
                    ) -
                    Number(
                        a.rating || 0
                    )
            );
        }

        if (
            sortBy ===
            "price-low"
        ) {
            result.sort(
                (a, b) =>
                    Number(
                        a.price || 0
                    ) -
                    Number(
                        b.price || 0
                    )
            );
        }

        if (
            sortBy ===
            "price-high"
        ) {
            result.sort(
                (a, b) =>
                    Number(
                        b.price || 0
                    ) -
                    Number(
                        a.price || 0
                    )
            );
        }

        if (
            sortBy === "name"
        ) {
            result.sort(
                (a, b) => {
                    const nameA =
                        a.name ||
                        a.fullName ||
                        `${a.first_name || ""} ${
                            a.last_name || ""
                        }`;

                    const nameB =
                        b.name ||
                        b.fullName ||
                        `${b.first_name || ""} ${
                            b.last_name || ""
                        }`;

                    return nameA
                        .toLowerCase()
                        .localeCompare(
                            nameB.toLowerCase()
                        );
                }
            );
        }

        if (
            sortBy ===
            "experience"
        ) {
            result.sort(
                (a, b) => {
                    const aYears =
                        parseInt(
                            String(
                                a.experience ||
                                    0
                            )
                        ) || 0;

                    const bYears =
                        parseInt(
                            String(
                                b.experience ||
                                    0
                            )
                        ) || 0;

                    return (
                        bYears -
                        aYears
                    );
                }
            );
        }

        return result;
    }, [
        nurses,
        searchTerm,
        sortBy,
        selectedCategory,
        minRating,
        priceRange,
        experienceRange,
        locationFilter,
    ]);

    /* =========================
       RESET PAGE
    ========================= */

    useEffect(() => {
        setCurrentPage(1);
    }, [
        searchTerm,
        sortBy,
        selectedCategory,
        minRating,
        priceRange,
        experienceRange,
        locationFilter,
    ]);

    /* =========================
       CLEAR FILTERS
    ========================= */

    const clearFilters = () => {
        setMinRating(0);
        setPriceRange("any");
        setExperienceRange("any");
        setLocationFilter("");
        setSelectedCategory("All");
    };

    /* =========================
       PAGINATION
    ========================= */

    const totalPages = Math.ceil(
        filteredNurses.length /
            NURSES_PER_PAGE
    );

    const startIndex =
        (currentPage - 1) *
        NURSES_PER_PAGE;

    const currentNurses =
        filteredNurses.slice(
            startIndex,
            startIndex +
                NURSES_PER_PAGE
        );

    const goToPage = (
        page: number
    ) => {
        if (
            page < 1 ||
            page > totalPages
        ) {
            return;
        }

        setCurrentPage(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /* =========================
       UI
    ========================= */

    return (
        <main className="min-h-screen bg-[#f8fafc]">

            <div
                className="
                    mx-auto
                    max-w-7xl
                    px-4
                    py-8
                    sm:px-6
                    sm:py-10
                    lg:px-8
                "
            >

                {/* HEADER */}

                <PageHeader />

                {/* SEARCH + FILTERS + SORT */}

                <div className="mt-6">
                    <SearchAndFilter
                        searchTerm={
                            searchTerm
                        }
                        setSearchTerm={
                            setSearchTerm
                        }
                        sortBy={sortBy}
                        setSortBy={
                            setSortBy
                        }
                        selectedCategory={
                            selectedCategory
                        }
                        setSelectedCategory={
                            setSelectedCategory
                        }
                        minRating={
                            minRating
                        }
                        setMinRating={
                            setMinRating
                        }
                        priceRange={
                            priceRange
                        }
                        setPriceRange={
                            setPriceRange
                        }
                        experienceRange={
                            experienceRange
                        }
                        setExperienceRange={
                            setExperienceRange
                        }
                        locationFilter={
                            locationFilter
                        }
                        setLocationFilter={
                            setLocationFilter
                        }
                        clearFilters={
                            clearFilters
                        }
                    />
                </div>

                {/* RESULT COUNT */}

                {!loading &&
                    !error && (
                        <div className="mt-8">
                            <ResultsCount
                                count={
                                    filteredNurses.length
                                }
                            />
                        </div>
                    )}

                {/* LOADING */}

                {loading && (
                    <div className="py-20 text-center">
                        <div
                            className="
                                mx-auto
                                mb-4
                                h-10
                                w-10
                                animate-spin
                                rounded-full
                                border-4
                                border-slate-200
                                border-t-[#00535B]
                            "
                        />

                        <p className="text-sm text-slate-500">
                            Loading nurses...
                        </p>
                    </div>
                )}

                {/* ERROR */}

                {!loading &&
                    error && (
                        <div className="py-20 text-center">
                            <div
                                className="
                                    mx-auto
                                    max-w-md
                                    rounded-xl
                                    border
                                    border-red-200
                                    bg-red-50
                                    p-6
                                "
                            >
                                <p className="font-medium text-red-600">
                                    {error}
                                </p>
                            </div>
                        </div>
                    )}

                {/* NO RESULTS */}

                {!loading &&
                    !error &&
                    filteredNurses.length ===
                        0 && (
                        <div className="py-20 text-center">
                            <h2 className="text-xl font-bold text-slate-800">
                                No nurses found
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Try another name,
                                specialty, location,
                                category or filter.
                            </p>
                        </div>
                    )}

                {/* NURSE CARDS */}

                {!loading &&
                    !error &&
                    currentNurses.length >
                        0 && (
                        <>
                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-5
                                    sm:grid-cols-2
                                    sm:gap-6
                                    lg:grid-cols-3
                                "
                            >
                                {currentNurses.map(
                                    (nurse) => (
                                        <NurseCard
                                            key={
                                                nurse.id
                                            }
                                            nurse={
                                                nurse
                                            }
                                        />
                                    )
                                )}
                            </div>

                            {/* PAGINATION */}

                            {totalPages >
                                1 && (
                                <div
                                    className="
                                        mt-10
                                        flex
                                        flex-wrap
                                        items-center
                                        justify-center
                                        gap-2
                                        pb-6
                                    "
                                >
                                    {/* PREVIOUS */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToPage(
                                                currentPage -
                                                    1
                                            )
                                        }
                                        disabled={
                                            currentPage ===
                                            1
                                        }
                                        className="
                                            rounded-lg
                                            border
                                            border-slate-200
                                            bg-white
                                            px-3
                                            py-2
                                            text-sm
                                            text-slate-700
                                            hover:bg-slate-50
                                            disabled:cursor-not-allowed
                                            disabled:opacity-40
                                            sm:px-4
                                        "
                                    >
                                        Previous
                                    </button>

                                    {/* PAGE NUMBERS */}

                                    {Array.from(
                                        {
                                            length:
                                                totalPages,
                                        },
                                        (
                                            _,
                                            index
                                        ) =>
                                            index +
                                            1
                                    ).map(
                                        (
                                            page
                                        ) => (
                                            <button
                                                key={
                                                    page
                                                }
                                                type="button"
                                                onClick={() =>
                                                    goToPage(
                                                        page
                                                    )
                                                }
                                                className={`
                                                    h-9
                                                    w-9
                                                    rounded-lg
                                                    text-sm
                                                    font-medium
                                                    transition
                                                    sm:h-10
                                                    sm:w-10
                                                    ${
                                                        currentPage ===
                                                        page
                                                            ? "bg-[#00535B] text-white"
                                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                                    }
                                                `}
                                            >
                                                {
                                                    page
                                                }
                                            </button>
                                        )
                                    )}

                                    {/* NEXT */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToPage(
                                                currentPage +
                                                    1
                                            )
                                        }
                                        disabled={
                                            currentPage ===
                                            totalPages
                                        }
                                        className="
                                            rounded-lg
                                            border
                                            border-slate-200
                                            bg-white
                                            px-3
                                            py-2
                                            text-sm
                                            text-slate-700
                                            hover:bg-slate-50
                                            disabled:cursor-not-allowed
                                            disabled:opacity-40
                                            sm:px-4
                                        "
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
            </div>
        </main>
    );
}