// ─── Central site configuration ─────────────────────────────────────────────
const phoneDisplay = '98418-00004';
const phoneDigits = phoneDisplay.replace(/\D/g, ''); // 9841800004

const addressLines = [
  'Punjabi Tadka Nutrition',
  'Kaccha Zira Road, Near Dana Mandi',
  'Ferozepur City',
  'Pin: 152002',
];

export const site = {
  brand: 'Punjabi Tadka Nutrition',
  shortBrand: 'Punjabi Tadka',
  tagline: 'Fuel your body. Feed your dreams.',
  slogan: 'Punjabi Power',
  // Digits only, international format (India +91). Can be overridden with VITE_WHATSAPP_NUMBER in client/.env
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || `91${phoneDigits}`,
  contact: {
    phone: phoneDisplay,
    phoneHref: `tel:+91${phoneDigits}`,
    email: '', // add if the shop has one — hidden while empty
    hours: '', // add opening hours if you want them shown — hidden while empty
    addressLines,
    address: addressLines.join(', '),
    pin: '152002',
  },
  mapsQuery: 'Punjabi Tadka Nutrition, Kaccha Zira Road, Near Dana Mandi, Ferozepur City, 152002',
  apiUrl: import.meta.env.VITE_API_URL || '',
  siteUrl: (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, ''),
  // Add real customer feedback here. While empty, the testimonials section is not rendered.
  testimonials: [
    // { quote: '...', name: '...', role: '...' }
  ],
  story: [
    'Punjabi Tadka Nutrition is a sports-nutrition store on Kaccha Zira Road, near Dana Mandi, Ferozepur City. We stock protein, mass gainers, creatine, pre-workout, amino acids, vitamins and oats from imported and Indian brands, with the price listed on every product.',
    'Our motto is simple: fuel your body, feed your dreams. If you are not sure what suits your goal and budget, call or WhatsApp us on 98418-00004 or visit the shop and we will help you choose.',
  ],
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
export const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/supplements', label: 'Supplements' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];
