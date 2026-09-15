"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, LogOut } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

type Props = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: "patient" | "nurse" | "admin";
};

const dashboardByRole: Record<string, string> = {
  patient: "/dashboard",
  nurse: "/nurse-dashboard",
  admin: "/admin-dashboard",
};

export default function UserMenu({ name, email, image, role }: Props) {//destructuring ye3ni badel ma ye3mel Props.name mnsta3mel haydi directly 
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);//keremel yerbut ref bi html 
  const dashboardHref = dashboardByRole[role ?? "patient"];//eza fih role btsir btruh aa 
//dashboardByRole["nurse"]=>/nurse-dashboard
// eza ma 3nda chi btkun role null or undefied btsir mnhetu patient 
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);//kl ma nef2us button rah te3mel call la function handleClickOutside

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-expanded={open}
        className="block rounded-full ring-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500"
      >
        <Avatar src={image} name={name} email={email} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-black/5 bg-white py-2 shadow-lg">
          <div className="border-b border-black/5 px-4 py-2">
            <p className="truncate text-sm font-semibold text-navy-900">
		{name ?? "Account"}
		 {/*eza name mawjud mnesta3melu eza laa by default Account*/}
            </p>
            <p className="truncate text-xs text-navy-900/50">{email}</p>
          </div>
          <Link
            href={dashboardHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-800 hover:bg-cloud"
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link> 
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
