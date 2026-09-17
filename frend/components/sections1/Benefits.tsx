
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
    icon: ShieldCheck,
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
    <section className="bg-[#F2F8FC] px-4 py-16 sm:px-6 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#00535B] sm:text-sm">
            Everything You Need
          </p>

          <h2 className="text-2xl font-bold leading-tight text-[#12343B] sm:text-3xl md:text-4xl">
            How NurseConnect Supports You
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            We built every feature with nurses in mind — from profile
            management to secure payments.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="
                  min-h-[180px]
                  rounded-xl
                  border border-gray-100
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  sm:min-h-[190px]
                  md:p-6
                "
              >
                {/* Icon */}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#E6F4F1]">
                  <Icon
                    size={21}
                    strokeWidth={2}
                    className="text-[#00535B]"
                  />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-base font-bold leading-snug text-[#12343B] sm:text-lg">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-6 text-gray-500">
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
