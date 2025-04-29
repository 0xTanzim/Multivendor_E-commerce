import nodemailer from 'nodemailer';
const APP_PASSWORD = process.env.GOOGLE_APP_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kdptanzim0@gmail.com',
    pass: APP_PASSWORD,
  },
});
