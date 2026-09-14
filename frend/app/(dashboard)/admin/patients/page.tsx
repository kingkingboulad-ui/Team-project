'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Phone, 
  Mail, 
  HeartPulse, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';

// بيانات تجريبية للمرضى (يمكن ربطها بـ MySQL backend لاحقاً)
const INITIAL_PATIENTS = [
  {
    id: 'P-101',
    name: 'John Smith',
    age: 68,
    gender: 'Male',
    email: 'john.smith@gmail.com',
    phone: '+1 555-019-2831',
    careType: 'Post-Surgery Care',
    assignedNurse: 'Sarah Connor',
    startDate: 'Sep 10, 2026',
    status: 'Active',
    condition: 'Stable',
  },
  {
    id: 'P-102',
    name: 'Maria Garcia',
    age: 74,
    gender: 'Female',
    email: 'maria.g@gmail.com',
    phone: '+1 555-014-9922',
    careType: 'Elderly Daily Care',
    assignedNurse: 'Michael Brown',
    startDate: 'Aug 22, 2026',
    status: 'Active',
    condition: 'Requires Attention',
  },
  {
    id: 'P-103',
    name: 'Robert Wilson',
    age: 45,
    gender: 'Male',
    email: 'r.wilson@yahoo.com',
    phone: '+1 555-018-3341',
    careType: 'Physical Therapy',
    assignedNurse: 'Unassigned',
    startDate: 'Pending',
    status: 'Pending Assignment',
    condition: 'Stable',
  },
  {
    id: 'P-104',
    name: 'Alice Johnson',
    age: 82,
    gender: 'Female',
    email: 'alice.j@outlook.com',
    phone: '+1 555-012-7711',
    careType: 'Palliative Care',
    assignedNurse: 'Emily Davis',
    startDate: 'Jul 15, 2026',
    status: 'Completed',
    condition: 'Discharged',
  },
];

export default function PatientsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // تصفية نتائج البحث والفلتر
  const filteredPatients = INITIAL_PATIENTS.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.careType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.assignedNurse.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title & Top Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patients Directory</h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor patient profiles, assigned nurses, and home care status.
          </p>
        </div>
        
        <Link href={'/admin/patients/add'} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0d6e6e] text-white rounded-xl font-semibold text-sm hover:bg-[#095252] transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add New Patient</span>
        </Link >
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0d6e6e] flex items-center justify-center font-bold text-xl">
            248
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Patients</p>
            <p className="text-sm font-semibold text-slate-900">Registered in System</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
            182
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Care</p>
            <p className="text-sm font-semibold text-slate-900">Currently Receiving Care</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
            14
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Pending Assignment</p>
            <p className="text-sm font-semibold text-slate-900">Needs Nurse Match</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search patient name, care type, or nurse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0d6e6e] focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-[#0d6e6e]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending Assignment">Pending Assignment</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Patient Info</th>
                <th className="px-6 py-4">Care Type Required</th>
                <th className="px-6 py-4">Assigned Nurse</th>
                <th className="px-6 py-4">Health Condition</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/60 transition-colors">
                  
                  {/* Patient Info */}
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{patient.name}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                          {patient.gender}, {patient.age}y
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {patient.email}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {patient.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* Care Type */}
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800 flex items-center gap-1.5">
                      <HeartPulse className="w-4 h-4 text-[#0d6e6e]" />
                      {patient.careType}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Since {patient.startDate}
                    </p>
                  </td>

                  {/* Assigned Nurse */}
                  <td className="px-6 py-4">
                    {patient.assignedNurse !== 'Unassigned' ? (
                      <span className="font-medium text-slate-800 flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {patient.assignedNurse}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                        Assign Nurse Now
                      </span>
                    )}
                  </td>

                  {/* Condition Tag */}
                  <td className="px-6 py-4">
                    {patient.condition === 'Stable' && (
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                        Stable
                      </span>
                    )}
                    {patient.condition === 'Requires Attention' && (
                      <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                        <AlertCircle className="w-3 h-3" /> Attention
                      </span>
                    )}
                    {patient.condition === 'Discharged' && (
                      <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                        Discharged
                      </span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    {patient.status === 'Active' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    )}
                    {patient.status === 'Pending Assignment' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertCircle className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                    {patient.status === 'Completed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        Completed
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1.5 text-xs font-semibold text-[#0d6e6e] bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
                        View Records
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