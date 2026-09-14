import React from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 mt-1">
          Welcome back! Here is what is happening with NurseConnect today.
        </p>
      </div>

      {/* STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Patients */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Patients</span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">248</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +12%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">vs. last month</p>
        </div>

        {/* Card 2: Active Nurses */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Nurses</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">86</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +5
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">94% currently assigned</p>
        </div>

        {/* Card 3: Today's Appointments */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Appointments Today</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">18</span>
            <span className="text-xs font-medium text-slate-500">Scheduled</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">6 completed so far</p>
        </div>

        {/* Card 4: Pending Requests */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Requests</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">7</span>
            <span className="text-xs font-semibold text-amber-600 flex items-center gap-0.5">
              Requires Action
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">New nurse approvals</p>
        </div>

      </div>

      {/* RECENT APPOINTMENTS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Appointments</h2>
            <p className="text-xs text-slate-500 mt-0.5">Latest home care service requests</p>
          </div>
          <button className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 transition-colors">
            View All <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Patient</th>
                <th className="px-6 py-3.5">Assigned Nurse</th>
                <th className="px-6 py-3.5">Date & Time</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  John Smith
                </td>
                <td className="px-6 py-4">Sarah Jenkins, RN</td>
                <td className="px-6 py-4 text-xs text-slate-500">Today, 02:00 PM</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs font-medium text-slate-600 hover:text-teal-700 transition-colors">Details</button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  Maria Garcia
                </td>
                <td className="px-6 py-4">Michael Brown, LPN</td>
                <td className="px-6 py-4 text-xs text-slate-500">Today, 04:30 PM</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                    <Clock className="w-3.5 h-3.5" /> Pending
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs font-medium text-slate-600 hover:text-teal-700 transition-colors">Details</button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  Robert Wilson
                </td>
                <td className="px-6 py-4">Emily Davis, RN</td>
                <td className="px-6 py-4 text-xs text-slate-500">Tomorrow, 10:00 AM</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs font-medium text-slate-600 hover:text-teal-700 transition-colors">Details</button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}