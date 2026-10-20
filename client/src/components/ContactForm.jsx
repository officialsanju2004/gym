import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { site } from '../config/site';
import { categories, products } from '../data/products';
import { openWhatsApp, generalMessage } from '../utils/whatsapp';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;

function Field({ id, label, error, required = true, children }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label} {required ? <span className="text-lime" aria-hidden="true">*</span> : <span className="text-mute font-normal">(optional)</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="err">{error}</p>}
    </div>
  );
}

/**
 * variant="home": Name, Email, Phone, Product of Interest, Message
 * variant="page": adds Subject and uses Product Category
 */
export default function ContactForm({ variant = 'page', idPrefix = 'cf' }) {
  const isPage = variant === 'page';
  const {
    register, handleSubmit, reset, setError, formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '', email: '', phone: '', subject: '', product: '', message: '', website: '' } });
  const [status, setStatus] = useState({ type: 'idle', text: '' }); // idle | success | error
  const lock = useRef(false); // synchronous guard against double submits

  const id = (n) => `${idPrefix}-${n}`;
  const aria = (n) => ({ 'aria-invalid': errors[n] ? 'true' : 'false', 'aria-describedby': errors[n] ? `${id(n)}-err` : undefined });

  const onSubmit = async (data) => {
    if (lock.current) return;
    lock.current = true;
    setStatus({ type: 'idle', text: '' });
    try {
      const res = await fetch(`${site.apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          subject: data.subject || (isPage ? '' : 'Homepage enquiry'),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        if (json.errors) Object.entries(json.errors).forEach(([k, m]) => setError(k, { type: 'server', message: m }));
        setStatus({ type: 'error', text: json.message || 'Something went wrong. Please try again.' });
        lock.current = false;
        return;
      }
      setStatus({ type: 'success', text: json.message });
      reset();
      setTimeout(() => { lock.current = false; }, 4000); // brief cool-down after success
    } catch {
      setStatus({ type: 'error', text: 'Could not reach the server. Check your connection or contact us on WhatsApp.' });
      lock.current = false;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-label="Contact form">
      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave this field empty<input type="text" tabIndex={-1} autoComplete="off" {...register('website')} /></label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id('name')} label="Full name" error={errors.name?.message}>
          <input id={id('name')} className="field" autoComplete="name" {...aria('name')}
            {...register('name', { required: 'Enter your full name.', minLength: { value: 2, message: 'Name is too short.' }, maxLength: { value: 80, message: 'Name is too long.' } })} />
        </Field>
        <Field id={id('email')} label="Email address" error={errors.email?.message}>
          <input id={id('email')} type="email" inputMode="email" autoComplete="email" className="field" {...aria('email')}
            {...register('email', { required: 'Enter your email address.', pattern: { value: EMAIL_RE, message: 'Enter a valid email, like name@example.com.' } })} />
        </Field>
        <Field id={id('phone')} label="Phone number" error={errors.phone?.message}>
          <input id={id('phone')} type="tel" inputMode="tel" autoComplete="tel" className="field" placeholder="+91 98765 43210" {...aria('phone')}
            {...register('phone', {
              required: 'Enter your phone number.',
              validate: (v) => (PHONE_RE.test(v) && v.replace(/\D/g, '').length >= 7) || 'Enter a valid phone number (7–15 digits).',
            })} />
        </Field>
        {isPage ? (
          <Field id={id('product')} label="Product category" required={false} error={errors.product?.message}>
            <select id={id('product')} className="field" {...register('product')}>
              <option value="">Not sure yet</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        ) : (
          <Field id={id('product')} label="Product of interest" required={false} error={errors.product?.message}>
            <select id={id('product')} className="field" {...register('product')}>
              <option value="">Not sure yet</option>
              {products.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </Field>
        )}
      </div>

      {isPage && (
        <Field id={id('subject')} label="Subject" error={errors.subject?.message}>
          <input id={id('subject')} className="field" {...aria('subject')}
            {...register('subject', { required: 'Add a short subject.', maxLength: { value: 120, message: 'Keep the subject under 120 characters.' } })} />
        </Field>
      )}

      <Field id={id('message')} label="Message" error={errors.message?.message}>
        <textarea id={id('message')} rows={5} className="field py-3 resize-y" placeholder="Tell us about your goals and the products you are interested in." {...aria('message')}
          {...register('message', {
            required: 'Tell us how we can help.',
            minLength: { value: 10, message: 'Please write at least 10 characters.' },
            maxLength: { value: 2000, message: 'Message must be under 2000 characters.' },
          })} />
      </Field>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
        {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Send message</>}
      </button>

      <div aria-live="polite" className="min-h-6">
        <AnimatePresence mode="wait">
          {status.type === 'success' && (
            <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 text-lime">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> {status.text} We will get back to you soon.
            </motion.p>
          )}
          {status.type === 'error' && (
            <motion.div key="bad" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2" style={{ color: '#ff8a8a' }}>
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{status.text}{' '}
                <button type="button" onClick={() => openWhatsApp(generalMessage())} className="underline text-white hover:text-wa">Message us on WhatsApp</button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
