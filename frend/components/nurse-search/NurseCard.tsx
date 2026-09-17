
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface Nurse {
    id: number | string;
    user_id: number | string;

    name?: string;
    fullName?: string;

    first_name?: string;
    last_name?: string;

    role?: string;
    specialization?: string;

    // Categories from nurse_categories table
    categories?: string[];

    price?: number | string;
    location?: string;
    experience?: string | number;

    rating?: string | number;
    reviews?: string | number;

    image?: string;
    license_file?: string;
}

export default function NurseCard({
    nurse,
}: {
    nurse: Nurse;
}) {
    /* =========================
       NAME
    ========================= */

    const nurseName =
        nurse.name ||
        nurse.fullName ||
        `${nurse.first_name || ""} ${nurse.last_name || ""}`.trim() ||
        "Nurse Professional";

    /* =========================
       ROLE
    ========================= */

    const nurseRole =
        nurse.role ||
        nurse.specialization ||
        "General Healthcare";

    /* =========================
       IMAGE
    ========================= */

    const nurseImage =
        nurse.image || "/placeholder-nurse.jpg";

    /* =========================
       PRICE
    ========================= */

    const nurseRate =
        nurse.price !== undefined &&
        nurse.price !== null
            ? `$${nurse.price}`
            : "$25";

    return (
        <article
            className="
                group
                bg-white
                rounded-2xl
                border border-slate-200
                overflow-hidden
                flex flex-col
                h-full
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
            "
        >

            {/* =========================
                IMAGE
            ========================= */}

            <div
                className="
                    relative
                    w-full
                    h-52
                    sm:h-56
                    bg-slate-100
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                "
            >

                <Image
                    src={nurseImage}
                    alt={nurseName}
                    fill
                    sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        33vw
                    "
                    className="
                        object-contain
                        object-center
                        p-1
                        group-hover:scale-[1.02]
                        transition-transform
                        duration-300
                    "
                />

            </div>

            {/* =========================
                CONTENT
            ========================= */}

            <div className="flex flex-col flex-1">

                <div className="p-4 sm:p-5 flex-1">

                    {/* =========================
                        NAME + PRICE
                    ========================= */}

                    <div className="flex justify-between items-start gap-3">

                        {/* NAME */}

                        <div className="min-w-0 flex-1">

                            <h3
                                className="
                                    text-base
                                    sm:text-lg
                                    font-bold
                                    text-slate-900
                                    leading-tight
                                    truncate
                                "
                                title={nurseName}
                            >
                                {nurseName}
                            </h3>

                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                {nurseRole}
                            </p>

                        </div>

                        {/* PRICE */}

                        <div className="shrink-0 text-right">

                            <span
                                className="
                                    text-base
                                    sm:text-lg
                                    font-bold
                                    text-[#00535B]
                                "
                            >
                                {nurseRate}
                            </span>

                            <span
                                className="
                                    text-[11px]
                                    sm:text-xs
                                    text-slate-400
                                "
                            >
                                /hr
                            </span>

                        </div>

                    </div>

                    {/* =========================
                        CATEGORIES
                    ========================= */}

                    {nurse.categories &&
                        nurse.categories.length > 0 && (

                            <div className="flex flex-wrap gap-1.5 mt-3">

                                {nurse.categories.map(
                                    (category, index) => (

                                        <span
                                            key={`${category}-${index}`}
                                            className="
                                                inline-flex
                                                items-center
                                                px-2.5
                                                py-1
                                                rounded-full
                                                bg-[#E6F4F1]
                                                text-[#00535B]
                                                text-[11px]
                                                sm:text-xs
                                                font-medium
                                                leading-none
                                            "
                                        >
                                            {category}
                                        </span>

                                    )
                                )}

                            </div>

                        )}

                    {/* =========================
                        LOCATION
                    ========================= */}

                    <div
                        className="
                            flex
                            items-start
                            gap-2
                            mt-4
                            text-xs
                            sm:text-sm
                            text-slate-500
                        "
                    >

                        {/* Location Icon */}

                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="
                                shrink-0
                                mt-0.5
                                text-[#0d7c7b]
                            "
                        >
                            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />

                            <circle
                                cx="12"
                                cy="10"
                                r="3"
                            />
                        </svg>

                        <span className="line-clamp-2">
                            {nurse.location ||
                                "Location not available"}
                        </span>

                    </div>

                    {/* =========================
                        EXPERIENCE
                    ========================= */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            mt-2
                            text-xs
                            sm:text-sm
                            text-slate-500
                        "
                    >

                        {/* Experience Icon */}

                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="
                                shrink-0
                                text-[#0d7c7b]
                            "
                        >

                            <rect
                                width="20"
                                height="14"
                                x="2"
                                y="7"
                                rx="2"
                                ry="2"
                            />

                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />

                        </svg>

                        <span>
                            {nurse.experience ||
                                "Experience not available"}
                        </span>

                    </div>

                </div>

                {/* =========================
                    BOTTOM
                ========================= */}

                <div
                    className="
                        border-t
                        border-slate-100
                        px-4
                        sm:px-5
                        py-4
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-3
                    "
                >

                    {/* =========================
                        RATING
                    ========================= */}

                    <div
                        className="
                            flex
                            items-center
                            gap-1.5
                        "
                    >

                        {/* Star */}

                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="
                                text-yellow-400
                                shrink-0
                            "
                        >
                            <path
                                d="
                                    M12 2
                                    l3.09 6.26
                                    L22 9.27
                                    l-5 4.87
                                    L18.18 21
                                    L12 17.77
                                    L5.82 21
                                    L7 14.14
                                    L2 9.27
                                    l6.91-1.01
                                    L12 2z
                                "
                            />
                        </svg>

                        <span
                            className="
                                text-sm
                                font-semibold
                                text-slate-700
                            "
                        >
                            {nurse.rating ?? "0.0"}
                        </span>

                        <span
                            className="
                                text-xs
                                text-slate-400
                            "
                        >
                            ({nurse.reviews ?? 0})
                        </span>

                    </div>

                    {/* =========================
                        BUTTONS
                    ========================= */}

                    <div
                        className="
                            flex
                            gap-2
                            w-full
                            sm:w-auto
                        "
                    >

                        {/* PROFILE */}

                        <Link
                            href={`/find-a-nurses/${nurse.user_id}`}
                            className="
                                flex-1
                                sm:flex-none
                                text-center
                                px-3
                                py-2
                                rounded-lg
                                border
                                border-slate-200
                                text-xs
                                sm:text-sm
                                font-medium
                                text-slate-700
                                hover:bg-slate-50
                                transition
                            "
                        >
                            Profile
                        </Link>

                        {/* BOOK */}
 
                         
                        <Link href="/book">
                        <button
                            type="button"
                            className="
                                flex-1
                                sm:flex-none
                                px-3
                                py-2
                                rounded-lg
                                bg-[#00535B]
                                text-white
                                text-xs
                                sm:text-sm
                                font-medium
                                hover:bg-[#00454c]
                                transition
                            "
                        >
                            Book
                        </button>
</Link>
                    </div>

                </div>

            </div>

        </article>
    );
}
