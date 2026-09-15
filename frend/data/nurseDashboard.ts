export type ScheduleVisit = {
  id: string;
  patientName: string;
  time: string;
  careType: string;
  address: string;
  status: "upcoming" | "completed";
};

export const todaysSchedule: ScheduleVisit[] = [
  {
    id: "1",
    patientName: "Robert Chen",
    time: "9:00 AM",
    careType: "Post-Surgical Check-in",
    address: "142 Oak Street",
    status: "completed",
  },
  {
    id: "2",
    patientName: "Maria Gonzalez",
    time: "11:30 AM",
    careType: "Medication Management",
    address: "88 River Rd",
    status: "upcoming",
  },
  {
    id: "3",
    patientName: "Frank Delgado",
    time: "2:00 PM",
    careType: "Wound Care",
    address: "17 Elm Court",
    status: "upcoming",
  },
];

export const nurseStats = [
  { label: "Today's Visits", value: "3" },
  { label: "This Week", value: "14" },
  { label: "Rating", value: "4.9" },
  { label: "New Requests", value: "2" },
];
