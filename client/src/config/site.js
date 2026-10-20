// ─── Central site configuration ─────────────────────────────────────────────
// Everything marked REPLACE is a placeholder. Do not ship placeholders.
export const site = {
  brand: 'IRONFORM', // REPLACE with the real brand name
  tagline: 'Premium gym equipment for serious training spaces.',
  // Digits only, international format. Set VITE_WHATSAPP_NUMBER in client/.env
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210', // REPLACE
  contact: {
    phone: '', // e.g. '+91 98765 43210' — hidden on the site while empty
    email: '', // e.g. 'sales@yourbrand.com'
    hours: '', // e.g. 'Mon–Sat, 10:00–19:00'
    address: '', // only if supplied
  },
  apiUrl: import.meta.env.VITE_API_URL || '',
  siteUrl: (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, ''),
  // Add real customer feedback here. While empty, the testimonials section is not rendered.
  testimonials: [
    // { quote: '...', name: '...', role: '...' }
  ],
  // Story copy for the About page. REPLACE with the business's real story.
  story: [
    'We help people equip the spaces where they train. From a corner of a home garage to a full commercial floor, we match the right equipment to the room, the budget and the goal.',
    'Every product in our catalogue is chosen for how it feels under load and how it holds up to daily use. When you are not sure what fits, our team helps you work it out before you buy.',
  ],
};

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/equipment', label: 'Equipment' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];
