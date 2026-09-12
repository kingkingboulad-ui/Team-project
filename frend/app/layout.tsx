import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NurseConnect — Trusted Care, When You Need It",
  description:
    "Find vetted, compassionate in-home nurses matched to your family's needs with NurseConnect.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="font-sans">
         <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
