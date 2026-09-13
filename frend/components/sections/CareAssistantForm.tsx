'use client';

import React, { useState } from 'react';

const examples = [
  "My mother is 75 and needs help with medication, walking, and daily activities after her hip surgery.",
  "I have MS and need daily support with personal care and mobility assistance.",
  "My father has Alzheimer's and needs full-time care and companionship.",
  "I am recovering from knee surgery and need temporary nursing assistance for 3 weeks."
];

export default function CareAssistantForm() {
  const [prompt, setPrompt] = useState('');

  const handleExampleClick = (text: string) => {
    setPrompt(text);
  };

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-[#0d7c7b]">
        <div className="p-4">
          <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
            DESCRIBE THE SITUATION
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. My mother is 75 and needs help with medication, walking, and daily activities after her hip replacement surgery..."
            rows={6}
            className="w-full text-slate-700 text-sm placeholder-slate-300 resize-none focus:outline-none bg-transparent"
          />
        </div>

        {/* Action Bar */}
        <div className="bg-slate-50/70 border-t border-slate-100 px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
            ⌘ Ctrl + Enter to analyze
          </span>
          <button className="inline-flex items-center gap-1.5 bg-[#e6f4f4] hover:bg-[#d5eded] text-[#0d7c7b] px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
            <span>Analyze Needs</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m11-16l1.5 6 6 1.5-6 1.5L17 21l-1.5-6-6-1.5 6-1.5L17 3z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Try An Example Section */}
      <div>
        <h3 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-3">
          TRY AN EXAMPLE:
        </h3>
        <div className="space-y-2.5">
          {examples.map((item, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(item)}
              className="w-full text-left bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3.5 transition-all text-xs text-slate-600 hover:text-slate-900 flex items-start gap-2.5 shadow-sm hover:shadow"
            >
              <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>{item}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}