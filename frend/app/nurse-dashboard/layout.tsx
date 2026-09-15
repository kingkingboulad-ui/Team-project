import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardSidebar, {
  type SidebarNavItem,
} from "@/components/dashboard/DashboardSidebar";

const navItems: SidebarNavItem[] = [
  {
    href: "/nurse-dashboard",
    label: "Today's Schedule",
    icon: "overview",
  },
  {
    href: "/nurse-dashboard/requests",
    label: "Requests",
    icon: "requests",
  },
  {
    href: "/nurse-dashboard/earnings",
    label: "Earnings",
    icon: "earnings",
  },
  {
    href: "/nurse-dashboard/profile",
    label: "Profile",
    icon: "profile",
  },
];

export default async function NurseDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen bg-cloud">
      <DashboardSidebar
        portalLabel="Nurse Portal"
        navItems={navItems}
        userName={session?.user?.name}
        userSubtitle="Registered Nurse"
        userImage={session?.user?.image}
      />

      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}