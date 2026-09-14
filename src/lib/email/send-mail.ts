import sendgrid from '@sendgrid/mail';
import { getSendgridApiKey, getSendgridFromEmail } from './constants';

export interface SendMailInput {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export type SendMailResult =
  | { ok: true; skipped: false }
  | { ok: true; skipped: true }
  | { ok: false; skipped: false };

let isApiKeyApplied = false;

function applyApiKey(): boolean {
  const apiKey = getSendgridApiKey();
  if (!apiKey) {
    return false;
  }
  if (!isApiKeyApplied) {
    sendgrid.setApiKey(apiKey);
    isApiKeyApplied = true;
  }
  return true;
}

export async function sendMail(input: SendMailInput): Promise<SendMailResult> {
  if (!applyApiKey()) {
    return { ok: true, skipped: true };
  }

  try {
    await sendgrid.send({
      to: input.to,
      from: getSendgridFromEmail(),
      subject: input.subject,
      html: input.html,
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
    });
    return { ok: true, skipped: false };
  } catch {
    return { ok: false, skipped: false };
  }
}
