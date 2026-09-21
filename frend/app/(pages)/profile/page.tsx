'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  DollarSign, 
  Star, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Edit3, 
  Save, 
  X,
  Loader2,
  ShieldCheck,
  Calendar,
  Check,
  XCircle,
  Trash2,
  ExternalLink,
  Eye,
  FileCheck
} from 'lucide-react';
import Link from 'next/link';

interface Booking {
  id: number;
  patient_id: number;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
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
}

interface NurseProfile {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string | number;
  location: string;
  price: string | number;
  rating: string | number;
  reviews: number;
  image?: string | null;
  license_file?: string;
  cv_file?: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  categories: string[];
}

export default function NurseProfilePage() {
  const [profile, setProfile] = useState<NurseProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // حالة التعديل
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  
  // حالة نافذة معاينة الـ CV
  const [showCvModal, setShowCvModal] = useState(false);

  const [editFormData, setEditFormData] = useState({
    location: '',
    price: '',
    specialization: '',
    phone: '',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [profileRes, bookingsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/nurses/me', { withCredentials: true, headers }),
        axios.get('http://localhost:5000/api/nurses/my-bookings', { withCredentials: true, headers })
      ]);

      setProfile(profileRes.data);
      setEditFormData({
        location: profileRes.data.location || '',
        price: profileRes.data.price ? String(profileRes.data.price) : '',
        specialization: profileRes.data.specialization || '',
        phone: profileRes.data.phone || '',
      });

      setBookings(bookingsRes.data.bookings || []);
    } catch (err: any) {
      console.error('Failed to load data:', err);
      setError(err.response?.data?.message || 'Could not load your profile and bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    try {
      setActionLoading(bookingId);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      await axios.patch(
        `http://localhost:5000/api/nurses/bookings/${bookingId}/status`,
        { status: newStatus },
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus as any } : b))
      );
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteBooking = async (bookingId: number) => {
    if (!window.confirm('Are you sure you want to delete this booking record?')) {
      return;
    }

    try {
      setActionLoading(bookingId);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      await axios.delete(`http://localhost:5000/api/nurses/bookings/${bookingId}`, {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete booking.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      await axios.put(
        'http://localhost:5000/api/nurses/me/update',
        editFormData,
        { withCredentials: true, headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      if (profile) {
        setProfile({
          ...profile,
          ...editFormData,
          price: Number(editFormData.price)
        });
      }
      setIsEditing(false);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update profile details.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 bg-[#f8fafc]">
        <Loader2 className="w-8 h-8 text-[#00535B] animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading nurse data...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-[#f8fafc]">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900">Profile Not Accessible</h2>
          <p className="text-sm text-slate-500 mt-2">{error || 'Please log in.'}</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/Sign-in" className="px-4 py-2 bg-[#00535B] text-white text-sm font-semibold rounded-xl hover:bg-[#00737D]">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Nurse Member';
  const avatarUrl = profile.image 
    ? (profile.image.startsWith('http') ? profile.image : `http://localhost:5000/${profile.image.replace(/^\/+/, '')}`)
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=00535B&color=fff&size=160`;

  // رابط الـ CV المحسوب
  const cvUrl = profile.cv_file 
    ? (profile.cv_file.startsWith('http') ? profile.cv_file : `http://localhost:5000/${profile.cv_file.replace(/^\/+/, '')}`)
    : null;

  const isCvImage = cvUrl ? /\.(jpg|jpeg|png|webp)$/i.test(cvUrl) : false;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Top Status Alerts */}
        {profile.status === 'pending' && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-800">
            <Clock className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
            <div>
              <p className="text-sm font-bold">Nurse Application Under Review</p>
              <p className="text-xs text-amber-700 mt-0.5">Your profile is currently waiting for admin approval.</p>
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="h-36 sm:h-44 bg-gradient-to-r from-[#00535B] via-[#00737D] to-[#125460] relative">
            <div className="absolute right-4 top-4 flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/15 backdrop-blur hover:bg-white/25 text-white rounded-xl text-xs font-semibold transition-all border border-white/20 shadow-sm"
              >
                {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                <img 
                  src={avatarUrl} 
                  alt={fullName}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-lg bg-white"
                />
                <div className="sm:pb-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{fullName}</h1>
                    {profile.status === 'approved' && (
                      <ShieldCheck className="w-6 h-6 text-[#00535B]" />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-[#00535B] mt-0.5">
                    {profile.specialization || 'Registered Nurse'}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {profile.location || 'Lebanon'}</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {Number(profile.rating || 0).toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {/* زر عرض الـ CV في رأس الصفحة */}
              {cvUrl && (
                <button
                  type="button"
                  onClick={() => setShowCvModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors border border-slate-200 shadow-sm"
                >
                  <FileText className="w-4 h-4 text-[#00535B]" />
                  <span>View My CV</span>
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Hourly Rate</span>
                <span className="text-xl font-bold text-slate-900 flex items-center gap-0.5 mt-1">
                  <DollarSign className="w-5 h-5 text-[#00535B]" /> ${profile.price || 0}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Total Bookings</span>
                <span className="text-xl font-bold text-slate-900 flex items-center gap-1 mt-1">
                  <Calendar className="w-5 h-5 text-[#00535B]" /> {bookings.length}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Experience</span>
                <span className="text-xl font-bold text-slate-900 flex items-center gap-1 mt-1">
                  <Award className="w-5 h-5 text-[#00535B]" /> {profile.experience || 0} yrs
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Reviews</span>
                <span className="text-xl font-bold text-slate-900 flex items-center gap-1 mt-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" /> {profile.reviews || 0}
                </span>
              </div>
            </div>

            {/* قسم الملفات والـ Documents المرفقة */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/70 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00535B] flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Curriculum Vitae (CV)</p>
                  <p className="text-[11px] text-slate-500">
                    {cvUrl ? 'Verified and submitted to the administration' : 'No CV uploaded yet'}
                  </p>
                </div>
              </div>

              {cvUrl ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCvModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00535B] text-white hover:bg-[#00737D] rounded-xl text-xs font-medium transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview CV</span>
                  </button>
                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-medium transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in new tab</span>
                  </a>
                </div>
              ) : (
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                  Not Provided
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSaveChanges} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Edit Profile Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Specialization</label>
                <input
                  type="text"
                  required
                  value={editFormData.specialization}
                  onChange={(e) => setEditFormData({ ...editFormData, specialization: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Rate ($ / hr)</label>
                <input
                  type="number"
                  required
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Location</label>
                <input
                  type="text"
                  required
                  value={editFormData.location}
                  onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone</label>
                <input
                  type="text"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-[#00535B] text-white rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* ================= BOOKINGS SECTION ================= */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">All Patient Bookings</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage, update, and remove incoming care requests.</p>
            </div>
            <span className="px-3 py-1 bg-teal-50 text-[#00535B] border border-teal-100 rounded-full text-xs font-bold">
              {bookings.length} Total
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              <Calendar className="w-10 h-10 mx-auto mb-2 opacity-40" />
              No bookings assigned to you yet.
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-slate-200/90 rounded-2xl p-5 hover:border-slate-300 transition-all bg-[#fafcfc]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{booking.patient_name}</span>
                        <span className="text-[11px] text-slate-400">• Request #{booking.id}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Booked on {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        booking.status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        booking.status === 'rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        booking.status === 'completed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {booking.status}
                      </span>

                      <button
                        type="button"
                        disabled={actionLoading === booking.id}
                        onClick={() => handleDeleteBooking(booking.id)}
                        title="Delete booking record"
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Care Type</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block">{booking.care_type}</span>
                      <span className="text-[11px] text-slate-500">For: {booking.care_for}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">Date & Duration</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block">{booking.start_date}</span>
                      <span className="text-[11px] text-slate-500">{booking.duration}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">Patient Contact</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block">{booking.patient_phone || 'No phone'}</span>
                      <span className="text-[11px] text-slate-500 truncate block">{booking.patient_email}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">Location</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block truncate">{booking.address}</span>
                      {booking.latitude && (
                        <a
                          href={`https://maps.google.com/?q=${booking.latitude},${booking.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00535B] underline text-[11px] inline-flex items-center gap-0.5"
                        >
                          <MapPin className="w-3 h-3" /> View Map
                        </a>
                      )}
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs text-slate-600 mb-4">
                      <span className="font-semibold text-slate-700 block mb-0.5">Notes:</span>
                      {booking.notes}
                    </div>
                  )}

                  {booking.status === 'pending' && (
                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        disabled={actionLoading === booking.id}
                        onClick={() => handleStatusChange(booking.id, 'rejected')}
                        className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Decline
                      </button>
                      <button
                        type="button"
                        disabled={actionLoading === booking.id}
                        onClick={() => handleStatusChange(booking.id, 'accepted')}
                        className="px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept Booking
                      </button>
                    </div>
                  )}

                  {booking.status === 'accepted' && (
                    <div className="flex justify-end pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        disabled={actionLoading === booking.id}
                        onClick={() => handleStatusChange(booking.id, 'completed')}
                        className="px-3 py-1.5 bg-[#00535B] text-white hover:bg-[#00737D] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark as Completed
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ================= MODAL PREVIEW FOR CV ================= */}
      {showCvModal && cvUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00535B]" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Curriculum Vitae Preview</h3>
                  <p className="text-[11px] text-slate-500">{fullName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/70 rounded-xl transition-colors inline-flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open
                </a>
                <button
                  type="button"
                  onClick={() => setShowCvModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 bg-slate-100 p-4 overflow-auto flex items-center justify-center">
              {isCvImage ? (
                <img
                  src={cvUrl}
                  alt="Nurse CV Document"
                  className="max-h-full max-w-full rounded-xl object-contain shadow-md bg-white"
                />
              ) : (
                <iframe
                  src={cvUrl}
                  title="Nurse CV Viewer"
                  className="w-full h-full rounded-xl border border-slate-200 bg-white shadow-inner"
                />
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}