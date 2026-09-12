import React from 'react';

// بيانات الممرضين المطابقة للصورة تماماً
const nursesData = [
  {
    id: 1,
    name: 'Sarah Haddad',
    role: 'Registered Nurse',
    rate: '$65',
    location: 'San Jose, CA',
    experience: '15 yrs',
    rating: '5',
    reviews: '189',
    tags: ['Elderly Care', 'Cardiac Care', 'Disability Support'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop', // صورة ممرضة تعبيرية بنفس الروح
  },
  {
    id: 2,
    name: 'David Thompson',
    role: 'Registered Nurse',
    rate: '$45',
    location: 'San Francisco, CA',
    experience: '8 yrs',
    rating: '4.9',
    reviews: '127',
    tags: ['Elderly Care', 'Post-Surgery', 'Medication Support'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Lisa Park',
    role: 'Home Health Aide',
    rate: '$65',
    location: 'Palo Alto, CA',
    experience: '7 yrs',
    rating: '4.8',
    reviews: '112',
    tags: ['Post-Surgery Care', 'Medication Support'],
    image: 'https://images.unsplash.com/photo-1594824813566-78a9c0260655?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Maria Santos',
    role: 'Licensed Practical Nurse',
    rate: '$52',
    location: 'Oakland, CA',
    experience: '12 yrs',
    rating: '4.5',
    reviews: '99',
    tags: ['Elderly Care', 'Cardiac Care', 'Wound care'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Aisha Patel',
    role: 'Licensed Practical Nurse',
    rate: '$52',
    location: 'Oakland, CA',
    experience: '8 yrs',
    rating: '4.5',
    reviews: '99',
    tags: ['Elderly Care', 'Mental Health Support'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'James Okonkwo',
    role: 'Certified Nursing Assistant',
    rate: '$52',
    location: 'Berkeley, CA',
    experience: '5 yrs',
    rating: '4.5',
    reviews: '99',
    tags: ['Daily Living', 'Mobility Assistant'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop',
  },
];

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

export default function NurseSearchPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f3d3e] tracking-tight">
            Find a Nurse
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Browse verified nurses and caregivers in your area
          </p>
        </div>

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
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0d7c7b] focus:border-transparent text-slate-700 placeholder-slate-400"
            />
          </div>

          {/* Sort & Filters Buttons */}
          <div className="flex gap-3 w-full md:w-auto">
            {/* Sort Dropdown */}
            <div className="relative flex-1 md:flex-none">
              <select className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-sm py-2.5 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0d7c7b] cursor-pointer">
                <option>Sort: Top Rated</option>
                <option>Sort: Price Low to High</option>
                <option>Sort: Price High to Low</option>
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
          {categories.map((cat, idx) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                idx === 0
                  ? 'bg-[#0d7c7b] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[#0d7c7b]">6 nurses found</p>
        </div>

        {/* Nurse Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nursesData.map((nurse) => (
            <div
              key={nurse.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
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
              <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-slate-50 mt-auto pt-4">
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
          ))}
        </div>
      </div>
    </main>
  );
}