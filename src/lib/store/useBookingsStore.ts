'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  BookingKind,
  BookingStatus,
  type ClientBooking,
} from './booking-types';

const BOOKINGS_STORAGE_KEY = 'haiko-bookings';

interface BookingsState {
  bookings: ClientBooking[];
  addBooking: (booking: ClientBooking) => void;
  updateStatus: (id: string, status: BookingStatus) => void;
}

export const useBookingsStore = create<BookingsState>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (booking) => {
        const existing = get().bookings.filter(
          (item) => item.id !== booking.id,
        );
        set({ bookings: [booking, ...existing] });
      },
      updateStatus: (id, status) => {
        set({
          bookings: get().bookings.map((item) =>
            item.id === id ? { ...item, status } : item,
          ),
        });
      },
    }),
    {
      name: BOOKINGS_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export type { ClientBooking };
export { BookingKind, BookingStatus };
