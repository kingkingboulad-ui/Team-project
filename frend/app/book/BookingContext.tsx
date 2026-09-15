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
  latitude: 33.8938, // Beirut, Lebanon — same default as LocationMap
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
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<BookingData>(defaultData);
  const [hydrated, setHydrated] = useState(false);

  // Load any in-progress draft on first mount, so a refresh mid-flow
  // doesn't wipe out earlier steps.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
    } catch {
      // ignore malformed/missing storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, hydrated]);

  function update(patch: Partial<BookingData>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function reset() {
    setData(defaultData);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  return (
    <BookingContext.Provider value={{ data, update, reset }}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
