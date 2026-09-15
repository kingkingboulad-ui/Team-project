"use client";

import {
  UserRoundPlus,
  CalendarDays,
  HeartPulse,
  MessageSquare,
  WalletCards,
  ShieldCheck,
  Award,
  LayoutGrid,
} from "lucide-react";

const benefits = [
  {
    icon: UserRoundPlus,
    title: "Create Your Profile",
    description:
      "Build a professional profile highlighting your qualifications, specializations, and experience in nursing.",
  },
  {
    icon: CalendarDays,
    title: "Set Your Availability",
    description:
      "You're in control. Set your own schedule and only accept requests that fit your availability.",
  },
  {
    icon: HeartPulse,
    title: "Choose Your Care Types",
    description:
      "Specialize in the areas you're most skilled in. Focus on patients you can genuinely help.",
  },
  {
    icon: MessageSquare,
    title: "Receive Care Requests",
    description:
      "Patients in your area can send you care requests that match your professional specializations.",
  },
  {
    icon: MessageSquare,
    title: "Communicate Securely",
    description:
      "Use our encrypted messaging system to coordinate with clients and families safely.",
  },
  {
    icon: WalletCards,
    title: "Track Your Earnings",
    description:
      "Transparent, weekly payouts. View your earnings history and manage your finances all in one place.",
  },
  {
    icon: Award,
    title: "Build Your Reputation",
    description:
      "Collect verified reviews from patients. Great care leads to more bookings and higher rates.",
  },
  {
    icon: LayoutGrid,
    title: "Manage Bookings",
    description:
      "A simple, clean dashboard to manage all your appointments and patient information.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-[#F2F8FC] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[#00535B]">
            Everything You Need
          </p>

          <h2 className="text-2xl font-bold text-[#12343B] md:text-3xl">
            How NurseConnect Supports You
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-gray-600">
            We built every feature with nurses in mind — from profile
            management to secure payments.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="min-h-[105px] rounded-md border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Icon */}
                <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#E6F4F1]">
                  <Icon
                    size={12}
                    strokeWidth={2}
                    className="text-[#00535B]"
                  />
                </div>

                {/* Title */}
                <h3 className="mb-1 text-[11px] font-bold text-[#12343B]">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-[8px] leading-[1.5] text-gray-500">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}