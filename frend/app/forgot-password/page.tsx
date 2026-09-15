import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="container-content flex min-h-[480px] flex-col items-center justify-center gap-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-navy-900">Reset Your Password</h1>
        <p className="max-w-sm text-sm text-navy-900/60">
          Not built yet — wire this up to send a reset email once you have a
          real user database (the mock store in{" "}
          <code>lib/users.ts</code> has no email sending).
        </p>
        <Button href="/login" variant="solid">
          Back to Sign In
        </Button>
      </main>
      <Footer />
    </>
  );
}
