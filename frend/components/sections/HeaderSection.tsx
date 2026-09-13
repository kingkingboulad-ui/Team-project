export default function HeaderSection() {
    return (
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0d7c7b] text-white mb-3 shadow-sm">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m11-16l1.5 6 6 1.5-6 1.5L17 21l-1.5-6-6-1.5 6-1.5L17 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">
          AI Care Assistant
        </h1>
        <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
          Describe your situation in plain language and I will recommend the right type of care and nurse profile for you.
        </p>
      </div>
    );
  }