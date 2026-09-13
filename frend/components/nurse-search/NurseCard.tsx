import React from 'react';

export interface Nurse {
  id: number;
  name: string;
  role: string;
  rate: string;
  location: string;
  experience: string;
  rating: string;
  reviews: string;
  tags: string[];
  image: string;
}

export default function NurseCard({ nurse }: { nurse: Nurse }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        {/* Image Section */}
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          <img
            src={nurse.image}
            alt={nurse.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Name and Price */}
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-slate-900 text-lg leading-snug">
              {nurse.name}
            </h3>
            <div className="text-right">
              <span className="font-bold text-slate-900 text-lg">{nurse.rate}</span>
              <span className="text-xs text-slate-500 font-normal">/hr</span>
            </div>
          </div>

          {/* Role */}
          <p className="text-xs text-slate-500 mb-3">{nurse.role}</p>

          {/* Location & Experience */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>
              {nurse.location} • {nurse.experience}
            </span>
          </div>

          {/* Specialty Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {nurse.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#e6f4f4] text-[#0d7c7b] text-[11px] font-medium px-2.5 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Rating and Action Buttons */}
      <div className="px-5 pb-5 flex items-center justify-between border-t border-slate-50 mt-auto pt-4">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-bold text-slate-800">{nurse.rating}</span>
          <span className="text-xs text-slate-400">({nurse.reviews})</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-md transition-colors">
            Profile
          </button>
          <button className="px-3.5 py-1.5 bg-[#0d7c7b] hover:bg-[#095f5e] text-white text-xs font-medium rounded-md transition-colors">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}