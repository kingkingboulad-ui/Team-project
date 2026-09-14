'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Star, MapPin, Briefcase, Globe, CheckCircle2, 
  ArrowLeft, MessageSquare, Loader2 
} from 'lucide-react';
import Image from 'next/image';

// تعريف واجهة بيانات الممرضة (Nurse Interface)
interface Nurse {
  id: string | number;
  first_name?: string;
  last_name?: string;
  fullName?: string;
  profile_picture?: string;
  rating?: number | string;
  reviews?: number;
  location?: string;
  experience?: number | string;
  languages?: string[];
  status?: string;
  price: number | string;
  specialization?: string[] | string;
  bio?: string;
}

// تعريف واجهة استجابة الـ API (API Response Interface)
interface ApiResponse {
  success: boolean;
  nurse?: Nurse;
  message?: string;
}

export default function NurseProfilePage() {
  const params = useParams();
  
  // 🟢 التعديل هنا: جلب Details من params بدلاً من id
  const id = (params?.Details || params?.details || params?.id) as string | undefined;

  const [nurse, setNurse] = useState<Nurse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      // 🟢 إذا لم يجد ID، ينهي التحميل ويعرض خطأ بدلاً من التعليق
      setLoading(false);
      setError('Invalid profile ID URL');
      return;
    }

    const fetchNurse = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/nurses/users/${id}`);
        const data: ApiResponse = await response.json();

        if (response.ok && data.success && data.nurse) {
          setNurse(data.nurse);
        } else {
          setError(data.message || 'Nurse not found');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load nurse data');
      } finally {
        setLoading(false);
      }
    };

    fetchNurse();
  }, [id]);

  // حالة التحميل (Loading State)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f7f9] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#0d6e6e] animate-spin mb-3" />
        <p className="text-gray-500 font-medium text-sm">Loading nurse profile...</p>
      </div>
    );
  }

  // حالة الخطأ أو عدم وجود ممرضة (Error State)
  if (error || !nurse) {
    return (
      <div className="min-h-screen bg-[#f3f7f9] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Nurse Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">{error || "The requested profile doesn't exist."}</p>
          <Link href="/find-a-nurses" className="inline-flex items-center gap-2 bg-[#0d6e6e] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#094d4d] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Find a Nurse
          </Link>
        </div>
      </div>
    );
  }

  // معالجة مصفوفة التخصصات بأمان مع TypeScript
  const specializationsList: string[] = nurse.specialization
    ? Array.isArray(nurse.specialization)
      ? nurse.specialization
      : nurse.specialization.split(',')
    : ['Elderly Care', 'Post-Surgery Recovery', 'Medication Support'];

  const nurseName = nurse.fullName || `${nurse.first_name || ''} ${nurse.last_name || ''}`.trim() || 'Nurse';

  return (
    <div className="min-h-screen bg-[#f3f7f9] text-gray-800 font-sans pb-16 pt-6">
      <main className="max-w-7xl mx-auto px-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link href="/nurses" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            Back to Find a Nurse
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN (Sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Card 1: Profile Main Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="relative mb-4 overflow-hidden rounded-xl h-64 bg-gray-100">
                <Image
                  src={`http://localhost:5000${nurse.license_file}`} 
                  alt={nurseName} 
                  width={600}
                  height={600}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <h1 className="text-xl font-bold text-gray-900">{nurseName}</h1>
              <p className="text-sm font-medium text-[#0d6e6e] mt-0.5">
                Registered Nurse (RN)
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-3 text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-gray-900">{nurse.rating || "4.9"}</span>
                <span className="text-gray-500">({nurse.reviews || 0} reviews)</span>
              </div>

              {/* Details List */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2.5 text-sm text-gray-600">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{nurse.location || "San Francisco, CA"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{nurse.experience || 0} years of experience</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>English, Arabic, French</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-5">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${
                  nurse.status === 'active' || nurse.status === 'available' 
                    ? 'bg-[#10b981] text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  ● {nurse.status ? nurse.status.toUpperCase() : 'AVAILABLE NOW'}
                </span>
              </div>

              {/* Hourly Rate */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Hourly Rate</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-gray-900">${nurse.price}</span>
                  <span className="text-xs text-gray-500"> /hr</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-[#0d6e6e] hover:bg-[#094d4d] text-white rounded-lg font-medium transition-colors text-sm shadow-sm">
                Book a Consultation
              </button>
              <button className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-[#0d6e6e] border-2 border-[#0d6e6e] rounded-lg font-medium transition-colors text-sm">
                Request Care
              </button>
              <button className="w-full py-3 px-4 bg-[#e0f2fe] hover:bg-[#bae6fd] text-[#0284c7] rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Send Message
              </button>
            </div>

            {/* Card 2: Certifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Certifications</h3>
              <ul className="space-y-3 text-xs text-gray-600 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                  <span>RN License (California)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                  <span>CPR &amp; AED Certified</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                  <span>Geriatric Care Specialist</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                  <span>Medication Administration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                  <span>HIPAA Compliance</span>
                </li>
              </ul>
            </div>

          </div>

          {/* RIGHT COLUMN (Details & Main Content) */}
          <div className="lg:col-span-8 space-y-6">

            {/* About Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-3">About {nurse.first_name || 'Sarah'}</h2>
              <div className="text-xs md:text-sm text-gray-600 leading-relaxed space-y-3">
                <p>
                  I am a dedicated Registered Nurse with {nurse.experience || 8} years of experience specializing in elderly
                  care, post-surgery recovery, and medication management. I have worked in both clinical
                  and home settings, giving me a deep understanding of what patients need most when
                  recovering or aging at home.
                </p>
                <p>
                  My approach to care is built on compassion, patience, and respect for every patient's
                  dignity. I believe that home care should feel personal, not clinical — and I work hard to
                  build genuine relationships with every patient and their family.
                </p>
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-4">Specializations</h2>
              <div className="flex flex-wrap gap-2.5">
                {specializationsList.map((spec: string, i: number) => (
                  <span key={i} className="px-3.5 py-2 bg-[#f0f9ff] text-[#0284c7] text-xs font-semibold rounded-lg">
                    {spec.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Experience */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-6">Education &amp; Experience</h2>
              
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                <div className="relative">
                  <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#0d6e6e] bg-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0d6e6e]"></div>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">Senior Home Care Specialist</h3>
                  <p className="text-xs font-semibold text-[#0d6e6e]">NurseConnect</p>
                  <p className="text-xs text-gray-400 mt-0.5">2020 – Present</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-gray-400 bg-white"></div>
                  <h3 className="text-sm font-bold text-gray-900">Home Care Nurse</h3>
                  <p className="text-xs font-semibold text-[#0d6e6e]">Bay Area Home Health Services</p>
                  <p className="text-xs text-gray-400 mt-0.5">2018 – 2020</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-gray-400 bg-white"></div>
                  <h3 className="text-sm font-bold text-gray-900">Clinical Rotation</h3>
                  <p className="text-xs font-semibold text-[#0d6e6e]">UCSF Medical Center — Geriatric Unit</p>
                  <p className="text-xs text-gray-400 mt-0.5">2016</p>
                </div>
              </div>
            </div>

            {/* Availability This Week */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-4">Availability This Week</h2>
              
              <div className="grid grid-cols-7 gap-2 text-center">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day: string, i: number) => (
                  <div key={i} className="text-xs font-semibold text-gray-500 mb-2">{day}</div>
                ))}

                <div className="space-y-2">
                  <span className="block p-1.5 bg-[#e0f2fe] text-[#0284c7] text-[11px] font-semibold rounded">8:00 AM</span>
                  <span className="block p-1.5 bg-[#e0f2fe] text-[#0284c7] text-[11px] font-semibold rounded">2:00 PM</span>
                </div>
                <div className="space-y-2">
                  <span className="block p-1.5 bg-[#e0f2fe] text-[#0284c7] text-[11px] font-semibold rounded">9:00 AM</span>
                </div>
                <div className="space-y-2">
                  <span className="block p-1.5 bg-[#e0f2fe] text-[#0284c7] text-[11px] font-semibold rounded">8:00 AM</span>
                  <span className="block p-1.5 bg-[#e0f2fe] text-[#0284c7] text-[11px] font-semibold rounded">1:00 PM</span>
                </div>
                <div className="text-xs text-gray-300 py-1.5">—</div>
                <div className="space-y-2">
                  <span className="block p-1.5 bg-[#e0f2fe] text-[#0284c7] text-[11px] font-semibold rounded">8:00 AM</span>
                </div>
                <div className="space-y-2">
                  <span className="block p-1.5 bg-[#e0f2fe] text-[#0284c7] text-[11px] font-semibold rounded">10:00 AM</span>
                </div>
                <div className="text-xs text-gray-300 py-1.5">—</div>
              </div>
            </div>

            {/* Patient Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-gray-900">Patient Reviews</h2>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-900">{nurse.rating || "4.9"}</span>
                  <span className="text-gray-400">/ {nurse.reviews || 0} reviews</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 font-bold text-xs flex items-center justify-center">
                        E
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">Emily Chen</h4>
                        <p className="text-[11px] text-gray-400">March 15, 2026</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i: number) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    {nurse.first_name || 'Sarah'} was absolutely amazing with my father. She was patient, professional, and genuinely caring.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}