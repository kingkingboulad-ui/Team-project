"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MessageSquare,
  Plus,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";

const sarahImage =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop";

const upcomingBookings = [
  {
    name: "Sarah Haddad",
    date: "Today, Aug 29",
    time: "9:00 AM – 1:00 PM",
    type: "Post-Surgery Care",
    status: "Confirmed",
    statusColor: "text-emerald-600",
    image: sarahImage,
  },
  {
    name: "Maria Santos",
    date: "Wed, Sep 1",
    time: "2:00 PM – 6:00 PM",
    type: "Medication Support",
    status: "Confirmed",
    statusColor: "text-emerald-600",
    image: "https://i.pravatar.cc/60?img=32",
  },
  {
    name: "Lisa Park",
    date: "Fri, Sep 3",
    time: "10:00 AM – 2:00 PM",
    type: "Mobility Assistance",
    status: "Pending",
    statusColor: "text-red-500",
    image: "https://i.pravatar.cc/60?img=44",
  },
];

const messages = [
  {
    name: "Sarah Haddad",
    text: "Good morning! I'm on my way, should be there soon.",
    time: "8:42 AM",
    image: sarahImage,
  },
  {
    name: "NurseConnect",
    text: "Your booking for September 1 has been confirmed.",
    time: "Yesterday",
    image: null,
  },
  {
    name: "Maria Santos",
    text: "I have reviewed the medication checklist.",
    time: "Yesterday",
    image: "https://i.pravatar.cc/60?img=32",
  },
];

const carePlan = [
  {
    title: "Morning Medication",
    time: "8:00 AM",
    completed: true,
  },
  {
    title: "Physical Exercises",
    time: "10:00 AM",
    completed: true,
  },
  {
    title: "Wound-Dressing Check",
    time: "11:00 AM",
    completed: true,
  },
  {
    title: "Lunch Assistance",
    time: "12:30 PM",
    completed: false,
  },
  {
    title: "Afternoon Medication",
    time: "2:00 PM",
    completed: false,
  },
  {
    title: "Evening Vitals",
    time: "5:00 PM",
    completed: false,
  },
];

const favoriteNurses = [
  {
    name: "Sarah Haddad",
    rating: "4.9",
    reviews: "120",
    image: sarahImage,
  },
  {
    name: "Maria Santos",
    rating: "4.8",
    reviews: "96",
    image: "https://i.pravatar.cc/60?img=32",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F1F8FB]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[23px] font-bold leading-7 text-[#092F35] sm:text-[28px]">
              Good morning, James 👋
            </h1>

            <p className="mt-1.5 text-[11px] text-gray-500 sm:text-sm">
              Here is your care overview for today.
            </p>
          </div>

          <Link
            href="/book"
            className="flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-[#006D77] px-5 text-[11px] font-semibold text-white transition hover:bg-[#00535B] sm:w-auto sm:text-xs"
          >
            <Plus size={14} />
            Request Care
          </Link>
        </div>

        {/* ================= STATISTICS ================= */}
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">

          {/* Upcoming Bookings */}
          <div className="rounded-lg border border-[#E5EEF0] bg-white p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#DDF7F5] text-[#006D77]">
              <CalendarDays size={15} />
            </div>

            <p className="mt-2.5 text-xl font-bold text-[#092F35]">
              3
            </p>

            <p className="text-[11px] text-gray-500 sm:text-xs">
              Upcoming Bookings
            </p>
          </div>

          {/* Current Nurse */}
          <div className="rounded-lg border border-[#E5EEF0] bg-white p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:p-4">
            <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-100">
              <img
                src={sarahImage}
                alt="Sarah Haddad"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <p className="mt-2.5 truncate text-[14px] font-bold text-[#092F35]">
              Sarah H.
            </p>

            <p className="text-[11px] text-gray-500 sm:text-xs">
              Current Nurse
            </p>
          </div>

          {/* Care Hours */}
          <div className="rounded-lg border border-[#E5EEF0] bg-white p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#E7F4FF] text-[#1976A8]">
              <Clock3 size={15} />
            </div>

            <p className="mt-2.5 text-xl font-bold text-[#092F35]">
              48 hrs
            </p>

            <p className="text-[11px] text-gray-500 sm:text-xs">
              Care Hours This Month
            </p>
          </div>

          {/* Messages */}
          <div className="rounded-lg border border-[#E5EEF0] bg-white p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#FFEAEA] text-[#E55B5B]">
              <MessageSquare size={15} />
            </div>

            <p className="mt-2.5 text-xl font-bold text-[#092F35]">
              1
            </p>

            <p className="text-[11px] text-gray-500 sm:text-xs">
              Unread Message
            </p>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">

          {/* ================= LEFT COLUMN ================= */}
          <div className="space-y-5 lg:col-span-8">

            {/* Today's Appointment */}
            <section className="overflow-hidden rounded-lg border border-[#D9E9EB] bg-white">

              <div className="flex flex-col gap-2 bg-[#007B80] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[10px] font-medium uppercase tracking-wide text-white sm:text-[11px]">
                  Today&apos;s Appointment
                </p>

                <span className="w-fit rounded-full bg-white/20 px-2.5 py-1 text-[8px] font-medium text-white sm:text-[9px]">
                  Post-Surgery Care
                </span>
              </div>

              <div className="bg-[#006D77] p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                  {/* Sarah */}
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white/40 sm:h-16 sm:w-16">
                      <img
                        src={sarahImage}
                        alt="Sarah Haddad"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-base font-bold text-white sm:text-lg">
                        Sarah Haddad
                      </h2>

                      <p className="text-[10px] text-white/80 sm:text-xs">
                        Registered Nurse
                      </p>

                      <p className="mt-1 text-[9px] text-white/80 sm:text-[10px]">
                        ◷ 9:00 AM – 1:00 PM
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex w-full gap-2 sm:w-auto">
                    <button
                      type="button"
                      className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md bg-white/10 px-3 text-[10px] font-medium text-white transition hover:bg-white/20 sm:flex-none"
                    >
                      <MessageSquare size={11} />
                      Message
                    </button>

                    <Link
                      href="/dashboard/care-plan"
                      className="flex h-9 flex-1 items-center justify-center rounded-md bg-white px-4 text-[10px] font-semibold text-[#006D77] transition hover:bg-gray-50 sm:flex-none"
                    >
                      View Care Plan
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Upcoming Bookings */}
            <section className="rounded-lg border border-[#E1ECEE] bg-white p-4 sm:p-5">

              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#092F35] sm:text-[15px]">
                  Upcoming Bookings
                </h2>

                <Link
                  href="/dashboard/bookings"
                  className="text-[9px] font-medium text-[#3BA56A] sm:text-[10px]"
                >
                  Find More →
                </Link>
              </div>

              <div className="space-y-2">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.name}
                    className="flex flex-col gap-2.5 rounded-md border border-[#EEF3F4] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100">
                        <img
                          src={booking.image}
                          alt={booking.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[10px] font-semibold text-[#17363B] sm:text-xs">
                          {booking.name}
                        </p>

                        <p className="truncate text-[8px] text-gray-500 sm:text-[9px]">
                          {booking.date} • {booking.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[8px] text-gray-500 sm:text-[9px]">
                        {booking.type}
                      </span>

                      <span
                        className={`text-[8px] font-semibold sm:text-[9px] ${booking.statusColor}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Active Care Plan */}
            <section className="rounded-lg border border-[#E1ECEE] bg-white p-4 sm:p-5">

              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#092F35] sm:text-[15px]">
                  Active Care Plan
                </h2>

                <Link
                  href="/dashboard/care-plan"
                  className="text-[9px] font-medium text-[#006D77] sm:text-[10px]"
                >
                  View Plan →
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {carePlan.map((item) => (
                  <div
                    key={item.title}
                    className="min-h-[72px] rounded-md border border-[#E8EFF0] bg-white p-2.5"
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        item.completed
                          ? "text-[#177A73]"
                          : "text-gray-300"
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        <span className="h-3.5 w-3.5 rounded-full border border-gray-300" />
                      )}
                    </div>

                    <p className="mt-1.5 text-[10px] font-semibold leading-4 text-[#17363B] sm:text-[11px]">
                      {item.title}
                    </p>

                    <p className="mt-0.5 text-[9px] text-gray-400">
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="space-y-5 lg:col-span-4">

            {/* Messages */}
            <section className="rounded-lg border border-[#E1ECEE] bg-white p-4 sm:p-5">

              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#092F35] sm:text-[15px]">
                  Messages
                </h2>

                <Link
                  href="/messages"
                  className="text-[9px] font-medium text-[#006D77] sm:text-[10px]"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-2.5">
                {messages.map((message) => (
                  <div
                    key={message.name}
                    className="flex gap-2.5 border-b border-gray-100 pb-2.5 last:border-0 last:pb-0"
                  >
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#E8F7F8]">
                      {message.image ? (
                        <img
                          src={message.image}
                          alt={message.name}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[9px] font-bold text-[#006D77]">
                          NC
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2">
                        <p className="truncate text-[10px] font-semibold text-[#17363B] sm:text-[11px]">
                          {message.name}
                        </p>

                        <span className="shrink-0 text-[7px] text-gray-400 sm:text-[8px]">
                          {message.time}
                        </span>
                      </div>

                      <p className="mt-0.5 line-clamp-2 text-[9px] leading-4 text-gray-500 sm:text-[10px]">
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/messages"
                className="mt-3 block text-center text-[9px] font-semibold text-[#006D77] sm:text-[10px]"
              >
                View All Messages
              </Link>
            </section>

            {/* AI Care Assistant */}
            <section className="rounded-lg bg-[#006D77] p-4 text-white sm:p-5">

              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10">
                  <Sparkles size={15} />
                </div>

                <h2 className="text-base font-bold">
                  AI Care Assistant
                </h2>
              </div>

              <p className="mt-2.5 text-[10px] leading-4 text-white/80 sm:text-[11px]">
                Need help adjusting your care plan? Ask our AI for
                recommendations.
              </p>

              <Link
                href="/ai-match"
                className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-md bg-white/10 text-[10px] font-medium text-white transition hover:bg-white/20"
              >
                Open AI Assistant
                <ArrowRight size={11} />
              </Link>
            </section>

            {/* Favorite Nurses */}
            <section className="rounded-lg border border-[#E1ECEE] bg-white p-4 sm:p-5">

              <h2 className="mb-3.5 text-sm font-bold text-[#092F35] sm:text-[15px]">
                Favorite Nurses
              </h2>

              <div className="space-y-3">
                {favoriteNurses.map((nurse) => (
                  <div
                    key={nurse.name}
                    className="flex items-center gap-2.5"
                  >
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                      <img
                        src={nurse.image}
                        alt={nurse.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-semibold text-[#17363B] sm:text-[11px]">
                        {nurse.name}
                      </p>

                      <p className="text-[8px] text-gray-500 sm:text-[9px]">
                        ⭐ {nurse.rating} · {nurse.reviews} reviews
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/nurses"
                className="mt-3 block text-center text-[9px] font-semibold text-[#006D77] sm:text-[10px]"
              >
                Browse All Nurses →
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}