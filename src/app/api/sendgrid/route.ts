import { NextRequest, NextResponse } from 'next/server';
import sendgrid from '@sendgrid/mail';
import { EmailBodyProps } from '@app-types/global-types';

sendgrid.setApiKey(`${process.env.SENDGRID_API_KEY}`);

const MAX_MESSAGE_LENGTH = 20_000;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#47;');
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmailBody(body: unknown): body is EmailBodyProps {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === 'string' &&
    typeof b.email === 'string' &&
    typeof b.mailMessage === 'string'
  );
}

const getHtmlTemplate = (body: EmailBodyProps) => {
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
};

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json();

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

    const body: EmailBodyProps = { name, email, mailMessage };

    await sendgrid.send({
      to: 'haicorp87@gmail.com',
      from: 'haicorp87@gmail.com',
      subject: `${name} - [Email from haikonguyen.eu]`,
      html: getHtmlTemplate(body),
    });

    return NextResponse.json({ message: 'OK', status: 200 });
  } catch (error: unknown) {
    let message = 'An error occurred';
    let statusCode = 500;

    if (error instanceof Error) {
      message = error.message;
      if ('statusCode' in error) {
        statusCode = error.statusCode as number;
      }
    }

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
