'use client';

import React, { useEffect, useState } from 'react';
import PageHeader from '../../../components/nurse-search/PageHeader';
import SearchAndFilter from '../../../components/nurse-search/SearchAndFilter';
import ResultsCount from '../../../components/nurse-search/ResultsCount';
import NurseCard, { Nurse } from '../../../components/nurse-search/NurseCard';

export default function NurseSearchPage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/nurses/getall', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // هيدى السطر هو يلي بيبعت الـ Cookies القادمة من الـ Backend
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok && data.success) {
          const formattedNurses = data.nurses.map((nurse: any) => ({
            ...nurse,
            rate: nurse.price ? `$${nurse.price}` : '$25',
          }));
          setNurses(formattedNurses);
        } else {
          setError(data.message || 'Not authenticated');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error connecting to backend server');
      } finally {
        setLoading(false);
      }
    };

    fetchNurses();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader totalNurses={nurses.length} />
        
        <SearchAndFilter />
        
        <ResultsCount count={nurses.length} />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0d7c7b]"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 text-red-500 font-medium">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && nurses.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No approved nurses found.
          </div>
        )}

        {/* Nurse Cards Grid */}
        {!loading && !error && nurses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nurses.map((nurse) => (
              <NurseCard key={nurse.id} nurse={nurse} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}