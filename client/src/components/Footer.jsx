import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';
import { site, nav } from '../config/site';
import { categories } from '../data/products';
import { openWhatsApp, generalMessage } from '../utils/whatsapp';

export default function Footer() {
  const { phone, email, hours, address } = site.contact;
  return (
    <footer className="border-t border-line bg-coal mt-24">
      <div className="container-x py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 text-mute max-w-xs leading-relaxed">{site.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xl mb-4 text-white">Explore</h2>
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.to}><Link className="text-mute hover:text-lime transition-colors" to={n.to}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xl mb-4 text-white">Supplements</h2>
          <ul className="space-y-3">
            {categories.slice(0, 6).map((c) => (
              <li key={c}><Link className="text-mute hover:text-lime transition-colors" to={`/supplements?category=${encodeURIComponent(c)}`}>{c}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl mb-4 text-white">Talk to us</h2>
          <ul className="space-y-3 text-mute">
            <li>
              <button type="button" onClick={() => openWhatsApp(generalMessage())} className="inline-flex items-center gap-2 hover:text-wa transition-colors">
                <WhatsAppIcon className="w-5 h-5" /> WhatsApp enquiry
              </button>
            </li>
            {phone && <li className="flex gap-2"><Phone className="w-5 h-5 shrink-0" /><a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white">{phone}</a></li>}
            {email && <li className="flex gap-2"><Mail className="w-5 h-5 shrink-0" /><a href={`mailto:${email}`} className="hover:text-white break-all">{email}</a></li>}
            {hours && <li className="flex gap-2"><Clock className="w-5 h-5 shrink-0" />{hours}</li>}
            {address && <li className="flex gap-2"><MapPin className="w-5 h-5 shrink-0" />{address}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x py-6 text-sm text-mute flex flex-wrap justify-between gap-2">
          <p>© {new Date().getFullYear()} {site.brand}. All rights reserved.</p>
          <p>Prices and availability confirmed on enquiry.</p>
        </div>
        <div className="container-x pb-8 text-xs text-mute/80 leading-relaxed">
          <p>Supplements are not a substitute for a varied diet or for medical advice. Always read the label, and speak to a doctor or pharmacist before use if you are pregnant, breastfeeding, under 18, on medication or have a medical condition.</p>
        </div>
      </div>
    </footer>
  );
}
