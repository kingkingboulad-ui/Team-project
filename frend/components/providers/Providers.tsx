"use client";

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LanguageProvider } from '@/context/LanguageContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <LanguageProvider>{children}</LanguageProvider>
      
    </GoogleOAuthProvider>
  );
}