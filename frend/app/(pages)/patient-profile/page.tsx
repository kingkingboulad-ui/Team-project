'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Loader2, 
  FileText,
  Activity,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
}

interface CareRequest {
  id: number;
  care_for: string;
  care_type: string;
  start_date: string;
  duration: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  notes: string | null;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
  nurse_name?: string | null;
  nurse_specialization?: string | null;
  nurse_phone?: string | null;
  nurse_price?: number | null;
  nurse_image?: string | null;
}

export default function PatientProfilePage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [requests, setRequests] = useState<CareRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        setError(null);
  
        // فحص وجود التوكن في localStorage تحت عدة أسماء شائعة
        let token = null;
        if (typeof window !== "undefined") {
          token = 
            localStorage.getItem("token") || 
            localStorage.getItem("userToken") || 
            localStorage.getItem("jwt");
        }
  
        const res = await axios.get("http://localhost:5000/api/patients/me", {
          withCredentials: true, // ضروري جداً لإرسال الـ Cookies إذا كان السيرفر يعتمد عليها
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
  
        if (res.data.success) {
          setPatient(res.data.patient);
          setRequests(res.data.requests || []);
        }
      } catch (err: any) {
        console.error("Failed to load patient profile:", err);
        setError(
          err.response?.data?.message || "Please log in to view your patient profile."
        );
      } finally {
        setLoading(false);
      }
    };
  
    fetchPatientData();
  }, []);
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 bg-[#F1F8FB]">
        <Loader2 className="w-8 h-8 text-[#006D77] animate-spin" />
        <p className="text-sm font-medium text-[#456268]">Loading your profile & bookings...</p>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-[#F1F8FB]">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900">Access Denied</h2>
          <p className="text-sm text-slate-500 mt-2">{error || "Please sign in to continue."}</p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/Sign-in"
              className="px-5 py-2.5 bg-[#006D77] text-white text-xs font-semibold rounded-xl hover:bg-[#00535B] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const patientFullName = `${patient.first_name} ${patient.last_name}`;

  return (
    <div className="min-h-screen bg-[#F1F8FB] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-20 h-20 rounded-2xl bg-[#E8F7F8] border-2 border-[#006D77]/20 flex items-center justify-center text-[#006D77] text-2xl font-bold">
                {patient.first_name.charAt(0)}{patient.last_name.charAt(0)}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#092F35]">{patientFullName}</h1>
                <p className="text-xs text-gray-400 mt-0.5">
                  Member since {new Date(patient.created_at).toLocaleDateString()}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-600 mt-3">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#006D77]" /> {patient.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#006D77]" /> {patient.phone || 'No phone provided'}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/find-a-nurses"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#006D77] hover:bg-[#00535B] text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              Book New Care <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Care Requests Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#092F35]">Your Care Requests & Status</h2>
              <p className="text-xs text-gray-500 mt-0.5">Follow up on your bookings and check whether your request is approved.</p>
            </div>
            <span className="px-3 py-1 bg-teal-50 text-[#006D77] border border-teal-100 rounded-full text-xs font-bold">
              {requests.length} Requests
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="py-14 text-center">
              <Activity className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No care requests yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                You have not booked any healthcare provider yet. Choose a qualified nurse for your family.
              </p>
              <div className="mt-4">
                <Link
                  href="/find-a-nurses"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#006D77] text-white rounded-xl text-xs font-semibold hover:bg-[#00535B] transition-colors"
                >
                  Find a Nurse
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div 
                  key={req.id} 
                  className="rounded-2xl border border-slate-200/90 p-5 bg-[#fafcfc] hover:border-slate-300 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-bold text-slate-800">Booking #{req.id}</span>
                      <span className="text-xs text-slate-400 ml-2">
                        Created on {new Date(req.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Status Badges */}
                    <div>
                      {req.status === 'accepted' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> تم قبول الطلب (Accepted)
                        </span>
                      )}
                      {req.status === 'pending' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3.5 h-3.5 text-amber-600" /> قيد المراجعة (Pending)
                        </span>
                      )}
                      {req.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" /> تم رفض الطلب (Declined)
                        </span>
                      )}
                      {req.status === 'completed' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> تم الإنجاز (Completed)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Service Type</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block">{req.care_type}</span>
                      <span className="text-[11px] text-slate-500">For: {req.care_for}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">Schedule</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block">{req.start_date}</span>
                      <span className="text-[11px] text-slate-500">{req.duration}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">Selected Nurse</span>
                      <span className="font-semibold text-[#006D77] mt-0.5 block">
                        {req.nurse_name || "General Booking"}
                      </span>
                      {req.nurse_phone && req.status === 'accepted' && (
                        <span className="text-[11px] text-slate-600 block">📞 {req.nurse_phone}</span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">Care Address</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block truncate" title={req.address}>
                        {req.address}
                      </span>
                    </div>
                  </div>

                  {req.notes && (
                    <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
                      <span className="font-semibold text-slate-700">Special Notes: </span>
                      {req.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}