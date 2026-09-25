import { cookies } from "next/headers";
import SettingsClient from "./SettingsClient";

interface AdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

async function getAdminData(): Promise<AdminProfile> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      const res = await fetch("http://localhost:5000/api/admin/profile", {
        headers: {
          Cookie: `token=${token}`,
        },
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        const user = data?.user || data;
        return {
          firstName: user?.first_name || "",
          lastName: user?.last_name || "",
          email: user?.email || "",
          phone: user?.phone || "",
        };
      }
    } catch (err) {
      console.error("Error fetching admin data on server:", err);
    }
  }

  // محاولة قراءة البيانات من الكوكي المباشر إن وجد
  const userCookie = cookieStore.get("user")?.value;
  if (userCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(userCookie));
      return {
        firstName: parsed?.first_name || "",
        lastName: parsed?.last_name || "",
        email: parsed?.email || "",
        phone: parsed?.phone || "",
      };
    } catch {
      // fallback
    }
  }

  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };
}

export default async function SettingsPage() {
  const initialProfile = await getAdminData();

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal credentials, system preferences, and platform notifications.
        </p>
      </div>

      <SettingsClient initialProfile={initialProfile} />
    </div>
  );
}