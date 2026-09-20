// BookingContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type BookingData = {
  preferredNurseId: number | null;
  preferredNurseName: string | null;
  careForId: string | null;
  careForLabel: string | null;
  careTypeId: string | null;
  careTypeLabel: string | null;
  startDate: string;
  careDuration: string;
  careAddress: string;
  latitude: number;
  longitude: number;
  notes: string;
  infoAgreed: boolean;
  termsAgreed: boolean;
};

const defaultData: BookingData = {
  preferredNurseId: null,
  preferredNurseName: null,
  careForId: null,
  careForLabel: null,
  careTypeId: null,
  careTypeLabel: null,
  startDate: "",
  careDuration: "",
  careAddress: "",
  latitude: 33.8938,
  longitude: 35.5018,
  notes: "",
  infoAgreed: false,
  termsAgreed: false,
};

const STORAGE_KEY = "nurseconnect-booking-draft";

type BookingContextValue = {
  data: BookingData;
  update: (patch: Partial<BookingData>) => void;
  reset: () => void;
  isHydrated: boolean;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  // نقرأ مباشرة من sessionStorage في الحالة المبدئية إذا كنا في المتصفح لتجنب وميض الـ null
  const [data, setData] = useState<BookingData>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultData;
  });

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, hydrated]);

  function update(patch: Partial<BookingData>) {
    setData((prev) => {
      const updated = { ...prev, ...patch };
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }

  function reset() {
    setData(defaultData);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <BookingContext.Provider value={{ data, update, reset, isHydrated: hydrated }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}