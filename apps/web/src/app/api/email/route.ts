import { sendVerificationEmail } from '@repo/email-service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await sendVerificationEmail({
      to: 'kdptanzim0@gmail.com',
      name: 'John',
      redirectUrl: '/verify-email',
    });

    console.log('Email sent successfully:', res);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200, statusText: 'Email sent successfully' }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500, statusText: 'Failed to send email' }
    );
  }
}
