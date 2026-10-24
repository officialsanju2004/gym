import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import LogoImage from './LogoImage';
import WhatsAppIcon from './WhatsAppIcon';
import { site, nav, mapsLinkUrl } from '../config/site';
import { categories } from '../data/products';
import { PRICE_NOTE } from '../data/products';
import { openWhatsApp, generalMessage } from '../utils/whatsapp';

export default function Footer() {
  const { phone, phoneHref, email, hours, addressLines } = site.contact;
  return (
    <footer className="border-t border-line bg-coal mt-24">
      <div className="container-x py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.3fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <LogoImage className="w-48 sm:w-56 -ml-3" sizes="224px" />
          <p className="mt-2 text-mute max-w-xs leading-relaxed">{site.tagline}</p>
          <p className="mt-1 font-display text-2xl font-extrabold uppercase text-flame">{site.slogan}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xl mb-4 text-white">Explore</h2>
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.to}><Link className="text-mute hover:text-gold transition-colors" to={n.to}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xl mb-4 text-white">Supplements</h2>
          <ul className="space-y-3">
            {categories.map((c) => (
              <li key={c}><Link className="text-mute hover:text-gold transition-colors" to={`/supplements?category=${encodeURIComponent(c)}`}>{c}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl mb-4 text-white">Visit or call us</h2>
          <ul className="space-y-3 text-mute">
            <li className="flex gap-2">
              <MapPin className="w-5 h-5 shrink-0 text-gold mt-0.5" aria-hidden="true" />
              <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <address className="not-italic leading-relaxed">
                  {addressLines.map((l, i) => <span key={l} className={`block ${i === 0 ? 'text-white font-semibold' : ''}`}>{l}</span>)}
                </address>
              </a>
            </li>
            <li className="flex gap-2"><Phone className="w-5 h-5 shrink-0 text-gold" aria-hidden="true" /><a href={phoneHref} className="hover:text-white">{phone}</a></li>
            <li>
              <button type="button" onClick={() => openWhatsApp(generalMessage())} className="inline-flex items-center gap-2 hover:text-wa transition-colors">
                <WhatsAppIcon className="w-5 h-5" /> WhatsApp enquiry
              </button>
            </li>
            {email && <li className="flex gap-2"><Mail className="w-5 h-5 shrink-0 text-gold" /><a href={`mailto:${email}`} className="hover:text-white break-all">{email}</a></li>}
            {hours && <li className="flex gap-2"><Clock className="w-5 h-5 shrink-0 text-gold" />{hours}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x py-6 text-sm text-mute flex flex-wrap justify-between gap-2">
          <p>© {new Date().getFullYear()} {site.brand}. All rights reserved.</p>
          <p>{PRICE_NOTE}</p>
        </div>
        <div className="container-x pb-8 text-xs text-mute/80 leading-relaxed">
          <p>Supplements are not a substitute for a varied diet or for medical advice. Always read the label, and speak to a doctor or pharmacist before use if you are pregnant, breastfeeding, under 18, on medication or have a medical condition.</p>
        </div>
        <div className="container-x pb-8 text-sm text-mute">
          <p>
            Developed and managed by{' '}
            <a href="https://growthflowmedia.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gold hover:text-white transition-colors">Growth flow media</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
