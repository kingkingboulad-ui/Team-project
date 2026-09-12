'use client';

import Link from 'next/link';
import React from 'react';

// قائمة الميزات الـ 8 المطابقة للتصميم
const features = [
    {
        title: 'Create Your Profile',
        desc: 'Build a professional profile highlighting your qualifications, specializations, and experience in minutes.',
        icon: (
            <svg className="w-5 h-5 text-[#0d7c7b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        title: 'Set Your Availability',
        desc: 'You’re in control. Set your own schedule with a flexible calendar to fit your availability.',
        icon: (
            <svg className="w-5 h-5 text-[#0d7c7b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: 'Choose Your Care Types',
        desc: 'Specialize in the care types you’re most expert in. Focus on patients you truly genuinely help.',
        icon: (
            <svg className="w-5 h-5 text-[#0d7c7b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.12a2 2 0 00-1.162.222l-.13.08A2 2 0 003.3 17.15l1.62 3.24a2 2 0 001.789 1.11h10.582a2 2 0 001.789-1.11l1.62-3.24a2 2 0 00-.271-2.222z" />
            </svg>
        ),
    },
    {
        title: 'Receive Care Requests',
        desc: 'Receive in-app care request notifications that match your profile and expectations.',
        icon: (
            <svg className="w-5 h-5 text-[#0d7c7b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        ),
    },
    {
        title: 'Communicate Securely',
        desc: 'Use our in-app messaging system to communicate with clients and families safely.',
        icon: (
            <svg className="w-5 h-5 text-[#0d7c7b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
    },
    {
        title: 'Track Your Earnings',
        desc: 'Transparent, weekly payouts. View your earnings history and manage your finances all in one place.',
        icon: (
            <svg className="w-5 h-5 text-[#0d7c7b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        title: 'Build Your Reputation',
        desc: 'Collect verified reviews from patients. Great care leads to more bookings and higher rates.',
        icon: (
            <svg className="w-5 h-5 text-[#0d7c7b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m11-16l1.5 6 6 1.5-6 1.5L17 21l-1.5-6-6-1.5 6-1.5L17 3z" />
            </svg>
        ),
    },
    {
        title: 'Manage Bookings',
        desc: 'A simple, clean dashboard to manage all your appointments and patient information.',
        icon: (
            <svg className="w-5 h-5 text-[#0d7c7b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        ),
    },
];

// خطوات الانضمام الاربعة
const joinSteps = [
    { step: '1', title: 'Create Account', desc: 'Sign up with your professional details.' },
    { step: '2', title: 'Build Profile', desc: 'Add your qualifications, specializations, and photo.' },
    { step: '3', title: 'Pass Verification', desc: 'We verify your license and run a background check.' },
    { step: '4', title: 'Start Connecting', desc: 'Go live and start receiving care requests.' },
];

export default function ForNursesPage() {
    return (
        <main className="min-h-screen bg-[#f8fafc]">

            {/* 1. Hero Section */}
            <section className="bg-gradient-to-r from-[#0b3336] via-[#0e4849] to-[#0b3336] text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column Text */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-teal-200">
                            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                            <span>Join 12,000+ nurses on NurseConnect</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Make a Difference. <br />
                            <span className="text-[#3ed8d8] font-sans font-bold">
                                Find Patients Who Need You.
                            </span>
                        </h1>

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
                            NurseConnect connects qualified nurses and caregivers with people who need home healthcare. Build your practice, set your own schedule, and do meaningful work on your terms.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link href={'for-nurses/join-nurses'} className="px-5 py-2.5 bg-[#0d7c7b] hover:bg-[#095f5e] text-white text-xs font-semibold rounded-lg transition-colors">
                                Join as a Nurse
                            </Link >
                            <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold rounded-lg transition-colors">
                                Learn More →
                            </button>
                        </div>
                    </div>

                    {/* Right Column Image & Overlay Stats */}
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
                                alt="Nurse working on laptop"
                                className="w-full h-[320px] sm:h-[380px] object-cover"
                            />
                        </div>

                        {/* Overlaid Floating Badge */}
                        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 text-slate-800 shadow-lg flex justify-around items-center border border-slate-100">
                            <div className="text-center">
                                <p className="text-lg font-bold text-slate-900">12,000+</p>
                                <p className="text-[10px] text-slate-500 uppercase font-medium">Active Nurses</p>
                            </div>
                            <div className="h-8 w-px bg-slate-200" />
                            <div className="text-center">
                                <p className="text-lg font-bold text-slate-900">$52</p>
                                <p className="text-[10px] text-slate-500 uppercase font-medium">Avg. Hourly Rate</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 2. Top Stats Bar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-center">
                    <div>
                        <p className="text-2xl font-bold text-slate-900">12,000+</p>
                        <p className="text-xs text-slate-500 font-medium">Active Nurses</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">$52</p>
                        <p className="text-xs text-slate-500 font-medium">Avg Hourly Rate</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">4.8 ★</p>
                        <p className="text-xs text-slate-500 font-medium">Avg Nurse Rating</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">98%</p>
                        <p className="text-xs text-slate-500 font-medium">Job Satisfaction</p>
                    </div>
                </div>
            </section>

            {/* 3. Features Section Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <p className="text-[10px] font-bold tracking-widest text-[#0d7c7b] uppercase mb-1">
                        EVERYTHING YOU NEED
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        How NurseConnect Supports You
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto">
                        We built every feature with nurses in mind — from profile management to secure payments.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-9 h-9 rounded-xl bg-[#e6f4f4] flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-sm font-bold text-slate-800 mb-1.5">{item.title}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. How To Join Steps */}
            <section className="bg-white py-16 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How to Join</h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Getting started takes less than 10 minutes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {joinSteps.map((step) => (
                            <div key={step.step} className="text-center space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-[#0d7c7b] text-white font-bold text-sm flex items-center justify-center mx-auto shadow-sm">
                                    {step.step}
                                </div>
                                <h3 className="text-sm font-bold text-slate-800">{step.title}</h3>
                                <p className="text-xs text-slate-500 max-w-xs mx-auto">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Testimonial Banner */}
                    <div className="mt-16 bg-[#f0f9f9] border border-[#d2f0f0] rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-center">
                        <img
                            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop"
                            alt="Nurse testimonial"
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0 shadow-sm"
                        />
                        <div className="space-y-3 text-center md:text-left">
                            <div className="flex justify-center md:justify-start gap-1 text-amber-400 text-sm">
                                ★★★★★
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-slate-800 italic leading-relaxed">
                                &quot;NurseConnect gave me the freedom to do the work I love on my own terms. I set my own schedule, choose my patients, and earn more than I ever did at a clinic.&quot;
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
                                <div className="w-6 h-6 rounded-full bg-[#0d7c7b] text-white text-[10px] font-bold flex items-center justify-center">
                                    MS
                                </div>
                                <span className="text-xs font-bold text-slate-800">Maria Santos, LPN</span>
                                <span className="text-xs text-slate-400">• 12 years experience • Oakland, CA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Bottom Ready To Start Banner */}
            <section className="bg-[#095f5e] text-white py-14 px-4 text-center">
                <div className="max-w-2xl mx-auto space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-bold">Ready to Start?</h2>
                    <p className="text-xs sm:text-sm text-teal-100">
                        Join thousands of nurses who have built rewarding careers through NurseConnect.
                    </p>
                    <button className="mt-2 px-6 py-2.5 bg-white text-[#095f5e] hover:bg-slate-100 text-xs font-bold rounded-lg transition-colors shadow-sm">
                        Join as a Nurse Today
                    </button>
                </div>
            </section>

        </main>
    );
}