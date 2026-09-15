import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections1/Hero";
import Benefits from "@/components/sections1/Benefits";
import HowToJoin from "@/components/sections1/HowToJoin";
import ReadyToStart from "@/components/sections1/ready-to-start";
import Footer from "@/components/layout/Footer"

export default function ForNursesPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Benefits />
      <HowToJoin />
      <ReadyToStart />
	  <Footer/>
    </main>
  );
}