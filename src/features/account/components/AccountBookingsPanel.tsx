'use client';

import { BookingStatus, useBookingsStore } from '@lib/store/useBookingsStore';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ACTIVE_STATUSES = new Set([
  BookingStatus.Confirmed,
  BookingStatus.Pending,
  BookingStatus.InReview,
]);

export function AccountBookingsPanel() {
  const t = useTranslations('Account');
  const bookings = useBookingsStore((state) => state.bookings);
  const updateStatus = useBookingsStore((state) => state.updateStatus);
  const upcoming = bookings.filter((item) => ACTIVE_STATUSES.has(item.status));

  return (
    <section className="rounded-3xl border border-glass-border bg-glass-surface p-6 backdrop-blur-xl">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
        <Calendar size={18} className="text-primary" />
        <span>{t('upcomingBookings')}</span>
      </h3>
      {upcoming.length === 0 ? (
        <div className="rounded-2xl border border-glass-border bg-background/40 p-6 text-center">
          <p className="text-sm text-muted-foreground">{t('noBookings')}</p>
          <Link
            href="/services"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
          >
            <span>{t('bookSession')}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {upcoming.map((booking) => (
            <li
              key={booking.id}
              className="rounded-2xl border border-glass-border bg-background/30 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {booking.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(booking.startIso).toLocaleString()}
                  </p>
                  <span className="mt-2 inline-flex rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {t(`status.${booking.status}`)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="text-[11px] font-semibold text-primary"
                    onClick={() =>
                      updateStatus(booking.id, BookingStatus.Pending)
                    }
                  >
                    {t('reschedule')}
                  </button>
                  <button
                    type="button"
                    className="text-[11px] font-semibold text-red-400"
                    onClick={() =>
                      updateStatus(booking.id, BookingStatus.Cancelled)
                    }
                  >
                    {t('cancelBooking')}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
