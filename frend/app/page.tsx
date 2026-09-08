import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import AIMatch from "@/components/sections/AIMatch";
import MeetNurses from "@/components/sections/MeetNurses";
import CareYouCanTrust from "@/components/sections/CareYouCanTrust";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <AIMatch />
        <MeetNurses />
        <CareYouCanTrust />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
