import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeJwtPayload(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. استثناء صفحة تسجيل الدخول للأدمن
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // 2. فحص مسار /admin وأي مسار فرعي تحته
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const token = request.cookies.get("token")?.value;

    console.log("🔒 Admin Middleware Triggered for:", pathname);
    console.log("🔑 Found Token?:", Boolean(token));

    // إذا لم يكن هناك توكن
    if (!token) {
      console.log("❌ No token found. Redirecting to /admin/login");
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const payload = decodeJwtPayload(token);
    console.log("👤 Token Role:", payload?.role);

    // إذا كان التوكن غير صالح أو الدور ليس admin
    if (!payload || payload.role !== "admin") {
      console.log("⛔ Not an admin! Redirecting to /admin/login");
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// المطابقة الصريحة للمسار /admin وكل تفرعاته
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};