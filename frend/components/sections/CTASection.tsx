import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="bg-[#006D77] py-20 text-center text-white">
    
	  <div className="container-content">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to Find Trusted Care?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-teal-100/90">
          Join thousands of families who trust NurseConnect for compassionate,
          verified in-home nursing care.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/get-started" variant="primary">
            Get Started Today
          </Button>
          <Button href="/for-nurses" variant="outline">
            Join as a Nurse
          </Button>
        </div>
      </div>
    </section>
  );
}
