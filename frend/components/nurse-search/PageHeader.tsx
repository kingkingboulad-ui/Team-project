"use client";

export default function PageHeader() {
  return (
    <section className="w-full bg-transparent">
      <div className="mx-auto max-w-7xl px-7 pt-8 pb-5 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Find a Nurse
        </h1>

        <p className="mt-2 text-base text-slate-600 sm:text-lg">
          Find qualified nurses who can provide the care you need.
        </p>
      </div>
    </section>
  );
}