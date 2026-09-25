import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}