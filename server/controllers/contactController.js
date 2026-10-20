import { validateContact } from '../utils/validate.js';
import { sendContactEmail } from '../services/emailService.js';

export async function submitContact(req, res) {
  // Honeypot: real users never see or fill this field. Pretend success to bots.
  if (req.body && typeof req.body.website === 'string' && req.body.website.trim() !== '') {
    return res.status(200).json({ success: true, message: 'Thanks! Your message has been sent.' });
  }

  const { errors, values } = validateContact(req.body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ success: false, message: 'Please correct the highlighted fields.', errors });
  }

  try {
    await sendContactEmail(values);
    return res.status(200).json({ success: true, message: 'Thanks! Your message has been sent.' });
  } catch (err) {
    console.error('[contact] email failed:', err.code || '', err.message);
    const notConfigured = err.code === 'EMAIL_NOT_CONFIGURED';
    return res.status(notConfigured ? 503 : 502).json({
      success: false,
      message: notConfigured
        ? 'Email service is not set up yet. Please contact us on WhatsApp.'
        : 'We could not send your message right now. Please try again or contact us on WhatsApp.',
    });
  }
}
