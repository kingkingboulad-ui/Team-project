"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
	
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-black/5"
    >
      Sign Out
    </button>
  );
}
