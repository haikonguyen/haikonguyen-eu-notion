export const DEFAULT_SENDGRID_FROM_EMAIL = 'haicorp87@gmail.com';
export const DEFAULT_BOOKING_NOTIFY_EMAIL = 'haicorp87@gmail.com';

export function getSendgridApiKey(): string {
  return process.env.SENDGRID_API_KEY?.trim() ?? '';
}

export function isSendgridConfigured(): boolean {
  return getSendgridApiKey().length > 0;
}

export function getSendgridFromEmail(): string {
  return process.env.SENDGRID_FROM_EMAIL?.trim() || DEFAULT_SENDGRID_FROM_EMAIL;
}

export function getBookingNotifyEmail(): string {
  return (
    process.env.BOOKING_NOTIFY_EMAIL?.trim() || DEFAULT_BOOKING_NOTIFY_EMAIL
  );
}
