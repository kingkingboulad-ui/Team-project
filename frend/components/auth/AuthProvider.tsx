"use client";
//bs client ye3mel signin by email and password NextAuth bte3ti session 
//w SessionProvider bt5ali hal ma3lumet enable la be2i components tenyeh  
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}