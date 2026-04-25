'use client';

import { FaPaperPlane } from 'react-icons/fa';

interface ContactFormSuccessProps {
  title: string;
  body: string;
  actionLabel: string;
  onReset: () => void;
}

export function ContactFormSuccess({
  title,
  body,
  actionLabel,
  onReset,
}: ContactFormSuccessProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-white/10 bg-card p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
        <FaPaperPlane className="text-2xl text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{body}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 font-medium text-primary hover:underline"
      >
        {actionLabel}
      </button>
    </div>
  );
}
