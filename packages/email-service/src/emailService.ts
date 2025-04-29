const ResendApiKey = process.env.RESEND_API_KEY;
const Email_From = process.env.EMAIL_FROM;

if (!ResendApiKey) {
  throw new Error('Missing Resend API key');
}
import { Resend } from 'resend';
import EmailTemplate from './template/email-template';

const resend = new Resend(ResendApiKey);

export async function sendVerificationEmail({
  to,
  name,
  redirectUrl,
  linkText = 'Verify Now',
  subject = 'Verify your email',
}: {
  to: string;
  name: string;
  redirectUrl: string;
  linkText?: string;
  subject?: string;
}) {
  let description =
    'Thank you, for Creating an Account with Us. We request you to click on the link Below to verify your Account. Thank you!';

  return resend.emails.send({
    from: Email_From ?? 'onboarding@resend.dev',
    to,
    subject,
    react: EmailTemplate({ name, redirectUrl, linkText, description }),
  });
}

export async function sendEmail({
  to,
  name,
  redirectUrl,
  linkText = 'Click Here',
  subject,
  description,
}: {
  to: string;
  name: string;
  redirectUrl: string;
  linkText?: string;
  subject: string;
  description: string;
}) {
  return resend.emails.send({
    from: Email_From ?? 'onboarding@resend.dev',
    to,
    subject,
    react: EmailTemplate({ name, redirectUrl, linkText, description }),
  });
}
