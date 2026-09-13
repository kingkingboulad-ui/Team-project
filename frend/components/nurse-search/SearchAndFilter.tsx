'use client';

import React, { useState } from 'react';

const categories = [
  'All',
  'Elderly Care',
  'Post-Surgery',
  'Medication Support',
  'Daily Assistance',
  'Disability Support',
  'Palliative Care',
  'Companionship',
];

interface SearchAndFilterProps {
  onSearchChange?: (term: string) => void;
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sort: string) => void;
}

export default function SearchAndFilter({
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: SearchAndFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    if (onCategoryChange) onCategoryChange(cat);
  };

  return (
    <>
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-6">
        {/* Search Input */}
        <div className="relative w-full md:w-[55%]">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name or specialty..."
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0d7c7b] focus:border-transparent text-slate-700 placeholder-slate-400"
          />
        </div>

        {/* Sort & Filters Buttons */}
        <div className="flex gap-3 w-full md:w-auto">
          {/* Sort Dropdown */}
          <div className="relative flex-1 md:flex-none">
            <select
              onChange={(e) => onSortChange && onSortChange(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-sm py-2.5 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0d7c7b] cursor-pointer"
            >
              <option value="top-rated">Sort: Top Rated</option>
              <option value="price-low">Sort: Price Low to High</option>
              <option value="price-high">Sort: Price High to Low</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Filters Button */}
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm shadow-sm hover:bg-slate-50 transition-colors">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Category Tags Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#0d7c7b] text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
}