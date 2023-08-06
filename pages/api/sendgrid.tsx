import sendgrid from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
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

//ES8
const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = await JSON.parse(req.body);

  try {
    await sendgrid.send({
      to: 'haicorp87@gmail.com', // Your email where you'll receive emails
      from: 'haicorp87@gmail.com', // your website email address here
      subject: `${body.name} - [Email from haikonguyen.eu]`,
      html: `${getHtmlTemplate(body)}`,
    });
    return res.status(200).json({ message: 'OK' });
  } catch (error: unknown) {
    let message = 'An error occurred';
    let statusCode;

    if (error instanceof Error) {
      message = error.message;
      // if error is an HttpError (for instance from a library you're using), it could potentially have the statusCode property
      if ('statusCode' in error) {
        statusCode = error.statusCode;
      }
    }

    return res.status(statusCode as number).json({ error: message });
  }
};
export default sendEmail;
