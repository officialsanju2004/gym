import { Phone, Mail, Clock, MapPin, ExternalLink } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import WhatsAppIcon from '../components/WhatsAppIcon';
import Reveal from '../components/Reveal';
import Scene from '../components/Scenes';
import { site, mapsEmbedUrl, mapsLinkUrl } from '../config/site';
import { useSEO } from '../hooks/useSEO';
import { openWhatsApp, generalMessage } from '../utils/whatsapp';

export default function Contact() {
  useSEO({ title: 'Contact Us', description: `Visit ${site.brand} at Kaccha Zira Road, Near Dana Mandi, Ferozepur City 152002, or call ${site.contact.phone}.`, path: '/contact' });
  const { phone, phoneHref, email, hours, addressLines } = site.contact;
  const rows = [
    { Icon: Phone, label: 'Phone / WhatsApp', value: phone, href: phoneHref },
    { Icon: MapPin, label: 'Address', lines: addressLines, href: mapsLinkUrl },
    email && { Icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    hours && { Icon: Clock, label: 'Hours', value: hours },
  ].filter(Boolean);

  return (
    <>
      <section className="pt-40 pb-16 knurl border-b border-line">
        <div className="container-x">
          <h1 className="text-6xl sm:text-8xl lg:text-[9.5rem]">Let’s find your fit.</h1>
          <p className="mt-6 text-mute text-lg max-w-xl leading-relaxed">Tell us what you are training for and which products you are looking at, or visit the shop in Ferozepur City. We will reply with options.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <h2 className="text-4xl">Reach us directly</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => openWhatsApp(generalMessage())} className="btn-wa w-full sm:w-auto"><WhatsAppIcon className="w-5 h-5" /> Chat on WhatsApp</button>
              <a href={phoneHref} className="btn-primary w-full sm:w-auto"><Phone className="w-4 h-4" /> Call {phone}</a>
            </div>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {rows.map(({ Icon, label, value, lines, href }) => (
                <li key={label} className="flex gap-4 py-5">
                  <Icon className="w-5 h-5 text-gold mt-1 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-mute">{label}</p>
                    {lines ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                        <address className="not-italic">{lines.map((l, i) => <span key={l} className={`block ${i === 0 ? 'font-semibold' : ''}`}>{l}</span>)}</address>
                      </a>
                    ) : href ? <a href={href} className="font-semibold hover:text-gold break-all">{value}</a> : <p className="font-semibold">{value}</p>}
                  </div>
                </li>
              ))}
            </ul>
            <Scene name="pin" className="mx-auto mt-10 hidden h-auto w-full max-w-[340px] lg:block" />
          </Reveal>
          <Reveal delay={0.08} className="bg-coal border border-line p-6 sm:p-10">
            <h2 className="text-4xl mb-7">Send a message</h2>
            <ContactForm variant="page" idPrefix="contact" />
          </Reveal>
        </div>
      </section>

      <section className="pb-8" aria-labelledby="map-h">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="map-h" className="text-4xl sm:text-5xl">Find the shop</h2>
            <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !min-h-11">Open in Google Maps <ExternalLink className="w-4 h-4" /></a>
          </div>
          <div className="mt-6 border border-line bg-coal">
            <iframe
              title={`Map showing ${site.brand}`}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[320px] w-full sm:h-[420px] [filter:invert(.92)_hue-rotate(180deg)_saturate(.7)]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
