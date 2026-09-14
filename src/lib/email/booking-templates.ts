import { escapeHtml } from './escape-html';

export interface BookingEmailCopy {
  name: string;
  email: string;
  slotLabel: string;
}

export function getGuestBookingSubject(): string {
  return 'Booking confirmation — haikonguyen.eu';
}

export function getOwnerBookingSubject(name: string): string {
  return `New booking request from ${name}`;
}

export function getGuestBookingHtml(copy: BookingEmailCopy): string {
  const name = escapeHtml(copy.name);
  const slotLabel = escapeHtml(copy.slotLabel);
  return `
  <div>
    <p>Hi ${name},</p>
    <p>Your call request on haikonguyen.eu is confirmed for:</p>
    <p><strong>${slotLabel}</strong></p>
    <p>If you need to change the time, reply to this email.</p>
  </div>
`;
}

export function getOwnerBookingHtml(copy: BookingEmailCopy): string {
  const name = escapeHtml(copy.name);
  const email = escapeHtml(copy.email);
  const slotLabel = escapeHtml(copy.slotLabel);
  return `
  <div>
    <h1>New booking request</h1>
    <ul>
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Slot: ${slotLabel}</li>
    </ul>
  </div>
`;
}
