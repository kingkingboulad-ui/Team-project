"use client";

import Button from "@/components/ui/Button"; // Adjust path if needed

export default function ReadyToStart() {
  return (
    <section className="bg-[#00535B] py-16 text-center text-white md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
          Ready to Start?
        </h2>
        
        <p className="mx-auto mt-3 max-w-xl text-xs text-teal-100/90 sm:text-sm">
          Join thousands of nurses who have built rewarding careers through NurseConnect.
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            href="/nurse-register"
            variant="primary"
            className="bg-white text-[#00535B] hover:bg-teal-50 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-md"
          >
            Join as a Nurse Today
          </Button>
        </div>
      </div>
    </section>
  );
}