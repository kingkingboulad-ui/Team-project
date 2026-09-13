export default function ResultsPlaceholder() {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-8 min-h-[420px] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[#eef2ff] text-[#4f46e5] rounded-2xl flex items-center justify-center mb-4 shadow-sm">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
  
        <h2 className="text-sm font-bold text-slate-800 mb-1.5">
          Your AI Results Will Appear Here
        </h2>
  
        <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
          Describe your care situation on the left and click &quot;Analyze Needs&quot; to receive personalized recommendations.
        </p>
      </div>
    );
  }