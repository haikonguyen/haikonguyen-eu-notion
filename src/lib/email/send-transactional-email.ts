import sendgrid from '@sendgrid/mail';
import {
  EmailDispatchMode,
  TRANSACTIONAL_FROM_EMAIL,
  TRANSACTIONAL_TO_EMAIL,
} from './constants';

export interface TransactionalEmailInput {
  subject: string;
  html: string;
  replyTo?: string;
}

export interface TransactionalEmailResult {
  ok: boolean;
  mode: EmailDispatchMode;
}

export function isSendgridConfigured(): boolean {
  return Boolean(process.env.SENDGRID_API_KEY?.trim());
}

export async function sendTransactionalEmail(
  input: TransactionalEmailInput,
): Promise<TransactionalEmailResult> {
  if (!isSendgridConfigured()) {
    return { ok: true, mode: EmailDispatchMode.Local };
  }

  sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? '');
  await sendgrid.send({
    to: TRANSACTIONAL_TO_EMAIL,
    from: TRANSACTIONAL_FROM_EMAIL,
    replyTo: input.replyTo,
    subject: input.subject,
    html: input.html,
  });

  return { ok: true, mode: EmailDispatchMode.Sendgrid };
}
