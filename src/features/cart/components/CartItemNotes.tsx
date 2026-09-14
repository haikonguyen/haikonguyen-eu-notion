'use client';

import { CART_NOTES_MAX_LENGTH } from '@features/cart/constants';
import { useTranslations } from 'next-intl';

interface CartItemNotesProps {
  notes?: string;
  onChange: (notes: string) => void;
}

export function CartItemNotes({ notes, onChange }: CartItemNotesProps) {
  const t = useTranslations('Cart');

  return (
    <label className="mt-4 block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
        {t('notesLabel')}
      </span>
      <textarea
        value={notes ?? ''}
        onChange={(event) => onChange(event.target.value)}
        maxLength={CART_NOTES_MAX_LENGTH}
        rows={2}
        placeholder={t('notesPlaceholder')}
        className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:border-primary/50 focus:outline-none"
      />
    </label>
  );
}
