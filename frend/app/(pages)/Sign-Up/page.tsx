'use client';

import React, { useState } from 'react';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f8fafc]">
      {/* Left Side: Hero Image with Overlay Content */}
      <div className="relative min-h-[320px] lg:min-h-screen w-full bg-slate-900 overflow-hidden flex items-end p-8 sm:p-12 lg:p-16">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
          alt="Medical staff collaborating"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        <div className="relative z-10 max-w-lg text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white mb-4">
            <svg className="w-3.5 h-3.5 text-teal-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="uppercase tracking-wider text-[10px] font-semibold">TRUSTED & SECURE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3">
            Empowering your healthcare journey.
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed opacity-90">
            Access verified, compassionate nursing care directly from your home. We&apos;re here to support your family&apos;s health.
          </p>
        </div>
      </div>

      {/* Right Side: Sign Up Form Content */}
      <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          
          {/* Header Icon & Title */}
          <div>
            <div className="w-10 h-10 rounded-full bg-[#0d7c7b] text-white flex items-center justify-center mb-4 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0f3d3e] leading-snug">
              Find the care your family deserves.
            </h2>
            <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
              Join NurseConnect to connect with verified, compassionate nurses in your area.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            
            {/* First Name & Last Name Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-medium text-slate-600">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#0d7c7b] focus:ring-1 focus:ring-[#0d7c7b] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-medium text-slate-600">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#0d7c7b] focus:ring-1 focus:ring-[#0d7c7b] transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-slate-600">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#0d7c7b] focus:ring-1 focus:ring-[#0d7c7b] transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-slate-600">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#0d7c7b] focus:ring-1 focus:ring-[#0d7c7b] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-slate-600">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#0d7c7b] focus:ring-1 focus:ring-[#0d7c7b] transition-all"
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#0d5c5c] hover:bg-[#094747] text-white text-xs font-semibold rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm mt-4"
            >
              <span>Create Patient Account</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Security Banner Card */}
          <div className="bg-[#e6f7f7] border border-[#d2f0f0] rounded-xl p-3.5 flex items-start gap-3">
            <svg className="w-4 h-4 text-[#0d7c7b] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-[11px] font-bold text-slate-800">Secure & Private</h4>
              <p className="text-[10px] text-slate-500 leading-normal mt-0.5">
                HIPAA compliant platform with 256-bit encryption ensuring your data remains completely private.
              </p>
            </div>
          </div>

          {/* Already have an account */}
          <div className="text-center pt-1">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <a href="#" className="font-semibold text-[#0d7c7b] hover:underline">
                Sign In
              </a>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}