import Link from "next/link";
import { HeartPulse, Mail, Phone } from "lucide-react";

const columns = [
  {
    title: "FOR PATIENTS",
    links: [
      { href: "/find-nurse", label: "Find a Nurse" },
      { href: "/request-care", label: "Request Care" },
      { href: "/ai-care-assistant", label: "AI Care Assistant" },
      { href: "/how-it-works", label: "How It Works" },
    ],
  },

  {
    title: "FOR NURSES",
    links: [
      { href: "/join-as-nurse", label: "Join as a Nurse" },
      { href: "/nurse-dashboard", label: "Nurse Dashboard" },
      { href: "/how-to-apply", label: "How to Apply" },
      { href: "/nurse-resources", label: "Nurse Resources" },
    ],
  },

  {
    title: "COMPANY",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/safety", label: "Safety & Trust" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1C2E4A] text-white">

      {/* Main Footer */}
      <div className="container-content grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">

        {/* NurseConnect */}
        <div>
          <div className="flex items-center gap-2 font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600">
              <HeartPulse size={18} />
            </span>

            <span>NurseConnect</span>
          </div>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Connecting families with trusted, licensed nurses for compassionate
            in-home care — whenever and wherever it&apos;s needed.
          </p>

          {/* Contact Information */}
          <div className="mt-6 space-y-2 text-sm text-white">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>support@nurseconnect.com</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>1 (800) 555-0199</span>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        {columns.map((col) => (
          <div key={col.title}>

            {/* Column Title */}
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#9FF0FB]">
              {col.title}
            </h3>

            {/* Links */}
            <ul className="mt-4 space-y-3 text-sm text-white">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[#9FF0FB]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Emergency Support under Company */}
            {col.title === "COMPANY" && (
              <div className="mt-8 rounded-xl bg-white p-5">

                <p className="text-sm font-semibold text-gray-900">
                  Emergency Support
                </p>

                <p className="mt-2 text-xl font-bold text-[#9FF0FB]">
                  1-800-NURSE-1
                </p>

                <p className="mt-1 text-xs text-gray-900">
                  AVAILABLE 24/7
                </p>

              </div>
            )}

          </div>
        ))}
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">

        <div className="container-content flex flex-col items-center justify-between gap-4 py-6 text-xs text-white sm:flex-row">

          <p>
            © {new Date().getFullYear()} NurseConnect. All rights reserved.
          </p>

          <div className="flex gap-6">

            <Link
              href="/terms"
              className="hover:text-[#9FF0FB]"
            >
              Terms of Service
            </Link>

            <Link
              href="/privacy"
              className="hover:text-[#9FF0FB]"
            >
              Privacy Policy
            </Link>

          </div>

        </div>
      </div>

    </footer>
  );
}
