export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "NurseConnect made it so easy to find a caregiver for my mother. The AI matching found someone with dementia care experience within a day.",
    name: "Emily Paul",
    role: "Daughter & Caregiver",
    initials: "EP",
  },
  {
    quote:
      "As a new parent recovering from surgery, having a vetted nurse show up on time, every time, gave our whole family peace of mind.",
    name: "Daniel Martin",
    role: "New Parent",
    initials: "DM",
  },
  {
    quote:
      "The verification process is thorough and it shows. Our nurse was professional, warm, and genuinely invested in my father's recovery.",
    name: "John Roberts",
    role: "Son & Care Coordinator",
    initials: "JR",
  },
];
