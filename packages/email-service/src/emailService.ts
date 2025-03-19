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
  return resend.emails.send({
    from: Email_From ?? 'onboarding@resend.dev',
    to,
    subject,
    react: EmailTemplate({ name, redirectUrl, linkText }),
  });
}
