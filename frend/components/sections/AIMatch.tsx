import { Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AIMatch() {
  return (
<section
  className="bg-gradient-to-br from-[#0F5C64] to-[#2B7A9F] px-4 py-14 text-white sm:px-6 sm:py-20"
>
      <div className="container-content grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="eyebrow">Powered by AI</span>
          <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-4xl">
            Let AI Help You Find the Right Care
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-teal-100/90 sm:text-base">
            Answer a few quick questions about your care needs and our matching
            engine will surface licensed nurses nearby who fit your schedule,
            budget, and specialty requirements.
          </p>
          <Button href="/ai-match" variant="primary" className="mt-6 sm:mt-8">
            Try AI Matching
          </Button>
        </div>

        <div className="rounded-2xl bg-white p-4 text-navy-900 shadow-xl sm:p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
            <Sparkles size={16} />
            AI Match Summary
          </div>

          <p className="mt-3 text-sm leading-relaxed text-navy-900/70">
            Based on your answers, here&apos;s a caregiver profile tailored to
            your family&apos;s needs.
          </p>

          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex flex-col gap-1 border-b border-black/5 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <dt className="text-navy-900/50">Recommended Care Type</dt>
              <dd className="font-semibold">Post-Surgical Recovery</dd>
            </div>

            <div className="flex flex-col gap-1 border-b border-black/5 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <dt className="text-navy-900/50">Visit Frequency</dt>
              <dd className="font-semibold">Daily, Mornings Preferred</dd>
            </div>

            <div className="flex flex-col gap-1 border-b border-black/5 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <dt className="text-navy-900/50">Matches Nearby</dt>
              <dd className="font-semibold">12 Nurses Available</dd>
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <dt className="text-navy-900/50">Estimated Response</dt>
              <dd className="font-semibold text-teal-700">Under 2 hours</dd>
            </div>
          </dl>

          <Button href="/ai-match" variant="solid" className="mt-6 w-full">
            View My Matches
          </Button>
        </div>
      </div>
    </section>
  );
}