export type ActivityItem = {
  id: string;
  dotColor: string; // Tailwind bg-* class for the leading dot
  text: string;
  time: string;
};

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    dotColor: "bg-sky-500",
    text: "New nurse application from Elena Torres",
    time: "08:14 AM",
  },
  {
    id: "2",
    dotColor: "bg-red-500",
    text: "Robert Chen submitted urgent care request",
    time: "09:32 AM",
  },
  {
    id: "3",
    dotColor: "bg-emerald-500",
    text: "Maria Santos completed shift — 4 patients",
    time: "10:05 AM",
  },
  {
    id: "4",
    dotColor: "bg-amber-500",
    text: "System: HIPAA audit log generated",
    time: "11:47 AM",
  },
  {
    id: "5",
    dotColor: "bg-amber-500",
    text: "Priya Nair updated leave status",
    time: "12:20 PM",
  },
];

export const systemStatusChecks = ["HIPAA Compliant", "SSL Secured", "Backup Status"];

export type PendingAction = {
  label: string;
  count: number;
  color: string; // Tailwind text-* class
};

export const pendingActions: PendingAction[] = [
  { label: "Nurse applications", count: 3, color: "text-teal-700" },
  { label: "Unassigned requests", count: 2, color: "text-red-600" },
  { label: "Expiring credentials", count: 5, color: "text-amber-600" },
];
