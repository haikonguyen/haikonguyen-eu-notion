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
  console.log('sendEmail function');

  //TODO: add BE validation
  try {
    await sendgrid.send({
      to: 'haicorp87@gmail.com', // Your email where you'll receive emails
      //TODO: add domain email haikonguyen.eu
      from: 'haicorp87@gmail.com', // your website email address here
      subject: `${body.name} - [Email from haikonguyen.eu]`,
      html: `${getHtmlTemplate(body)}`,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ status: 'Email sent successfully' });
};
export default sendEmail;
