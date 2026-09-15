export type BaseNurse = {
  id: number;
  name: string;
  role: string;
  rate: string;
  location: string;
  experience: string;
  rating: string;
  reviews: string;
  tags: string[];
  image: string;
};

export type EducationItem = {
  title: string;
  place: string;
  period: string;
  current?: boolean;
};

export type Review = {
  name: string;
  date: string;
  rating: number;
  text: string;
};

export type NurseProfile = BaseNurse & {
  languages: string[];
  availableNow: boolean;
  certifications: string[];
  bio: string;
  education: EducationItem[];
  availability: Record<string, string[]>; // day -> list of time-slot labels
  testimonials: Review[];
};

/**
 * Base directory — this is the data you already had. Add/replace photos in
 * /public/images and drop the paths in here; everything else on the
 * profile page (bio, certifications, education, availability, reviews) is
 * generated from these fields by `toProfile()` below so you don't have to
 * hand-write 21 biographies. Override any generated field per-nurse by
 * adding it directly to that nurse's object here (e.g. add a `bio: "..."`
 * property and it'll be used instead of the generated one).
 */
export const nursesData: BaseNurse[] = [
  {
    id: 1,
    name: "Sarah Haddad",
    role: "Registered Nurse",
    rate: "$65",
    location: "San Jose, CA",
    experience: "15 yrs",
    rating: "5",
    reviews: "189",
    tags: ["Elderly Care", "Cardiac Care", "Disability Support"],
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "David Thompson",
    role: "Registered Nurse",
    rate: "$45",
    location: "San Francisco, CA",
    experience: "8 yrs",
    rating: "4.9",
    reviews: "127",
    tags: ["Elderly Care", "Post-Surgery", "Medication Support"],
    image: "/images/nurse2.png",
  },
  {
    id: 3,
    name: "Lisa Park",
    role: "Home Health Aide",
    rate: "$65",
    location: "Palo Alto, CA",
    experience: "7 yrs",
    rating: "4.8",
    reviews: "112",
    tags: ["Post-Surgery Care", "Medication Support"],
    image: "/images/nurses1.png",
  },
  {
    id: 4,
    name: "Maria Santos",
    role: "Licensed Practical Nurse",
    rate: "$52",
    location: "Oakland, CA",
    experience: "12 yrs",
    rating: "4.5",
    reviews: "99",
    tags: ["Elderly Care", "Cardiac Care", "Wound Care"],
    image: "/images/nurses3.png",
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "Licensed Practical Nurse",
    rate: "$52",
    location: "Oakland, CA",
    experience: "8 yrs",
    rating: "4.5",
    reviews: "99",
    tags: ["Elderly Care", "Mental Health Support"],
    image: "/images/Aisha.png",
  },
  {
    id: 6,
    name: "Sami Okonkwo",
    role: "Certified Nursing Assistant",
    rate: "$52",
    location: "Berkeley, CA",
    experience: "5 yrs",
    rating: "4.5",
    reviews: "99",
    tags: ["Daily Assistance", "Mobility Assistance"],
    image: "/images/sami.png",
  },
  {
    id: 7,
    name: "Emily Johnson",
    role: "Registered Nurse",
    rate: "$58",
    location: "San Jose, CA",
    experience: "10 yrs",
    rating: "4.9",
    reviews: "156",
    tags: ["Palliative Care", "Elderly Care", "Companionship"],
    image: "/images/emily.png",
  },
  {
    id: 8,
    name: "Michael Brown",
    role: "Registered Nurse",
    rate: "$60",
    location: "San Francisco, CA",
    experience: "11 yrs",
    rating: "4.8",
    reviews: "143",
    tags: ["Post-Surgery", "Wound Care", "Medication Support"],
    image: "/images/michel.png",
  },
  {
    id: 9,
    name: "Sophia Wilson",
    role: "Licensed Practical Nurse",
    rate: "$48",
    location: "Palo Alto, CA",
    experience: "6 yrs",
    rating: "4.7",
    reviews: "91",
    tags: ["Disability Support", "Daily Assistance", "Mobility Assistance"],
    image: "/images/sophia.png",
  },
  {
    id: 10,
    name: "Daniel Miller",
    role: "Certified Nursing Assistant",
    rate: "$42",
    location: "Oakland, CA",
    experience: "5 yrs",
    rating: "4.6",
    reviews: "78",
    tags: ["Companionship", "Daily Assistance", "Elderly Care"],
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "Olivia Martinez",
    role: "Registered Nurse",
    rate: "$62",
    location: "Berkeley, CA",
    experience: "13 yrs",
    rating: "5",
    reviews: "201",
    tags: ["Medication Support", "Cardiac Care", "Post-Surgery"],
    image: "/images/olivia.png",
  },
  {
    id: 12,
    name: "James Anderson",
    role: "Registered Nurse",
    rate: "$55",
    location: "San Mateo, CA",
    experience: "9 yrs",
    rating: "4.8",
    reviews: "134",
    tags: ["Mental Health Support", "Companionship", "Disability Support"],
    image: "/images/james.png",
  },
  {
    id: 13,
    name: "Nora Williams",
    role: "Registered Nurse",
    rate: "$59",
    location: "San Jose, CA",
    experience: "9 yrs",
    rating: "4.9",
    reviews: "145",
    tags: ["Elderly Care", "Palliative Care", "Medication Support"],
    image: "/images/nora.png",
  },
  {
    id: 14,
    name: "Daniel Carter",
    role: "Registered Nurse",
    rate: "$57",
    location: "Oakland, CA",
    experience: "8 yrs",
    rating: "4.8",
    reviews: "121",
    tags: ["Post-Surgery Care", "Wound Care", "Daily Assistance"],
    image: "/images/danielcarter.png",
  },
  {
    id: 15,
    name: "Emma Davis",
    role: "Home Health Aide",
    rate: "$46",
    location: "Berkeley, CA",
    experience: "6 yrs",
    rating: "4.7",
    reviews: "88",
    tags: ["Companionship", "Elderly Care", "Daily Assistance"],
    image: "/images/emma.png",
  },
  {
    id: 16,
    name: "Maya Robinson",
    role: "Registered Nurse",
    rate: "$68",
    location: "San Francisco, CA",
    experience: "14 yrs",
    rating: "4.9",
    reviews: "176",
    tags: ["Post-Surgery", "Palliative Care", "Wound Care"],
    image: "/images/Maya.png",
  },
  {
    id: 17,
    name: "Noah Williams",
    role: "Registered Nurse",
    rate: "$50",
    location: "San Jose, CA",
    experience: "7 yrs",
    rating: "4.6",
    reviews: "104",
    tags: ["Medication Support", "Daily Assistance", "Elderly Care"],
    image: "/images/nowa.png",
  },
  {
    id: 18,
    name: "Grace Lee",
    role: "Licensed Practical Nurse",
    rate: "$54",
    location: "Palo Alto, CA",
    experience: "10 yrs",
    rating: "4.8",
    reviews: "119",
    tags: ["Disability Support", "Companionship", "Mental Health Support"],
    image: "/images/lee.png",
  },
  {
    id: 19,
    name: "Ethan Moore",
    role: "Certified Nursing Assistant",
    rate: "$44",
    location: "Oakland, CA",
    experience: "4 yrs",
    rating: "4.5",
    reviews: "67",
    tags: ["Daily Assistance", "Mobility Assistance", "Companionship"],
    image: "/images/ethan.png",
  },
  {
    id: 20,
    name: "Chloe Taylor",
    role: "Registered Nurse",
    rate: "$63",
    location: "Berkeley, CA",
    experience: "12 yrs",
    rating: "4.9",
    reviews: "162",
    tags: ["Cardiac Care", "Medication Support", "Elderly Care"],
    image: "/images/chloe.png",
  },
  {
    id: 21,
    name: "Ayman Harris",
    role: "Registered Nurse",
    rate: "$56",
    location: "San Mateo, CA",
    experience: "8 yrs",
    rating: "4.7",
    reviews: "113",
    tags: ["Post-Surgery Care", "Medication Support", "Daily Assistance"],
    image: "/images/Ayman.png",
  },
];

/** Which license/certification line to lead with, based on role. */
function licenseFor(role: string): string {
  if (role.includes("Registered Nurse")) return "RN License (Verified)";
  if (role.includes("Licensed Practical")) return "LPN License (Verified)";
  if (role.includes("Certified Nursing")) return "CNA Certification (Verified)";
  return "HHA Certification (Verified)";
}

function firstName(fullName: string) {
  return fullName.split(" ")[0];
}

const defaultAvailability: Record<string, string[]> = {
  Mon: ["8:00 AM", "2:00 PM"],
  Tue: ["9:00 AM"],
  Wed: ["8:00 AM", "1:00 PM"],
  Thu: ["9:00 AM", "3:00 PM"],
  Fri: ["8:00 AM", "12:00 PM"],
  Sat: ["10:00 AM"],
  Sun: [],
};

const reviewerPool = [
  { name: "Emily Chen", text: "attentive, professional, and genuinely caring." },
  { name: "Robert Kim", text: "very knowledgeable and helped our family through a hard transition." },
  { name: "Anna Williams", text: "punctual, thorough, and incredibly compassionate with my grandmother." },
];

/** Fills in profile-page content from the base fields, unless a nurse already has it set. */
export function toProfile(nurse: BaseNurse & Partial<NurseProfile>): NurseProfile {
  const years = parseInt(nurse.experience, 10) || 5;
  const primaryTag = nurse.tags[0] ?? "patient care";
  const secondaryTag = nurse.tags[1] ?? "daily support";

  return {
    languages: nurse.languages ?? ["English"],
    availableNow: nurse.availableNow ?? true,
    certifications:
      nurse.certifications ??
      [
        licenseFor(nurse.role),
        "CPR & AED Certified",
        `${primaryTag} Specialist`,
        "Background Check Cleared",
        "HIPAA Compliance",
      ],
    bio:
      nurse.bio ??
      `${nurse.name} is a dedicated ${nurse.role} with ${nurse.experience} of experience in ` +
        `${primaryTag.toLowerCase()} and ${secondaryTag.toLowerCase()}, serving families in and ` +
        `around ${nurse.location}. ${firstName(nurse.name)} takes a warm, patient-first approach ` +
        `to every visit, focused on comfort, safety, and clear communication with families.`,
    education:
      nurse.education ??
      [
        {
          title: `Senior Home Care Specialist`,
          place: "NurseConnect",
          period: `${2024 - Math.min(years, 4)} – Present`,
          current: true,
        },
        {
          title: "Home Care Nurse",
          place: "Bay Area Home Health Services",
          period: `${2024 - Math.min(years, 8)} – ${2024 - Math.min(years, 4)}`,
        },
        {
          title: "Clinical Rotation",
          place: `${nurse.location.split(",")[0]} Medical Center`,
          period: `${2024 - years}`,
        },
        {
          title: `Bachelor of Science in Nursing`,
          place: "University of California",
          period: `${2024 - years - 4}`,
        },
      ],
    availability: nurse.availability ?? defaultAvailability,
    testimonials:
      nurse.testimonials ??
      reviewerPool.map((r, i) => ({
        name: r.name,
        date: `${["March", "February", "January"][i]} ${20 - i}, ${2026 - i}`,
        rating: 5 - (i === 2 ? 0 : 0),
        text: `${firstName(nurse.name)} was ${r.text}`,
      })),
    ...nurse,
  };
}

export function getNurseById(id: number): NurseProfile | undefined {
  const base = nursesData.find((n) => n.id === id);
  return base ? toProfile(base) : undefined;
}
