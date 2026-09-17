
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

const links = [
  { href: "/", label: "Home" },
  { href: "/find-a-nurses", label: "Find A Nurses" },
  { href: "/for-nurses", label: "For Nurses" },
  { href: "/Ai-care-assistant", label: "AI Care Assistant" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">

      <div className="container-content flex h-16 items-center justify-between">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="
            flex items-center gap-2
            font-bold
            text-[#00535B]
            transition-colors duration-200
            hover:text-[#00737D]
          "
        >
          <span
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg
              bg-[#00535B]
              text-white
              transition-colors duration-200
              hover:bg-[#00737D]
            "
          >
            <HeartPulse size={18} />
          </span>

          <span>NurseConnect</span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden items-center gap-3 md:flex">

          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  rounded-lg
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-[#E6F7F8] text-[#00535B]"
                      : "text-navy-800 hover:bg-[#E6F7F8] hover:text-[#00535B]"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}

        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-4">

          {/* Sign In */}
          <Link
            href="/Sign-in"
            className={`
              hidden
              rounded-lg
              px-4
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-200
              md:block

              ${
                pathname === "/Sign-in"
                  ? "bg-[#E6F7F8] text-[#00535B]"
                  : "text-navy-800 hover:bg-[#E6F7F8] hover:text-[#00535B]"
              }
            `}
          >
            Sign In
          </Link>

          {/* ================= GET STARTED ================= */}
          <Button
  href="/book"
  variant="solid"
  className="
    hidden
    md:inline-flex
    bg-[#00535B]
    text-sm
    text-white
    hover:bg-[#00535B]
    hover:text-white
    active:bg-[#00535B]
    active:text-white
    active:scale-100
    focus:bg-[#00535B]
    focus:text-white
    focus:outline-none
    focus:ring-0
    transition-none
  "
>
  Get Started
</Button>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              text-navy-800
              transition-colors
              duration-200
              hover:bg-[#E6F7F8]
              hover:text-[#00535B]
              md:hidden
            "
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="border-t border-black/5 bg-white md:hidden">

          <nav className="container-content flex flex-col gap-1 py-4">

            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`
                    rounded-lg
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-[#E6F7F8] text-[#00535B]"
                        : "text-navy-800 hover:bg-[#E6F7F8] hover:text-[#00535B]"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Sign In */}
            <Link
              href="/Sign-in"
              onClick={() => setOpen(false)}
              className={`
                rounded-lg
                px-4
                py-3
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  pathname === "/Sign-in"
                    ? "bg-[#E6F7F8] text-[#00535B]"
                    : "text-navy-800 hover:bg-[#E6F7F8] hover:text-[#00535B]"
                }
              `}
            >
              Sign In
            </Link>

            {/* Mobile Get Started */}
            <Button
              href="/book"
              variant="solid"
              className="
                mt-2
                w-full
                bg-[#00535B]
                text-sm
                text-white
                transition-colors
                duration-200
                hover:bg-[#00535B]
                hover:text-white
                active:bg-[#00535B]
                active:text-white
              "
              onClick={() => setOpen(false)}
            >
              Get Started
            </Button>

          </nav>
        </div>
      )}

    </header>
  );
}
