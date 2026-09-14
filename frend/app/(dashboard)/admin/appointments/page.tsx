'use client';

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  MoreVertical, 
  User, 
  UserCheck,
  MapPin,
  CalendarCheck
} from 'lucide-react';

// بيانات تجريبية للمواعيد
const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-2026-01',
    patientName: 'John Smith',
    patientPhone: '+1 555-019-2831',
    nurseName: 'Sarah Connor',
    service: 'Post-Surgery Dressing & Checkup',
    address: 'Downtown, Ave 4, Building 12',
    date: 'Sep 15, 2026',
    time: '02:00 PM - 04:00 PM',
    status: 'Confirmed',
    fee: '$90',
  },
  {
    id: 'APT-2026-02',
    patientName: 'Maria Garcia',
    patientPhone: '+1 555-014-9922',
    nurseName: 'Michael Brown',
    service: 'Elderly Vital Signs & Medication',
    address: 'Green Valley, Villa 8',
    date: 'Sep 15, 2026',
    time: '04:30 PM - 06:00 PM',
    status: 'Pending',
    fee: '$75',
  },
  {
    id: 'APT-2026-03',
    patientName: 'Robert Wilson',
    patientPhone: '+1 555-018-3341',
    nurseName: 'Emily Davis',
    service: 'Physical Therapy Session',
    address: 'Sunset Blvd, Apt 402',
    date: 'Sep 16, 2026',
    time: '10:00 AM - 11:30 AM',
    status: 'Confirmed',
    fee: '$110',
  },
  {
    id: 'APT-2026-04',
    patientName: 'Alice Johnson',
    patientPhone: '+1 555-012-7711',
    nurseName: 'Sarah Connor',
    service: 'IV Infusion & Blood Sampling',
    address: 'Pine Street, House 19',
    date: 'Sep 14, 2026',
    time: '09:00 AM - 10:00 AM',
    status: 'Completed',
    fee: '$65',
  },
  {
    id: 'APT-2026-05',
    patientName: 'David Lee',
    patientPhone: '+1 555-011-4455',
    nurseName: 'David Wilson',
    service: 'Palliative Care Consultation',
    address: 'Oak Ridge, Apt 105',
    date: 'Sep 17, 2026',
    time: '01:00 PM - 03:00 PM',
    status: 'Cancelled',
    fee: '$120',
  },
];

export default function AppointmentsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // فلترة المواعيد بحسب البحث والحالة
  const filteredAppointments = INITIAL_APPOINTMENTS.filter((apt) => {
    const matchesSearch = 
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.nurseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title & Top Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments Schedule</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and manage all home care bookings and nurse visits.
          </p>
        </div>
        
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0d6e6e] text-white rounded-xl font-semibold text-sm hover:bg-[#095252] transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0d6e6e] flex items-center justify-center font-bold text-xl">
            18
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Today's Visits</p>
            <p className="text-sm font-semibold text-slate-900">Scheduled for today</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
            142
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Confirmed</p>
            <p className="text-sm font-semibold text-slate-900">Upcoming sessions</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
            9
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Pending Requests</p>
            <p className="text-sm font-semibold text-slate-900">Needs Confirmation</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xl">
            3
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Cancelled</p>
            <p className="text-sm font-semibold text-slate-900">This week</p>
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search by patient, nurse, or service..."
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
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">ID & Service</th>
                <th className="px-6 py-4">Patient & Location</th>
                <th className="px-6 py-4">Assigned Nurse</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Fee</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-50/60 transition-colors">
                  
                  {/* ID & Service */}
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block">{apt.id}</span>
                      <p className="font-semibold text-slate-900 mt-0.5">{apt.service}</p>
                    </div>
                  </td>

                  {/* Patient & Location */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {apt.patientName}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {apt.address}
                      </p>
                    </div>
                  </td>

                  {/* Assigned Nurse */}
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#0d6e6e]" />
                      {apt.nurseName}
                    </p>
                  </td>

                  {/* Date & Time */}
                  <td className="px-6 py-4">
                    <div className="text-slate-800">
                      <p className="font-medium flex items-center gap-1 text-xs">
                        <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                        {apt.date}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {apt.time}
                      </p>
                    </div>
                  </td>

                  {/* Fee */}
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {apt.fee}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    {apt.status === 'Confirmed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                      </span>
                    )}
                    {apt.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                    {apt.status === 'Completed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        <CalendarCheck className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                    {apt.status === 'Cancelled' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> Cancelled
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1.5 text-xs font-semibold text-[#0d6e6e] bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
                        Details
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