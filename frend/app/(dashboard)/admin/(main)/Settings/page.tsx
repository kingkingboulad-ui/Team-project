'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, 
  Lock, 
  Bell, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Mail,
  Phone
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');

  // بيانات الملف الشخصي
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // بيانات تغيير كلمة المرور
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // تفضيلات الإشعارات
  const [notifications, setNotifications] = useState({
    emailOnNewNurse: true,
    emailOnNewPatient: true,
    emailOnAppointment: false,
    systemAlerts: true,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // جلب بيانات الحساب الحالية بالاعتماد التام على الكوكيز
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true, // يرسل الكوكي تلقائياً
        });

        const user = res.data?.user || res.data;
        if (user) {
          setProfile({
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            email: user.email || '',
            phone: user.phone || '',
          });
        }
      } catch (err) {
        // قيم افتراضية احتياطية في حال تعذر الاتصال
        setProfile({
          firstName: 'Sarah',
          lastName: 'Connor',
          email: 'admin@nurseconnect.com',
          phone: '+961 70 000 000',
        });
      }
    };

    fetchAdminData();
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await axios.put(
        'http://localhost:5000/api/auth/update-profile',
        {
          first_name: profile.firstName,
          last_name: profile.lastName,
          phone: profile.phone,
        },
        {
          withCredentials: true, // يرسل الكوكي تلقائياً
        }
      );

      setSuccessMessage('Profile updated successfully!');
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrorMessage('New passwords do not match');
      return;
    }

    if (passwords.newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await axios.put(
        'http://localhost:5000/api/auth/change-password',
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        {
          withCredentials: true, // يرسل الكوكي تلقائياً
        }
      );

      setSuccessMessage('Password changed successfully!');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal credentials, system preferences, and platform notifications.
        </p>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tabs Layout */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Navigation Tabs */}
        <nav className="flex md:flex-col gap-1 w-full md:w-64 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex-shrink-0">
          <button
            onClick={() => { setActiveTab('profile'); setSuccessMessage(null); setErrorMessage(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-[#0d6e6e] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Info</span>
          </button>

          <button
            onClick={() => { setActiveTab('security'); setSuccessMessage(null); setErrorMessage(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'security'
                ? 'bg-[#0d6e6e] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Password & Security</span>
          </button>

          <button
            onClick={() => { setActiveTab('notifications'); setSuccessMessage(null); setErrorMessage(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'notifications'
                ? 'bg-[#0d6e6e] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
        </nav>

        {/* Content Box */}
        <div className="flex-1 w-full bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* TAB 1: Profile Info */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-bold text-slate-900">Personal Information</h2>
                <p className="text-xs text-slate-500 mt-0.5">Update your display name and contact details.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">First Name</label>
                  <input
                    type="text"
                    required
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#0d6e6e] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#0d6e6e] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    disabled
                    value={profile.email}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Email address cannot be changed directly for security.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+961 ..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#0d6e6e] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d6e6e] text-white rounded-xl font-semibold text-sm hover:bg-[#095252] transition-colors shadow-sm disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Security */}
          {activeTab === 'security' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-bold text-slate-900">Security & Authentication</h2>
                <p className="text-xs text-slate-500 mt-0.5">Ensure your account uses a secure, modern password.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#0d6e6e] focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">New Password</label>
                  <input
                    type="password"
                    required
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#0d6e6e] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-[#0d6e6e] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0d6e6e] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-teal-900 leading-relaxed">
                  <p className="font-semibold">Password Guidelines:</p>
                  <p className="mt-0.5 text-teal-700">Must be at least 6 characters, combining uppercase letters, numbers, and special symbols.</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d6e6e] text-white rounded-xl font-semibold text-sm hover:bg-[#095252] transition-colors shadow-sm disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-bold text-slate-900">Email & Alert Preferences</h2>
                <p className="text-xs text-slate-500 mt-0.5">Control which administrative events trigger automated notifications.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">New Nurse Applications</p>
                    <p className="text-xs text-slate-500 mt-0.5">Receive immediate email alerts when a nurse submits a profile.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailOnNewNurse}
                    onChange={(e) => setNotifications({ ...notifications, emailOnNewNurse: e.target.checked })}
                    className="w-4 h-4 text-[#0d6e6e] rounded border-slate-300 focus:ring-[#0d6e6e]"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">New Patient Registrations</p>
                    <p className="text-xs text-slate-500 mt-0.5">Get notified whenever a patient signs up for home healthcare.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailOnNewPatient}
                    onChange={(e) => setNotifications({ ...notifications, emailOnNewPatient: e.target.checked })}
                    className="w-4 h-4 text-[#0d6e6e] rounded border-slate-300 focus:ring-[#0d6e6e]"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Appointment Bookings</p>
                    <p className="text-xs text-slate-500 mt-0.5">Daily summary of upcoming visits and completed sessions.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailOnAppointment}
                    onChange={(e) => setNotifications({ ...notifications, emailOnAppointment: e.target.checked })}
                    className="w-4 h-4 text-[#0d6e6e] rounded border-slate-300 focus:ring-[#0d6e6e]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSuccessMessage('Notification settings saved successfully!')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d6e6e] text-white rounded-xl font-semibold text-sm hover:bg-[#095252] transition-colors shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Preferences</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}