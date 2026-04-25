'use client';

import { FaCalendarAlt } from 'react-icons/fa';

interface BookingFormSuccessProps {
  title: string;
  body: string;
}

export function BookingFormSuccess({ title, body }: BookingFormSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-card p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
        <FaCalendarAlt className="text-2xl text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{body}</p>
    </div>
  );
}
