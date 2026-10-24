// Usage: cd server && npm run test-mail
// Sends one test email using the settings in server/.env and prints exactly what Gmail answered.
import { env, isEmailConfigured } from '../config/env.js';
import { sendContactEmail } from '../services/emailService.js';

const mask = (v) => (v ? `${v.slice(0, 3)}***(${v.length} chars)` : '(empty)');
console.log('GMAIL_USER        :', env.gmailUser || '(empty)');
console.log('GMAIL_APP_PASSWORD:', mask(env.gmailAppPassword), '(a Gmail app password is exactly 16 characters)');
console.log('CONTACT_RECEIVER  :', env.contactReceiver || '(empty)');

if (!isEmailConfigured()) {
  console.error('\nNOT CONFIGURED: fill GMAIL_USER, GMAIL_APP_PASSWORD and CONTACT_RECEIVER in server/.env (no quotes, no spaces around =).');
  process.exit(1);
}

try {
  const info = await sendContactEmail({
    name: 'Test User', email: env.gmailUser, phone: '9841800004',
    product: 'Test product', subject: 'Test email from the website', message: 'If you can read this, email sending works.',
  });
  console.log('\nGmail accepted the mail.');
  console.log('accepted:', info.accepted, ' rejected:', info.rejected);
  console.log('response:', info.response);
  console.log('\nNow check the inbox of', env.contactReceiver, '— also Spam and All Mail. If nothing is there, check', env.gmailUser, 'for a "Delivery Status Notification" bounce (means CONTACT_RECEIVER is misspelled).');
} catch (err) {
  console.error('\nFAILED:', err.code || '', err.message);
  if (err.code === 'EAUTH') console.error('-> Gmail rejected the login. Use a 16-character App Password (needs 2-Step Verification), not your normal password, and the same account as GMAIL_USER.');
  if (err.code === 'ECONNECTION' || err.code === 'ETIMEDOUT') console.error('-> Cannot reach smtp.gmail.com:465. Check internet / firewall / antivirus.');
  process.exit(1);
}
