import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import WhatsAppIcon from '../components/WhatsAppIcon';
import Reveal from '../components/Reveal';
import { site } from '../config/site';
import { useSEO } from '../hooks/useSEO';
import { openWhatsApp, generalMessage } from '../utils/whatsapp';

export default function Contact() {
  useSEO({ title: 'Contact Us', description: `Contact ${site.brand} to enquire about gym equipment. Message us on WhatsApp or send the form.`, path: '/contact' });
  const { phone, email, hours, address } = site.contact;
  const rows = [
    phone && { Icon: Phone, label: 'Phone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
    email && { Icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    hours && { Icon: Clock, label: 'Hours', value: hours },
    address && { Icon: MapPin, label: 'Address', value: address },
  ].filter(Boolean);

  return (
    <>
      <section className="pt-40 pb-16 knurl border-b border-line">
        <div className="container-x">
          <h1 className="text-6xl sm:text-8xl lg:text-[9.5rem]">Let’s build your gym.</h1>
          <p className="mt-6 text-mute text-lg max-w-xl leading-relaxed">Tell us about your space and what you want to train. We will reply with options.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <h2 className="text-4xl">Reach us directly</h2>
            <button type="button" onClick={() => openWhatsApp(generalMessage())} className="btn-wa mt-6 w-full sm:w-auto"><WhatsAppIcon className="w-5 h-5" /> Chat on WhatsApp</button>
            {rows.length > 0 && (
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {rows.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex gap-4 py-5">
                    <Icon className="w-5 h-5 text-lime mt-1 shrink-0" aria-hidden="true" />
                    <div><p className="text-sm text-mute">{label}</p>{href ? <a href={href} className="font-semibold hover:text-lime break-all">{value}</a> : <p className="font-semibold">{value}</p>}</div>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
          <Reveal delay={0.08} className="bg-coal border border-line p-6 sm:p-10">
            <h2 className="text-4xl mb-7">Send a message</h2>
            <ContactForm variant="page" idPrefix="contact" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
