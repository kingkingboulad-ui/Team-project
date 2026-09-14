'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, HeartPulse, MapPin, Calendar, FileText } from 'lucide-react';

export default function AddPatientPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    email: '',
    phone: '',
    address: '',
    careType: '',
    medicalCondition: 'Stable',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Patient Data:', formData);
    // يمكنك ربط الـ API الخاص بالإضافة هنا
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/patients" 
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New Patient</h1>
          <p className="text-sm text-slate-500">Register a new patient for home care services.</p>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        
        {/* Personal Details */}
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#0d6e6e]" /> Patient Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. John Smith"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0d6e6e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
              <input 
                type="number" 
                required
                placeholder="e.g. 65"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0d6e6e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
              <select 
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0d6e6e] focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0d6e6e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                required
                placeholder="+1 555 019 2831"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0d6e6e] focus:outline-none"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Home Address</label>
              <input 
                type="text" 
                required
                placeholder="Street name, Building No, Apartment..."
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0d6e6e] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Medical & Care Info */}
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-[#0d6e6e]" /> Care Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Care Type Needed</label>
              <select 
                required
                value={formData.careType}
                onChange={(e) => setFormData({...formData, careType: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0d6e6e] focus:outline-none"
              >
                <option value="">Select Care Type</option>
                <option value="Post-Surgery Care">Post-Surgery Care</option>
                <option value="Elderly Daily Care">Elderly Daily Care</option>
                <option value="Physical Therapy">Physical Therapy</option>
                <option value="Palliative Care">Palliative Care</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Health Status</label>
              <select 
                value={formData.medicalCondition}
                onChange={(e) => setFormData({...formData, medicalCondition: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0d6e6e] focus:outline-none"
              >
                <option value="Stable">Stable</option>
                <option value="Requires Attention">Requires Attention</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Medical Notes & Special Instructions</label>
              <textarea 
                rows={3}
                placeholder="Mention any allergies, chronic conditions, or specific instructions for the nurse..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#0d6e6e] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Link 
            href="/admin/patients" 
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            className="px-6 py-2.5 rounded-xl bg-[#0d6e6e] text-white text-sm font-semibold hover:bg-[#095252] transition-colors shadow-sm"
          >
            Register Patient
          </button>
        </div>

      </form>
    </div>
  );
}