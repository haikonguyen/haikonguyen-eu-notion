import { NextRequest, NextResponse } from 'next/server';
import sendgrid from '@sendgrid/mail';
import { EmailBodyProps } from 'global-types';

sendgrid.setApiKey(`${process.env.SENDGRID_API_KEY}`);

const getHtmlTemplate = (body: EmailBodyProps) => `
  <div>
    <h1>You have got an e-mail</h1>
    <ul>
      <li>User Name: ${body.name}</li>
      <li>User Email: ${body.email}</li>
      <li>User Message: ${body.mailMessage}</li>
    </ul>
  </div>
`;

export async function POST(request: NextRequest) {
  try {
    const body: EmailBodyProps = await request.json();

    await sendgrid.send({
      to: 'haicorp87@gmail.com',
      from: 'haicorp87@gmail.com',
      subject: `${body.name} - [Email from haikonguyen.eu]`,
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
