'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  // State Management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        },
        {
          withCredentials: true, // ضروري لنقل الـ Cookie/Session بين السيرفر والعميل
        }
      );

      if (res.status === 200) {
        // توجيه المستخدم بعد نجاح الدخول
        router.push('/');
      }
    } catch (error: any) {
      // إظهار رسالة الخطأ القادمة من السيرفر أو رسالة عامة
      const message =
        error.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة لاحقاً.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3">
            Compassionate care, professional connection.
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed opacity-90">
            Streamlining communication and critical workflows for better patient outcomes.
          </p>
        </div>
      </div>

      {/* Right Side: Form Content */}
      <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0f3d3e]">Welcome Back</h2>
            <p className="text-slate-500 text-xs mt-1">Please sign in to your account.</p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
            
            {/* Display Error Message */}
            {errorMessage && (
              <div className="p-3 text-xs text-red-700 bg-red-100 border border-red-200 rounded-xl text-center">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Input */}
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#e8f8f8] border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0d7c7b] transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-medium text-slate-600">
                    Password
                  </label>
                  <a href="#" className="text-[11px] font-medium text-[#0d7c7b] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#e8f8f8] border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0d7c7b] transition-all"
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

              {/* Remember Me */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-slate-300 text-[#0d7c7b] focus:ring-[#0d7c7b] cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer select-none">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#0f5454] hover:bg-[#0b4242] disabled:opacity-50 text-white text-xs font-medium rounded-xl transition-colors shadow-sm mt-2"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] text-slate-400 uppercase">
                <span className="bg-white px-2">or continue with</span>
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 py-2 px-3 bg-[#e8f8f8] hover:bg-[#dbf3f3] text-slate-700 rounded-xl text-xs font-medium transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </button>

              <button type="button" className="flex items-center justify-center gap-2 py-2 px-3 bg-[#e8f8f8] hover:bg-[#dbf3f3] text-slate-700 rounded-xl text-xs font-medium transition-colors">
                <svg className="w-4 h-4 fill-current text-slate-800" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.01c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.78 1.01.08 2.05-.53 2.68-1.28z"/>
                </svg>
                <span>Apple</span>
              </button>
            </div>

          </div>

          {/* Bottom Banner */}
          <div className="bg-[#e8f8f8] border border-[#d2f0f0] rounded-xl p-3.5 text-center">
            <p className="text-xs text-slate-600">
              Not a member?{' '}
              <a href="#" className="font-semibold text-[#0d7c7b] hover:underline">
                Join our nursing network
              </a>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}