import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
export default function Testimonials() {
  return (
    <section className="bg-[#F2F8FC] py-20">
      <div className="container-content text-center">
        <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
          Trusted by Thousands of Families
        </h2>

        <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-black/5 bg-cloud p-6"
            >
              <div className="flex gap-0.5 text-amber-400">
				{/*haydi lal 5 stars  */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
			  {/* ldquo hayda bimasel " w tenyeh &rdquo btmsael aakesa */}
              <p className="mt-4 text-sm leading-relaxed text-navy-900/70">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-xs font-semibold text-white">
                  {t.initials}
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-navy-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-navy-900/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
