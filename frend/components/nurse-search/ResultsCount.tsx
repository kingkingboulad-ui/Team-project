import React from 'react';

export default function ResultsCount({ count }: { count: number }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-[#0d7c7b]">{count} nurses found</p>
    </div>
  );
}