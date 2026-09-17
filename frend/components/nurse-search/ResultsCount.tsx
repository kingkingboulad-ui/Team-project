"use client";

import React from "react";

export default function ResultsCount({
    count,
}: {
    count: number;
}) {
    return (
        <div className="mb-5">
            <p className="text-sm font-semibold text-[#0d7c7b]">
                {count} {count === 1 ? "nurse" : "nurses"} found
            </p>
        </div>
    );
}