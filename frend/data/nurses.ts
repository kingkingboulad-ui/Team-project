export type Nurse = {
  id: string;
  name: string;
  credential: string;
  specialty: string;
  tags: string[];
  rating: number;
  reviews: number;
  photo: string;
  available: string;
};

export const nurses: Nurse[] = [
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    credential: "RN, BSN",
    specialty: "Geriatric Care",
    tags: ["Dementia Care", "Medication Mgmt"],
    rating: 4.9,
    reviews: 127,
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=faces",
    available: "Available Today",
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    credential: "LPN",
    specialty: "Post-Surgical Care",
    tags: ["Wound Care", "IV Therapy"],
    rating: 4.8,
    reviews: 98,
    photo:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=faces",
    available: "Available This Week",
  },
  {
    id: "jasmine-torres",
    name: "Jasmine Torres",
    credential: "RN, MSN",
    specialty: "Pediatric Care",
    tags: ["Newborn Care", "Chronic Illness"],
    rating: 5.0,
    reviews: 154,
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces",
    available: "Available Today",
  },
];
