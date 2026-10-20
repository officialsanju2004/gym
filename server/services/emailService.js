import nodemailer from 'nodemailer';
import { env, isEmailConfigured } from '../config/env.js';
import { escapeHtml } from '../utils/validate.js';

let transporter;
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: env.gmailUser, pass: env.gmailAppPassword },
    });
  }
  return transporter;
};

export async function sendContactEmail(data) {
  if (!isEmailConfigured()) {
    const err = new Error('Email is not configured on the server.');
    err.code = 'EMAIL_NOT_CONFIGURED';
    throw err;
  }

  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'long' });
  const row = (label, value) =>
    `<tr><td style="padding:8px 12px;color:#666;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:8px 12px;color:#111">${escapeHtml(value)}</td></tr>`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px">
      <h2 style="margin:0 0 12px">New website enquiry</h2>
      <table style="border-collapse:collapse;width:100%;border:1px solid #e5e5e5">
        ${row('Name', data.name)}${row('Email', data.email)}${row('Phone', data.phone)}
        ${row('Product', data.product)}${row('Subject', data.subject)}${row('Submitted', submittedAt)}
      </table>
      <h3 style="margin:20px 0 6px">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.5;margin:0">${escapeHtml(data.message)}</p>
    </div>`;

  const text = [
    'New website enquiry',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Product: ${data.product}`,
    `Subject: ${data.subject}`,
    `Submitted: ${submittedAt}`,
    '',
    data.message,
  ].join('\n');

  await getTransporter().sendMail({
    from: `"Website Enquiries" <${env.gmailUser}>`,
    to: env.contactReceiver, // always the owner's inbox, never customer-supplied
    replyTo: `"${data.name.replace(/"/g, '')}" <${data.email}>`,
    subject: `[Website] ${data.subject} — ${data.name}`,
    text,
    html,
  });
}
