import type { EmailBodyProps } from '@app-types/global-types';
import { escapeHtml, sendMail } from '@lib/email';
import { NextRequest, NextResponse } from 'next/server';

const MAX_MESSAGE_LENGTH = 20_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmailBody(body: unknown): body is EmailBodyProps {
  if (!body || typeof body !== 'object') {
    return false;
  }
  if (!('name' in body) || !('email' in body) || !('mailMessage' in body)) {
    return false;
  }
  return (
    typeof body.name === 'string' &&
    typeof body.email === 'string' &&
    typeof body.mailMessage === 'string'
  );
}

function getHtmlTemplate(body: EmailBodyProps): string {
  const name = escapeHtml(body.name);
  const email = escapeHtml(body.email);
  const message = escapeHtml(body.mailMessage);
  return `
  <div>
    <h1>You have got an e-mail</h1>
    <ul>
      <li>User Name: ${name}</li>
      <li>User Email: ${email}</li>
      <li>User Message: ${message}</li>
    </ul>
  </div>
`;
}

export async function POST(request: NextRequest) {
  try {
    const raw: unknown = await request.json();

    if (!validateEmailBody(raw)) {
      return NextResponse.json(
        {
          error:
            'Invalid request body: name, email, and mailMessage are required.',
        },
        { status: 400 },
      );
    }

    const name = raw.name.trim();
    const email = raw.email.trim();
    const mailMessage = raw.mailMessage.trim();

    if (!name || !email || !mailMessage) {
      return NextResponse.json(
        { error: 'Name, email, and message must be non-empty.' },
        { status: 400 },
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 },
      );
    }

    if (mailMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be at most ${MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 },
      );
    }

    const result = await sendMail({
      to: 'haicorp87@gmail.com',
      subject: `${name} - [Email from haikonguyen.eu]`,
      html: getHtmlTemplate({ name, email, mailMessage }),
      replyTo: email,
    });

    if (result.skipped || !result.ok) {
      return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }

    return NextResponse.json({ message: 'OK', status: 200 });
  } catch {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
