import { DefaultSession } from "next-auth";

type Role = "patient" | "nurse" | "admin";
//hayda file mawjud la y2eli enu role mawjudeh bi user la ts 
declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      role?: Role;
    };
  }

  interface User {
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
  }
}
