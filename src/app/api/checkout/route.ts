import { buildInquiryEmailHtml } from '@lib/checkout/build-inquiry-email';
import { checkoutInquirySchema } from '@lib/checkout/checkout-inquiry-schema';
import { CHECKOUT_OWNER_EMAIL } from '@lib/checkout/constants';
import { NextResponse } from 'next/server';

async function trySendInquiryEmail(html: string, subject: string) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return false;
  }

  try {
    const sendgrid = await import('@sendgrid/mail');
    sendgrid.default.setApiKey(apiKey);
    await sendgrid.default.send({
      to: CHECKOUT_OWNER_EMAIL,
      from: CHECKOUT_OWNER_EMAIL,
      subject,
      html,
    });
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = checkoutInquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid checkout payload' },
      { status: 400 },
    );
  }

  const inquiry = parsed.data;
  const html = buildInquiryEmailHtml(inquiry);
  const emailSent = await trySendInquiryEmail(
    html,
    `${inquiry.name} - [Checkout inquiry from haikonguyen.eu]`,
  );

  return NextResponse.json({
    ok: true,
    mode: emailSent ? 'email' : 'local',
    emailSent,
  });
}
