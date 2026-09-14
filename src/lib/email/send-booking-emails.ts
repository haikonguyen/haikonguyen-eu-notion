import { formatBookingSlotRange } from '@lib/booking/availability';
import {
  getGuestBookingHtml,
  getGuestBookingSubject,
  getOwnerBookingHtml,
  getOwnerBookingSubject,
} from './booking-templates';
import { getBookingNotifyEmail, isSendgridConfigured } from './constants';
import { sendMail } from './send-mail';

export interface BookingEmailPayload {
  name: string;
  email: string;
  startIso: string;
  endIso: string;
}

export interface SendBookingEmailsResult {
  sent: boolean;
  skipped: boolean;
}

export async function sendBookingEmails(
  payload: BookingEmailPayload,
): Promise<SendBookingEmailsResult> {
  if (!isSendgridConfigured()) {
    return { sent: false, skipped: true };
  }

  const slotLabel = formatBookingSlotRange(payload.startIso, payload.endIso);
  const copy = {
    name: payload.name,
    email: payload.email,
    slotLabel,
  };
  const notifyEmail = getBookingNotifyEmail();

  const [guest] = await Promise.all([
    sendMail({
      to: payload.email,
      subject: getGuestBookingSubject(),
      html: getGuestBookingHtml(copy),
      replyTo: notifyEmail,
    }),
    sendMail({
      to: notifyEmail,
      subject: getOwnerBookingSubject(payload.name),
      html: getOwnerBookingHtml(copy),
      replyTo: payload.email,
    }),
  ]);

  return {
    sent: guest.ok && !guest.skipped,
    skipped: false,
  };
}
