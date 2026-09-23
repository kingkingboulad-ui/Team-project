'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Camera, FileText } from 'lucide-react';
import Image from 'next/image';

const AVAILABLE_CATEGORIES = [
  'Home Care',
  'Elderly Care',
  'Pediatric Care',
  'Post-Surgery Care',
  'Wound Dressing',
  'IV Therapy & Injections',
  'Palliative Care',
  'ICU Support',
  'Physical Therapy Assistance'
];

export default function CreateNurseAccountPage() {
  const router = useRouter();

  // Personal Information
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Professional Profile
  const [specialization, setSpecialization] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Files Upload (Image & CV)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!imageFile) {
      setErrorMessage('Please upload a profile photo.');
      return;
    }

    if (!cvFile) {
      setErrorMessage('Please upload your CV.');
      return;
    }

    if (selectedCategories.length === 0) {
      setErrorMessage('Please select at least one care category / service.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('specialization', specialization);
      formData.append('experience', yearsExperience);
      formData.append('location', location);
      formData.append('price', price);
      formData.append('role', 'nurse');

      // إرسال التصنيفات
      formData.append('categories', JSON.stringify(selectedCategories));

      // الحقول المرفوعة مطابقة لـ Multer: image و cvFile
      formData.append('image', imageFile);
      formData.append('cvFile', cvFile);

      const res = await axios.post(
        'http://localhost:5000/api/nurses/apply',
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (res.status === 200 || res.status === 201) {
        router.push("/join-as-a-nurse/license-verification");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة لاحقاً.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">

        {/* Left: Intro copy */}
        <div className="space-y-4 lg:pt-2">
          <h1 className="text-sm font-bold tracking-wide text-slate-800">ACCOUNT CREATION</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Join our network of trusted healthcare professionals.
          </p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Please provide your personal information, profile photo, and credentials
            for verification. Our team reviews all applications within 24–48 hours.
          </p>
        </div>

        {/* Right: Form */}
        <div className="space-y-6">

          {errorMessage && (
            <div className="p-3 text-xs text-red-700 bg-red-100 border border-red-200 rounded-xl text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* 01 Personal Information */}
            <section className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
              <h2 className="text-sm font-bold text-[#0d7c7b]">01 / Personal Information</h2>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 bg-[#e8f8f8] border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0d7c7b] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane.doe@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#e8f8f8] border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0d7c7b] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 bg-[#e8f8f8] border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0d7c7b] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 pr-10 py-2.5 bg-[#e8f8f8] border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0d7c7b] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>

            {/* 02 Professional Profile */}
            <section className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
              <h2 className="text-sm font-bold text-[#0d7c7b]">02 / Professional Profile</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                    Primary Specialization
                  </label>
                  <select
                    required
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#e8f8f8] border border-transparent rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-[#0d7c7b] transition-all appearance-none"
                  >
                    <option value="" disabled>Select specialization...</option>
                    <option value="general">General / Home Care</option>
                    <option value="pediatric">Pediatric Care</option>
                    <option value="geriatric">Geriatric Care</option>
                    <option value="icu">ICU / Critical Care</option>
                    <option value="postop">Post-Operative Care</option>
                    <option value="palliative">Palliative Care</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                    Years of Experience
                  </label>
                  <select
                    required
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#e8f8f8] border border-transparent rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-[#0d7c7b] transition-all appearance-none"
                  >
                    <option value="" disabled>Select years...</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1–3 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="5-10">5–10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                    Current Location / Region
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State"
                    className="w-full px-3.5 py-2.5 bg-[#e8f8f8] border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0d7c7b] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                    Hourly Rate ($ / hour)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-xs font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.5"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="50.00"
                      className="w-full pl-7 pr-3.5 py-2.5 bg-[#e8f8f8] border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0d7c7b] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* اختيار التصنيفات */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                    Select Care Categories / Services Provided
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {selectedCategories.length} selected
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {AVAILABLE_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all border ${
                          isSelected
                            ? 'bg-[#0d7c7b] text-white border-[#0d7c7b] shadow-sm'
                            : 'bg-[#e8f8f8] text-slate-700 border-transparent hover:border-[#0d7c7b]/30'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 03 Profile Photo & CV Upload */}
            <section className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#0d7c7b]">03 / Profile Photo & CV Upload</h2>
                <span className="text-[10px] text-slate-400">Accepted formats: JPG, PNG, WEBP, PDF (Max 5MB)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Profile Image Upload */}
                <label className="cursor-pointer block">
                  <span className="block text-[11px] font-medium text-slate-600 uppercase tracking-wide mb-1.5">
                    Profile Picture (Photo)
                  </span>
                  <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-4 bg-[#fafcfc] hover:bg-[#e8f8f8] transition-colors text-center min-h-[140px]">
                    {imagePreview ? (
                    <Image
                    src={imagePreview}
                    alt="Preview"
                    width={64}
                    height={64}
                    unoptimized // ضرورية لروابط المعاينة blob: حتى يقبلها Next.js مباشرة
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#0d7c7b]"
                  />
                    ) : (
                      <Camera className="w-6 h-6 text-slate-400" />
                    )}
                    <span className="text-[11px] text-slate-600 font-medium truncate max-w-[180px]">
                      {imageFile ? imageFile.name : 'Click to upload photo'}
                    </span>
                  </div>
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {/* CV Upload */}
                <label className="cursor-pointer block">
                  <span className="block text-[11px] font-medium text-slate-600 uppercase tracking-wide mb-1.5">
                    Curriculum Vitae (CV)
                  </span>
                  <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-4 bg-[#fafcfc] hover:bg-[#e8f8f8] transition-colors text-center min-h-[140px]">
                    <FileText className="w-6 h-6 text-slate-400" />
                    <span className="text-[11px] text-slate-600 font-medium truncate max-w-[180px]">
                      {cvFile ? cvFile.name : 'Click to upload CV'}
                    </span>
                  </div>
                  <input
                    type="file"
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleCvChange}
                    className="hidden"
                  />
                </label>
              </div>
            </section>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#0f5454] hover:bg-[#0b4242] disabled:opacity-50 text-white text-xs font-medium rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              {loading ? 'Submitting...' : 'Submit Registration'}
              {!loading && (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M5 12h16" />
                </svg>
              )}
            </button>

            <p className="text-center text-xs text-slate-500">
              Already have an account?{' '}
              <a href="/Sign-in" className="font-semibold text-[#0d7c7b] hover:underline">
                Log In
              </a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}