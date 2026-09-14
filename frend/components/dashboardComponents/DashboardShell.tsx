'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Users, Calendar, Settings, 
  Bell, Search, Menu, X, LogOut, ChevronDown, UserCheck
} from 'lucide-react';

interface ShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: ShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname(); // جلب المسار الحالي للرابط

  // مصفوفة روابط القائمة لسهولة الصيانة والتكرار
  const navItems = [
    { name: 'Overview', href: '/admin', icon: Home },
    { name: 'Nurses', href: '/admin/nurses', icon: UserCheck },
    { name: 'Patients', href: '/admin/patients', icon: Users },
    { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      
      {/* 1. FIXED HEADER */}
      <header className="h-16 bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-50 px-4 md:px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#0d6e6e] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              N
            </div>
            <span className="font-bold text-lg text-slate-900 hidden sm:inline-block">
              Nurse<span className="text-[#0d6e6e]">Connect</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center relative max-w-md w-full mx-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search patients, nurses..." 
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-xl focus:bg-white focus:border-[#0d6e6e] focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
          </button>

          <div className="h-6 w-[1px] bg-slate-200 my-auto"></div>

          <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-xl hover:bg-slate-100 transition-colors">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-900 leading-none">Dr. Sarah Connor</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </div>
        </div>
      </header>

      {/* BODY WRAPPER */}
      <div className="flex pt-16 h-screen overflow-hidden">
        
        {/* Overlay for mobile view */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)} 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
          />
        )}

        {/* 2. FIXED SIDEBAR */}
        <aside className={`
          fixed top-16 left-0 bottom-0 z-40
          w-64 bg-white border-r border-slate-200 flex flex-col justify-between
          h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 space-y-1 overflow-y-auto">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
            
            {/* dynamic navigation links */}
            {navItems.map((item) => {
              const Icon = item.icon;
              // فحص إذا كان الرابط هو المفعل حالياً
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[#0d6e6e] text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-100">
              <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">System</p>
              
              {/* Settings Link */}
              <Link 
                href="/admin/settings"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname.startsWith('/admin/settings')
                    ? 'bg-[#0d6e6e] text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 bg-white">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* 3. SCROLLABLE CONTENT AREA */}
        <main className="flex-1 lg:ml-64 p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          {children}
        </main>

      </div>
    </div>
  );
}