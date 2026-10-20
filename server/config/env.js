import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  gmailUser: process.env.GMAIL_USER || '',
  gmailAppPassword: (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, ''),
  contactReceiver: process.env.CONTACT_RECEIVER || '',
  isProd: process.env.NODE_ENV === 'production',
};

const PLACEHOLDERS = ['your-business-email@gmail.com', 'your-gmail-app-password'];

export const isEmailConfigured = () =>
  Boolean(env.gmailUser && env.gmailAppPassword && env.contactReceiver) &&
  !PLACEHOLDERS.includes(env.gmailUser) &&
  !PLACEHOLDERS.includes(env.gmailAppPassword);
