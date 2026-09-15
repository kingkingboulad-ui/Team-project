"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  HeartPulse,
  LogOut,
  LayoutGrid,
  Users,
  UserRound,
  Inbox,
  BarChart3,
  Wallet,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";

export type SidebarNavItem = {
  href: string;
  label: string;
  icon:
    | "overview"
    | "nurses"
    | "patients"
    | "requests"
    | "reports"
    | "earnings"
    | "profile";
};

const icons = {
  overview: LayoutGrid,
  nurses: Users,
  patients: UserRound,
  requests: Inbox,
  reports: BarChart3,
  earnings: Wallet,
  profile: UserRound,
};

export default function DashboardSidebar({
  portalLabel,
  navItems,
  userName,
  userSubtitle,
  userImage,
}: {
  portalLabel: string;
  navItems: SidebarNavItem[];
  userName?: string | null;
  userSubtitle: string;
  userImage?: string | null;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-navy-950 text-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-500/30 text-teal-400">
          <HeartPulse size={18} />
        </span>

        <div className="leading-tight">
          <p className="text-sm font-bold">NurseConnect</p>

          <p className="text-[10px] uppercase tracking-wide text-white/40">
            {portalLabel}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = pathname === item.href;

          const Icon = icons[item.icon];

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-teal-700 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar
            src={userImage}
            name={userName}
            size={32}
          />

          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold">
              {userName ?? "Account"}
            </p>

            <p className="truncate text-xs text-white/40">
              {userSubtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-2 flex w-full items-center gap-2 px-2 py-1.5 text-sm text-white/50 hover:text-white"
        >
          <LogOut size={14} />

          Back to Login
        </button>
      </div>
    </aside>
  );
}