import { Bell, Plus, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { recentActivity, systemStatusChecks, pendingActions } from "@/data/adminOverview";

export default function AdminOverviewPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Overview</h1>
          <p className="mt-1 text-sm text-navy-900/50">{today}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600 hover:bg-amber-100"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <Button variant="solid" className="text-sm">
            <Plus size={16} /> New Request
          </Button>
        </div>
      </div>

      {/* Body grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Recent Activity */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-navy-900">Recent Activity</h2>
            <button type="button" className="text-sm font-medium text-teal-700 hover:underline">
              View all
            </button>
          </div>
          <ul className="mt-4 divide-y divide-black/5">
            {recentActivity.map((item) => (
              <li key={item.id} className="flex items-start gap-3 py-3.5">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.dotColor}`} />
                <div>
                  <p className="text-sm text-navy-900">{item.text}</p>
                  <p className="mt-0.5 text-xs text-navy-900/40">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-br from-teal-700 to-teal-900 p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-100/70">
              System Status
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              All systems operational
            </p>
            <ul className="mt-4 space-y-2.5 border-t border-white/10 pt-4 text-sm">
              {systemStatusChecks.map((check) => (
                <li key={check} className="flex items-center justify-between">
                  <span className="text-teal-50/90">{check}</span>
                  <CheckCircle2 size={16} className="text-emerald-300" />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-900/40">
              Pending Actions
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {pendingActions.map((action) => (
                <li key={action.label} className="flex items-center justify-between">
                  <span className="text-navy-900/70">{action.label}</span>
                  <span className={`font-semibold ${action.color}`}>{action.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-teal-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700/70">
              Emergency Support
            </p>
            <p className="mt-1 text-lg font-bold text-teal-900">1-800-NURSE-1</p>
            <p className="mt-0.5 text-xs text-teal-700/60">Available 24/7</p>
          </div>
        </div>
      </div>
    </main>
  );
}
