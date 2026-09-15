'use client';

import { BookingStatus, useBookingsStore } from '@lib/store/useBookingsStore';
import { Download, History } from 'lucide-react';
import { useTranslations } from 'next-intl';

const HISTORY_STATUSES = new Set([
  BookingStatus.Completed,
  BookingStatus.Cancelled,
]);

export function AccountHistoryPanel() {
  const t = useTranslations('Account');
  const bookings = useBookingsStore((state) => state.bookings);
  const history = bookings.filter((item) => HISTORY_STATUSES.has(item.status));

  return (
    <section className="rounded-3xl border border-glass-border bg-glass-surface p-6 backdrop-blur-xl">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
        <History size={18} className="text-primary" />
        <span>{t('historyTitle')}</span>
      </h3>
      {history.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t('historyEmpty')}</p>
      ) : (
        <ul className="space-y-3">
          {history.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-glass-border bg-background/30 p-4"
            >
              <div>
                <p className="text-sm font-bold text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t(`status.${item.status}`)}
                </p>
              </div>
              {item.invoiceUrl ? (
                <a
                  href={item.invoiceUrl}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary"
                >
                  <Download size={14} />
                  {t('downloadInvoice')}
                </a>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {t('invoicePending')}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
