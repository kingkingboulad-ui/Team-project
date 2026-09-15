import { getServerSession } from "next-auth";
import { CheckCircle2, Clock, MapPin } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { todaysSchedule, nurseStats } from "@/data/nurseDashboard";

export default async function NurseDashboardPage() {
  const session = await getServerSession(authOptions);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="p-8">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">
          Welcome back, {session?.user?.name?.split(" ")[0] ?? "there"}.
        </h1>
        <p className="mt-1 text-sm text-navy-900/50">{today}</p>
      </div>

      {/* Quick stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {nurseStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-2xl font-bold text-teal-700">{stat.value}</p>
            <p className="mt-1 text-xs text-navy-900/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Today's schedule */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-navy-900">Today&apos;s Schedule</h2>
        <ul className="mt-4 divide-y divide-black/5">
          {todaysSchedule.map((visit) => (
            <li key={visit.id} className="flex items-center justify-between gap-4 py-4">
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    visit.status === "completed"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-teal-50 text-teal-700"
                  }`}
                >
                  {visit.status === "completed" ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Clock size={18} />
                  )}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{visit.patientName}</p>
                  <p className="text-xs text-navy-900/50">{visit.careType}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-navy-900">{visit.time}</p>
                <p className="flex items-center justify-end gap-1 text-xs text-navy-900/40">
                  <MapPin size={12} /> {visit.address}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
