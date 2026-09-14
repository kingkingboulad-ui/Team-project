'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Star, 
  MoreVertical, 
  CheckCircle, 
  Clock, 
  UserX,
  Phone,
  Mail,
  Award
} from 'lucide-react';
import Link from 'next/link';

const INITIAL_NURSES = [
  {
    id: '1',
    name: 'Sarah Connor',
    email: 'sarah.c@nurseconnect.com',
    phone: '+1 234-567-8901',
    specialty: 'Pediatric Care',
    experience: '6 Years',
    rate: '$45/hr',
    rating: 4.9,
    reviewsCount: 38,
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1594824813566-7885a69785d7?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: '2',
    name: 'Michael Brown',
    email: 'm.brown@nurseconnect.com',
    phone: '+1 234-567-8902',
    specialty: 'Elderly & Geriatric Care',
    experience: '8 Years',
    rate: '$50/hr',
    rating: 4.8,
    reviewsCount: 52,
    status: 'On Duty',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'e.davis@nurseconnect.com',
    phone: '+1 234-567-8903',
    specialty: 'ICU & Post-Surgery Care',
    experience: '4 Years',
    rate: '$55/hr',
    rating: 5.0,
    reviewsCount: 19,
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'd.wilson@nurseconnect.com',
    phone: '+1 234-567-8904',
    specialty: 'Palliative Care',
    experience: '10 Years',
    rate: '$60/hr',
    rating: 4.7,
    reviewsCount: 44,
    status: 'Pending Approval',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150',
  },
];

export default function NursesManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  // تصفية القائمة بناءً على البحث والفلتر
  const filteredNurses = INITIAL_NURSES.filter((nurse) => {
    const matchesSearch = nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          nurse.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || nurse.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      {/* Header with Title and Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nurses Directory</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage, verify, and view all registered healthcare professionals.
          </p>
        </div>
        
        <Link href={'/admin/nurses/add'} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0d6e6e] text-white rounded-xl font-semibold text-sm hover:bg-[#095252] transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add New Nurse</span>
        </Link>
      </div>

      {/* Top Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0d6e6e] flex items-center justify-center font-bold text-xl">
            86
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Registered</p>
            <p className="text-sm font-semibold text-slate-900">All Active Nurses</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
            62
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Available Now</p>
            <p className="text-sm font-semibold text-slate-900">Ready for Assignment</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
            7
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Pending Review</p>
            <p className="text-sm font-semibold text-slate-900">Requires Verification</p>
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search by name, specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0d6e6e] focus:outline-none transition-all"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select 
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full md:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-[#0d6e6e]"
          >
            <option value="All">All Specialties</option>
            <option value="Pediatric Care">Pediatric Care</option>
            <option value="Elderly & Geriatric Care">Elderly & Geriatric Care</option>
            <option value="ICU & Post-Surgery Care">ICU & Post-Surgery Care</option>
            <option value="Palliative Care">Palliative Care</option>
          </select>
        </div>
      </div>

      {/* Nurses Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Nurse Info</th>
                <th className="px-6 py-4">Specialty & Exp.</th>
                <th className="px-6 py-4">Hourly Rate</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredNurses.map((nurse) => (
                <tr key={nurse.id} className="hover:bg-slate-50/60 transition-colors">
                  
                  {/* Nurse Avatar & Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={nurse.avatar} 
                        alt={nurse.name} 
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 leading-tight">{nurse.name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {nurse.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Specialty & Experience */}
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{nurse.specialty}</p>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <Award className="w-3 h-3 text-slate-400" /> {nurse.experience} exp.
                    </p>
                  </td>

                  {/* Hourly Rate */}
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {nurse.rate}
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-slate-900 text-sm">{nurse.rating}</span>
                      <span className="text-xs text-slate-400">({nurse.reviewsCount})</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    {nurse.status === 'Available' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle className="w-3.5 h-3.5" /> Available
                      </span>
                    )}
                    {nurse.status === 'On Duty' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        <Clock className="w-3.5 h-3.5" /> On Duty
                      </span>
                    )}
                    {nurse.status === 'Pending Approval' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <UserX className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1.5 text-xs font-semibold text-[#0d6e6e] bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
                        View Profile
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}