import * as z from 'zod';

const mailValidationSchema = z.object({
  name: z.string().max(70).nonempty({ message: 'Please fill your name' }),
  email: z
    .string()
    .max(255)
    .email({ message: 'Please fill proper email address' }),
  mailMessage: z.string().nonempty({ message: 'Please type your message' }),
});

export default mailValidationSchema;
