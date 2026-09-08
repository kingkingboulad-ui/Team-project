import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { nurses } from "@/data/nurses";
import Button from "@/components/ui/Button";

export default function MeetNurses() {
  return (
    <section className="bg-[#F2F8FC] py-20">
      <div className="container-content">
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow-light">Our Team</span>
            <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">
              Meet Our Nurses
            </h2>
          </div>
          <Link
            href="/nurses"
            className="hidden text-sm font-semibold text-teal-700 hover:underline sm:block"
          >
            View All Nurses →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {nurses.map((nurse) => (
            <div
              key={nurse.id}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={nurse.photo}
                  alt={nurse.name}
                  fill
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-teal-700">
                  {nurse.available}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-navy-900">{nurse.name}</h3>
                    <p className="text-xs text-navy-900/50">{nurse.credential}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium text-teal-700">
                  {nurse.specialty}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {nurse.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-teal-50 px-2.5 py-1 text-xs text-teal-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{nurse.rating}</span>
                    <span className="text-navy-900/40">({nurse.reviews})</span>
                  </div>
                  <Button
                    href={`/nurses/${nurse.id}`}
                    variant="solid"
                    className="px-4 py-2 text-xs"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
