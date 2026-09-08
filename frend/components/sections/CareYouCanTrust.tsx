import {
  ShieldCheck,
  Star,
  Leaf,
  MessageCircle,
  Lock,
  BadgeCheck,
} from "lucide-react";
import { trustFeatures } from "@/data/content";

const icons = {
  "shield-check": ShieldCheck,
  star: Star,
  leaf: Leaf,
  "message-circle": MessageCircle,
  lock: Lock,
  "badge-check": BadgeCheck,
};

export default function CareYouCanTrust() {
  return (
    <section className="bg-cloud py-20">
      <div className="container-content text-center">
        <span className="eyebrow-light">Why Families Choose Us</span>
        <h2 className="mt-3 text-2xl font-bold text-navy-900 sm:text-3xl">
          Care You Can Trust.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-navy-900/60">
          Every nurse on NurseConnect is verified, rated, and ready to provide
          the standard of care your family deserves.
        </p>

        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
			{/*bel content.ts 3na {
  icon: "shield-check",
  title: "Background-Verified",
fa ye3ni feature.icon value la ela feature.icon
} */}
          {trustFeatures.map((feature) => {
            const Icon = icons[feature.icon as keyof typeof icons];
            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-semibold text-navy-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-navy-900/60">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
