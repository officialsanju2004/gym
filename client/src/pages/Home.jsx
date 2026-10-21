import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Globe2, BadgeIndianRupee, Target, Phone, Dumbbell, Zap, Flame, Droplets, Pill, FlaskConical, Wheat } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import LogoImage from '../components/LogoImage';
import ProductImage from '../components/ProductImage';
import ContactForm from '../components/ContactForm';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { featuredProducts, categories, countByCategory, firstOfCategory, products, categoryMeta, PRICE_NOTE } from '../data/products';
import { site } from '../config/site';
import { useSEO } from '../hooks/useSEO';
import { openWhatsApp, generalMessage } from '../utils/whatsapp';

const highlights = [
  { icon: Globe2, title: 'Imported and Indian brands', text: 'Protein, creatine, pre-workout and more from brands you know.' },
  { icon: BadgeIndianRupee, title: 'Prices listed upfront', text: 'MRP and our price shown on every product, no guessing.' },
  { icon: Target, title: 'Goal-based choices', text: 'Muscle gain, performance, recovery or everyday wellness.' },
  { icon: Phone, title: 'Talk to a real person', text: `Call or WhatsApp ${site.contact.phone}, or visit us in Ferozepur.` },
];

const tileIcons = { Protein: Dumbbell, 'Mass Gainers': Flame, 'Gaining Products': Flame, Creatine: FlaskConical, 'Pre-Workout': Zap, 'Amino Acids': Droplets, 'Nutrition & Vitamins': Pill, Oats: Wheat };
const tileBg = [
  'radial-gradient(circle at 85% 15%, rgba(245,182,66,.20), transparent 55%), #0e0b0b',
  'radial-gradient(circle at 80% 90%, rgba(229,9,11,.28), transparent 55%), #0e0b0b',
  'radial-gradient(circle at 15% 90%, rgba(245,182,66,.14), transparent 50%), #0b0909',
  'radial-gradient(circle at 85% 85%, rgba(229,9,11,.22), transparent 55%), #0e0b0b',
];

const reasons = [
  ['Quality-focused selection', 'We stock brands chosen for their formulation and reputation, not for the loudest marketing.'],
  ['For every goal and budget', 'From a 1 kg oats pack to a 5 kg mass-gainer bucket, with options at every price.'],
  ['Help choosing', 'Tell us your goal, budget and any dietary needs and we will point you to what fits.'],
  ['Straightforward enquiries', 'Call, WhatsApp or use the form and get a direct reply.'],
];

function Hero() {
  const { scrollY } = useScroll();
  const yArt = useTransform(scrollY, [0, 800], [0, 60]);
  const line = (t, d, cls = '') => (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span className={`block ${cls}`} initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] }}>{t}</motion.span>
    </span>
  );
  return (
    <section className="relative flex items-center overflow-hidden pt-24 pb-16 lg:min-h-[100svh]">
      <div className="absolute inset-0 knurl opacity-60" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_80%_100%,rgba(229,9,11,.28),transparent_60%)]" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div>
          <h1 className="text-[clamp(3.4rem,10.5vw,8.25rem)]">
            {line('Fuel your', 0.1)}
            {line('body.', 0.2)}
            {line('Feed your', 0.3, 'text-gold')}
            {line('dreams.', 0.4, 'text-gold')}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-7 max-w-md text-lg text-mute leading-relaxed">
            {site.brand} sells protein, creatine, pre-workout, gainers and everyday wellness products, with the price on every product. Browse the range, then call or message us.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="mt-8 flex flex-wrap gap-3">
            <Link to="/supplements" className="btn-primary">Shop Supplements <ArrowRight className="w-4 h-4" /></Link>
            <a href={site.contact.phoneHref} className="btn-ghost"><Phone className="w-4 h-4" /> {site.contact.phone}</a>
          </motion.div>
        </div>

        <motion.div style={{ y: yArt }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="order-first lg:order-none mx-auto w-full max-w-[300px] sm:max-w-[440px] lg:max-w-[600px] lg:justify-self-end">
          <LogoImage eager sizes="(min-width:1024px) 600px, (min-width:640px) 440px, 300px" />
        </motion.div>
      </div>

      <a href="#highlights" aria-label="Scroll to content" className="absolute bottom-5 left-1/2 -translate-x-1/2 text-mute hover:text-gold transition-colors hidden lg:block">
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="block"><ArrowDown /></motion.span>
      </a>
    </section>
  );
}

export default function Home() {
  useSEO({
    title: 'Gym Supplements in Ferozepur: Protein, Creatine, Pre-Workout & More',
    description: `${site.brand}, Kaccha Zira Road, Near Dana Mandi, Ferozepur City 152002. Protein, creatine, pre-workout, gainers, amino acids and vitamins. Call ${site.contact.phone}.`,
    path: '/',
  });
  const picks = featuredProducts.slice(0, 7);
  const shown = categories.filter((c) => countByCategory[c] > 0);
  const wideAt = new Set([0, 5]);

  return (
    <>
      <Hero />

      <section id="highlights" className="border-y border-line bg-coal">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.07} className={`py-8 sm:px-6 first:pl-0 ${i > 0 ? 'lg:border-l border-line' : ''} ${i > 0 ? 'border-t sm:border-t-0 border-line' : ''}`}>
              <Icon className="w-7 h-7 text-gold" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-2xl">{title}</h3>
              <p className="mt-2 text-mute text-[15px] leading-relaxed">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading title="Featured supplements" text="A cross-section of the range. Open any product for the full price details, or message us to buy." />
            <Link to="/supplements" className="btn-ghost">View all supplements <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((p, i) => <ProductCard key={p.id} product={p} index={i} variant={wideAt.has(i) ? 'wide' : 'standard'} />)}
          </div>
          <p className="mt-6 text-sm text-mute">{PRICE_NOTE} Showing {picks.length} of {products.length} products.</p>
        </div>
      </section>

      <section className="py-24 bg-coal border-y border-line">
        <div className="container-x">
          <SectionHeading title="Shop by category" text="Pick a category and see everything in that range." />
          <div className="mt-12 grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((label, i) => {
              const Icon = tileIcons[label] || Dumbbell;
              const sample = firstOfCategory(label);
              return (
                <Reveal key={label} delay={(i % 3) * 0.07} className={`bg-ink ${i === shown.length - 1 && shown.length % 3 === 2 ? 'lg:col-span-2' : ''}`}>
                  <Link to={`/supplements?category=${encodeURIComponent(label)}`} className="group relative flex min-h-[260px] flex-col justify-between p-7 overflow-hidden" style={{ background: tileBg[i % tileBg.length] }}>
                    <div className="pointer-events-none absolute -right-3 -bottom-5 w-[44%] opacity-95 transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2" aria-hidden="true">
                      <ProductImage product={sample} bare className="w-full h-auto" />
                    </div>
                    <Icon className="relative w-9 h-9 text-gold transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.25} aria-hidden="true" />
                    <div className="relative max-w-[58%]">
                      <h3 className="text-4xl group-hover:text-gold transition-colors">{label}</h3>
                      <p className="mt-2 text-sm text-mute">{countByCategory[label]} products · {categoryMeta[label].blurb}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-mute group-hover:text-white">Browse range <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <SectionHeading title="Why choose us" text="Choosing supplements can be confusing. We keep it simple and honest." className="lg:sticky lg:top-32 self-start" />
          <ol className="divide-y divide-line border-y border-line">
            {reasons.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.06} className="py-8 grid sm:grid-cols-[minmax(0,.9fr)_1.1fr] gap-3 sm:gap-8">
                <h3 className="text-3xl">{t}</h3>
                <p className="text-mute leading-relaxed">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-coal overflow-hidden">
        <div className="container-x grid lg:grid-cols-2 items-center gap-12 py-24">
          <Reveal className="relative max-w-[440px] w-full mx-auto lg:mx-0">
            <LogoImage sizes="(min-width:1024px) 440px, 90vw" />
          </Reveal>
          <Reveal>
            <h2 className="text-5xl sm:text-6xl">Punjabi power, in a tub</h2>
            <p className="mt-6 text-mute text-lg leading-relaxed max-w-lg">{site.story[0]}</p>
            <p className="mt-4 text-mute leading-relaxed max-w-lg">{site.brand}, Kaccha Zira Road, Near Dana Mandi, Ferozepur City.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="btn-ghost">Discover our story <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/contact" className="btn-primary">Find the shop</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {site.testimonials.length > 0 && (
        <section className="py-24">
          <div className="container-x">
            <SectionHeading title="What customers say" />
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {site.testimonials.map((t) => (
                <Reveal as="figure" key={t.name} className="border-l-2 border-gold pl-6">
                  <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 text-sm text-mute">{t.name}{t.role ? `, ${t.role}` : ''}</figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 lg:py-32">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Reveal>
              <h2 className="text-5xl sm:text-7xl">Not sure what to take? Call or message us.</h2>
              <p className="mt-6 text-mute text-lg max-w-md leading-relaxed">Tell us what you are training for and any dietary needs. We will come back with options.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => openWhatsApp(generalMessage())} className="btn-wa"><WhatsAppIcon className="w-5 h-5" /> Enquire on WhatsApp</button>
                <a href={site.contact.phoneHref} className="btn-primary"><Phone className="w-4 h-4" /> {site.contact.phone}</a>
                <Link to="/contact" className="btn-ghost">Contact page</Link>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="bg-coal border border-line p-6 sm:p-9">
              <h3 className="text-3xl mb-6">Send us an enquiry</h3>
              <ContactForm variant="home" idPrefix="home" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
