import React from 'react';

interface PageHeaderProps {
  totalNurses: number;
}

export default function PageHeader({ totalNurses }: PageHeaderProps) {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f3d3e] tracking-tight">
          Find a Nurse
        </h1>
        <p className="text-slate-500 mt-1 text-sm sm:text-base">
          Browse verified nurses and caregivers in your area
        </p>
      </div>
    </>
  );
}