"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeartPulse, Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import axios from "axios";
//hun esta3malna useState btkun false par default lal Menu kermel phone bikun Menu hidden w eza kenet fu2 size md btsir btebayen
//bel Mobile rah tkun hk ☰ w bel desktop rah tkun tabi3iyeh metel hk Home   Find A Nurses   For Nurses   AI Care Assistant
const links = [
  { href: "/", label: "Home" },
  { href: "/find-a-nurses", label: "Find A Nurses" },
  { href: "/for-nurses", label: "For Nurses" },
  { href: "/Ai-care-assistant", label: "AI Care Assistant" },
];
//sticky top-0 ye3ni bidal Navbar sebet w nne7na aam ne3mel scroll 
///z-50 bi5ali fu2 be2i 3anaser 
//bg-white/90 background white bi 90%
//backdrop-blur bi8awesh muhtawa li mawjud wara navbar
//container-content mwjud bel css w hatin margin 
export default function Navbar() {
  const [open, setOpen] = useState(false);


  // useEffect(()=>{
  //    const fetchData = async () => {

  //     const res = await axios.get(
  //       "http://localhost:5000/api/auth/me",
  //       {
  //         withCredentials: true
  //       }
  //     );
  //     console.log(res.data.user.name);
  //    }
  //    fetchData();
  
  // },[]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-[#00535B]"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00535B] text-white">
            <HeartPulse size={18} />
          </span>
          <span>NurseConnect</span>
        </Link>
        {/* Desktop nav links — hidden below md */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-navy-800 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.href === "/"
                  ? "rounded-full bg-cyan-50 px-5 py-3 text-[#00535B]"
                  : "transition-colors hover:text-[#00535B]"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
   
          <Link
            href="/Sign-in"
            className="hidden text-sm font-semibold text-navy-800 hover:text-[#00535B] md:block"
          >
            Sign In
          </Link>

          <Button
            href="/get-started"
            variant="solid"
            className="hidden bg-[#00535B] text-sm text-white hover:bg-[#00454B] md:inline-flex"
          >
            Get Started
          </Button>

          {/* Hamburger toggle — only shown below md */}
          {/*open = false
      ↓
    ☰ Menu*/}
          {/*open = true
      ↓
         ✕ X*/}
        
          {/*aria-label ma3mul asesan la ye3mel accessibility ta3ref chu waizfet zer */}	  
          {/*aria- expanded bye3ti state  menu  eza open or no  */}	  
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}//hun eza F =>T w aakes 
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-800 hover:bg-black/5 md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {/* md:hidden eza sar md aw aktar btkhtefi */}
      {open && (
        <div className="border-t border-black/5 bg-white md:hidden">
          <nav className="container-content flex flex-col gap-1 py-4">
            {/*hun eza f2asti aa aya wehdeh bel Menu rah tsaker Menu w tkhtefi  */}
            {links.map((link) => (
            
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-navy-800 hover:bg-cloud hover:text-[#00535B]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/Sign-in"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-sm font-medium text-navy-800 hover:bg-cloud hover:text-[#00535B]"
            >
              Sign in
            </Link>

            <Button
              href="/get-started"
              variant="solid"
              className="mt-2 w-full bg-[#00535B] text-sm text-white hover:bg-[#00454B]"
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