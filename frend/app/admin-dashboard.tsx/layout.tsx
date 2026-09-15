import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardSidebar, {
  type SidebarNavItem,
} from "@/components/dashboard/DashboardSidebar";

const navItems: SidebarNavItem[] = [
  {
    href: "/admin-dashboard",
    label: "Overview",
    icon: "overview",
  },
  {
    href: "/admin-dashboard/nurses",
    label: "Nurses",
    icon: "nurses",
  },
  {
    href: "/admin-dashboard/patients",
    label: "Patients",
    icon: "patients",
  },
  {
    href: "/admin-dashboard/requests",
    label: "Requests",
    icon: "requests",
  },
  {
    href: "/admin-dashboard/reports",
    label: "Reports",
    icon: "reports",
  },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen bg-cloud">
      <DashboardSidebar
        portalLabel="Admin Portal"
        navItems={navItems}
        userName={session?.user?.name}
        userSubtitle="System Administrator"
        userImage={session?.user?.image}
      />

      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}