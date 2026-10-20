const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;

// Strip control characters and trim. HTML escaping happens when the email is built.
const clean = (v) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim() : '';

export const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/** Returns { errors, values }. errors is an object keyed by field name. */
export function validateContact(body = {}) {
  const values = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
    subject: clean(body.subject) || 'Supplement enquiry',
    product: clean(body.product) || 'Not specified',
    message: clean(body.message),
  };
  const errors = {};

  if (values.name.length < 2 || values.name.length > 80) errors.name = 'Enter your full name (2–80 characters).';
  if (!EMAIL_RE.test(values.email) || values.email.length > 120) errors.email = 'Enter a valid email address.';
  if (!PHONE_RE.test(values.phone) || values.phone.replace(/\D/g, '').length < 7)
    errors.phone = 'Enter a valid phone number.';
  if (values.subject.length > 120) errors.subject = 'Subject must be under 120 characters.';
  if (values.product.length > 120) errors.product = 'Product must be under 120 characters.';
  if (values.message.length < 10 || values.message.length > 2000)
    errors.message = 'Message must be between 10 and 2000 characters.';

  // Header-injection guard for fields that end up in email headers.
  for (const f of ['name', 'email', 'subject']) {
    if (/[\r\n]/.test(String(body[f] ?? ''))) errors[f] = 'Line breaks are not allowed here.';
  }

  return { errors, values };
}
