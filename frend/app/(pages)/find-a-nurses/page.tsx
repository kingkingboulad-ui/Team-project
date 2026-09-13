import React from 'react';
import PageHeader from '../../../components/nurse-search/PageHeader';
import SearchAndFilter from '../../../components/nurse-search/SearchAndFilter';
import ResultsCount from '../../../components/nurse-search/ResultsCount';
import NurseCard from '../../../components/nurse-search/NurseCard';
import { nurses2 } from '../../../data/nurses2';

export default function NurseSearchPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader totalNurses={nurses2.length} />
        
        <SearchAndFilter />
        
        <ResultsCount count={nurses2.length} />

        {/* Nurse Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nurses2.map((nurse) => (
            <NurseCard key={nurse.id} nurse={nurse} />
          ))}
        </div>
      </div>
    </main>
  );
}