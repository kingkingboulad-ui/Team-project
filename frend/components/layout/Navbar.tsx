"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HeartPulse, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown,
  Stethoscope,
  Settings,
  Globe
} from "lucide-react";
import Button from "@/components/ui/Button";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "nurse" | "user" | "patient" | string;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { lang, toggleLang, t } = useLanguage();

  const links = [
    { href: "/", label: t("home") || "Home" },
    { href: "/find-a-nurses", label: t("findNurse") || "Find A Nurses" },
    { href: "/for-nurses", label: t("forNurses") || "For Nurses" },
    { href: "/Ai-care-assistant", label: t("aiAssistant") || "AI Care Assistant" },
  ];

  // التحقق من حالة المصادقة
  const checkAuth = useCallback(async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      const currentUser = res.data?.user || res.data;
      if (currentUser && currentUser.id) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();

    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [checkAuth, pathname]);

  // إغلاق القائمة المنسدلة عند الضغط في الخارج
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // تسجيل الخروج
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout", 
        {}, 
        { withCredentials: true }
      );
    } catch {
      // المتابعة حتى عند حدوث خطأ
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.clear();
        sessionStorage.clear();
      }
      setUser(null);
      setProfileDropdown(false);
      setOpen(false);
      window.location.href = "/Sign-in";
    }
  };

  // رابط الملف الشخصي
  const getProfileLink = () => {
    if (user?.role === "admin") return "/admin";
    if (user?.role === "nurse") return "/profile";
    return "/patient-profile";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 font-bold text-[#00535B] transition-colors duration-200 hover:text-[#00737D]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00535B] text-white transition-colors duration-200 hover:bg-[#00737D]">
            <HeartPulse size={18} />
          </span>
          <span>NurseConnect</span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#E6F7F8] text-[#00535B]"
                    : "text-slate-700 hover:bg-[#E6F7F8] hover:text-[#00535B]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* ================= LANGUAGE SWITCHER (DESKTOP & TABLET) ================= */}
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-[#00535B]"
            title={lang === "en" ? "تبديل إلى العربية" : "Switch to English"}
          >
            <Globe size={14} className="text-[#00535B]" />
            <span>{lang === "en" ? "عربي" : "EN"}</span>
          </button>

          {!loading && (
            <>
              {user ? (
                /* إذا كان المستخدم مسجلاً */
                <div className="relative hidden md:block" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setProfileDropdown((prev) => !prev)}
                    className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-2.5 pr-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00535B] text-xs font-bold text-white uppercase">
                      {user.first_name ? user.first_name[0] : <User size={14} />}
                    </div>
                    <span className="max-w-[110px] truncate">{user.first_name}</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </button>

                  {profileDropdown && (
                    <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2.5 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{user.email}</p>
                        <span className="mt-1.5 inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-[#00535B] border border-teal-100">
                          {user.role}
                        </span>
                      </div>

                      <div className="py-1">
                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setProfileDropdown(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <LayoutDashboard size={15} className="text-[#00535B]" />
                            <span>{t("adminDashboard") || "Admin Dashboard"}</span>
                          </Link>
                        )}

                        <Link
                          href={getProfileLink()}
                          onClick={() => setProfileDropdown(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <User size={15} className="text-[#00535B]" />
                          <span>{t("myProfile") || "My Profile"}</span>
                        </Link>

                        {user.role === "nurse" && (
                          <Link
                            href="/profile"
                            onClick={() => setProfileDropdown(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <Stethoscope size={15} className="text-[#00535B]" />
                            <span>{t("nurseWorkspace") || "Nurse Workspace"}</span>
                          </Link>
                        )}

                        {user.role === "admin" && (
                          <Link
                            href="/admin/settings"
                            onClick={() => setProfileDropdown(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <Settings size={15} className="text-[#00535B]" />
                            <span>{t("systemSettings") || "System Settings"}</span>
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut size={15} />
                          <span>{t("signOut") || "Sign Out"}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* إذا لم يكن مسجل دخوله */
                <Link
                  href="/Sign-in"
                  className={`hidden rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 md:block ${
                    pathname === "/Sign-in"
                      ? "bg-[#E6F7F8] text-[#00535B]"
                      : "text-slate-700 hover:bg-[#E6F7F8] hover:text-[#00535B]"
                  }`}
                >
                  {t("signIn") || "Sign In"}
                </Link>
              )}
            </>
          )}

          {/* ================= GET STARTED ================= */}
          <Button
            href="/find-a-nurses"
            variant="solid"
            className="hidden md:inline-flex bg-[#00535B] text-sm text-white hover:bg-[#00737D] transition-colors"
          >
            {t("getStarted") || "Get Started"}
          </Button>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors duration-200 hover:bg-[#E6F7F8] hover:text-[#00535B] md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="border-t border-black/5 bg-white md:hidden animate-in slide-in-from-top-2 duration-150">
          <nav className="container-content flex flex-col gap-1 py-4">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#E6F7F8] text-[#00535B]"
                      : "text-slate-700 hover:bg-[#E6F7F8] hover:text-[#00535B]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {user ? (
              <>
                <div className="my-2 border-t border-slate-100 pt-3 px-4">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t("signedInAs") || "Signed in as"}</p>
                  <p className="text-sm font-bold text-slate-900">{user.first_name} {user.last_name}</p>
                  <span className="text-[10px] font-semibold text-[#00535B]">{user.email}</span>
                </div>

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#E6F7F8] hover:text-[#00535B] flex items-center gap-2"
                  >
                    <LayoutDashboard size={16} className="text-[#00535B]" />
                    <span>{t("adminDashboard") || "Admin Dashboard"}</span>
                  </Link>
                )}

                <Link
                  href={getProfileLink()}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#E6F7F8] hover:text-[#00535B] flex items-center gap-2"
                >
                  <User size={16} className="text-[#00535B]" />
                  <span>{t("myProfile") || "My Profile"}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left rounded-lg px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut size={16} />
                  <span>{t("signOut") || "Sign Out"}</span>
                </button>
              </>
            ) : (
              <Link
                href="/Sign-in"
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  pathname === "/Sign-in"
                    ? "bg-[#E6F7F8] text-[#00535B]"
                    : "text-slate-700 hover:bg-[#E6F7F8] hover:text-[#00535B]"
                }`}
              >
                {t("signIn") || "Sign In"}
              </Link>
            )}

            <div className="pt-2">
              <Button
                href="/find-a-nurses"
                variant="solid"
                className="w-full bg-[#00535B] text-sm text-white hover:bg-[#00737D]"
                onClick={() => setOpen(false)}
              >
                {t("getStarted") || "Get Started"}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}