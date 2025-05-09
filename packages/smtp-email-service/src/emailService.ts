import { render } from '@react-email/render';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';
import EmailTemplate from './template/email-template';

interface MailOptions {
  to: string;
  subject: string;
  name: string;
  linkText: string;
  redirectUrl: string;
  description: string;
}

@injectable()
export class MailService {
  private transporter: Transporter | null = null;

  // Lazy initialization of the transporter
  private getTransporter(): Transporter {
    if (!this.transporter) {
      const user = process.env.EMAIL_USER;
      const pass = process.env.GOOGLE_APP_PASSWORD;

      if (!user || !pass) {
        throw new Error('Missing email credentials in environment variables');
      }

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
      });
    }
    return this.transporter;
  }

  constructor() {
    // Don't initialize transporter in the constructor
    // We'll initialize it lazily when needed
  }

  async sendMail(options: MailOptions) {
    try {
      const htmlContent = await render(
        EmailTemplate({
          name: options.name,
          linkText: options.linkText,
          redirectUrl: options.redirectUrl,
          description: options.description,
          Subject: options.subject,
        })
      );

      const transporter = this.getTransporter();
      const info = await transporter.sendMail({
        from: `"MindFuel" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: htmlContent,
      });

      console.log(`📧 Email sent to ${options.to}:`, info.messageId);
      return info;
    } catch (error) {
      console.error('❌ Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendVerificationEmail({
    to,
    name,
    redirectUrl,
  }: {
    to: string;
    name: string;
    redirectUrl: string;
  }) {
    return this.sendMail({
      to,
      name,
      redirectUrl,
      linkText: 'Verify Now',
      subject: 'Verify Your Email',
      description:
        'Thank you for creating an account with us. Click the link below to verify your account.',
    });
  }

  async sendForgotPasswordEmail({
    to,
    name,
    redirectUrl,
  }: {
    to: string;
    name: string;
    redirectUrl: string;
  }) {
    return this.sendMail({
      to,
      name,
      redirectUrl,
      linkText: 'Reset Password',
      subject: 'Reset Your Password',
      description: 'Click the link below to reset your password.',
    });
  }
}
