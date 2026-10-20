import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, ShieldCheck, FlaskConical, Target, Headset, Dumbbell, Zap, Flame, Droplets, Pill } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import TubArt from '../components/TubArt';
import ContactForm from '../components/ContactForm';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { featuredProducts } from '../data/products';
import { site } from '../config/site';
import { useSEO } from '../hooks/useSEO';
import { openWhatsApp, generalMessage } from '../utils/whatsapp';

const highlights = [
  { icon: ShieldCheck, title: 'Genuine products', text: 'Authentic, sealed products from trusted suppliers.' },
  { icon: FlaskConical, title: 'Transparent labels', text: 'Ingredients and nutrition facts shared before you buy.' },
  { icon: Target, title: 'Goal-based choices', text: 'Muscle gain, performance, recovery or everyday wellness.' },
  { icon: Headset, title: 'Dedicated support', text: 'Real people to help before and after you enquire.' },
];

const categoryTiles = [
  { label: 'Protein', to: 'Protein', icon: Dumbbell, bg: 'radial-gradient(circle at 85% 15%, rgba(198,255,0,.22), transparent 55%), #141414' },
  { label: 'Mass Gainers', to: 'Mass Gainers', icon: Flame, bg: 'repeating-linear-gradient(90deg, #141414 0 38px, #181818 38px 40px)' },
  { label: 'Creatine', to: 'Creatine', icon: FlaskConical, bg: 'radial-gradient(circle at 15% 90%, rgba(255,255,255,.09), transparent 50%), #101010' },
  { label: 'Pre-Workout', to: 'Pre-Workout', icon: Zap, bg: 'repeating-linear-gradient(135deg, #141414 0 14px, #171717 14px 28px)' },
  { label: 'Amino Acids & Recovery', to: 'Amino Acids & Recovery', icon: Droplets, bg: 'linear-gradient(160deg, #1b1b1b, #0e0e0e)' },
  { label: 'Vitamins & Wellness', to: 'Vitamins & Wellness', icon: Pill, bg: 'radial-gradient(circle at 50% 120%, rgba(198,255,0,.18), transparent 60%), #141414' },
];

const reasons = [
  ['Quality-focused selection', 'We choose products for formulation and label honesty, not for the loudest marketing.'],
  ['For every goal and budget', 'The same care whether you are buying your first tub or restocking for a team.'],
  ['Help choosing', 'Tell us your goal, budget and any dietary needs and we will point you to what fits.'],
  ['Straightforward enquiries', 'Message us on WhatsApp or the form and get a direct reply.'],
];

function Hero() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 800], [-4, 10]);
  const yArt = useTransform(scrollY, [0, 800], [0, 120]);
  const word = (t, d) => (
    <span className="block overflow-hidden">
      <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] }}>{t}</motion.span>
    </span>
  );
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-20">
      <div className="absolute inset-0 knurl opacity-60" aria-hidden="true" />
      <motion.div style={{ y: yArt }} className="absolute -right-[28%] sm:-right-[12%] lg:right-[-4%] top-1/2 -translate-y-1/2 w-[120vw] sm:w-[78vw] lg:w-[52vw] max-w-[820px] opacity-40 sm:opacity-100" aria-hidden="true">
        <TubArt rotate={rotate} className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,.8)]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" aria-hidden="true" />

      <div className="container-x relative">
        <h1 className="text-[clamp(4rem,15vw,12.5rem)]">
          {word('Fuel', 0.1)}
          {word('your', 0.2)}
          <span className="block overflow-hidden"><motion.span className="block text-lime" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>stronger.</motion.span></span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8 max-w-md text-lg text-mute leading-relaxed">
          {site.brand} supplies protein, creatine, pre-workout and everyday wellness products for people who train. Browse the range, then talk to our team about what fits your goal.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="mt-9 flex flex-wrap gap-3">
          <Link to="/supplements" className="btn-primary">Shop Supplements <ArrowRight className="w-4 h-4" /></Link>
          <Link to="/contact" className="btn-ghost">Talk to Our Team</Link>
        </motion.div>
      </div>

      <a href="#highlights" aria-label="Scroll to content" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-mute hover:text-lime transition-colors hidden sm:block">
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="block"><ArrowDown /></motion.span>
      </a>
    </section>
  );
}

export default function Home() {
  useSEO({
    title: 'Gym Supplements: Protein, Creatine, Pre-Workout & More',
    description: `Explore gym supplements from ${site.brand}: protein, creatine, pre-workout, amino acids, vitamins and more. Enquire on WhatsApp or send us a message.`,
    path: '/',
  });
  const picks = featuredProducts.slice(0, 7);
  const wideAt = new Set([0, 5]);

  return (
    <>
      <Hero />

      <section id="highlights" className="border-y border-line bg-coal">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.07} className={`py-8 sm:px-6 first:pl-0 ${i > 0 ? 'lg:border-l border-line' : ''} ${i > 0 ? 'border-t sm:border-t-0 border-line' : ''}`}>
              <Icon className="w-7 h-7 text-lime" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-2xl">{title}</h3>
              <p className="mt-2 text-mute text-[15px] leading-relaxed">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading title="Featured supplements" text="A cross-section of the range. Open any product for details, or message us to buy." />
            <Link to="/supplements" className="btn-ghost">View all supplements <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((p, i) => <ProductCard key={p.id} product={p} index={i} variant={wideAt.has(i) ? 'wide' : 'standard'} />)}
          </div>
        </div>
      </section>

      <section className="py-24 bg-coal border-y border-line">
        <div className="container-x">
          <SectionHeading title="Shop by category" text="Pick a category and see everything in that range." />
          <div className="mt-12 grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-3">
            {categoryTiles.map(({ label, to, icon: Icon, bg }, i) => (
              <Reveal key={label} delay={(i % 3) * 0.07} className="bg-ink">
                <Link to={`/supplements?category=${encodeURIComponent(to)}`} className="group relative flex min-h-[260px] flex-col justify-between p-7 overflow-hidden" style={{ background: bg }}>
                  <Icon className="w-9 h-9 text-lime transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.25} aria-hidden="true" />
                  <div>
                    <h3 className="text-4xl group-hover:text-lime transition-colors">{label}</h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-mute group-hover:text-white">Browse range <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
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
          <Reveal className="relative aspect-square max-w-[460px] w-full mx-auto lg:mx-0">
            <div className="absolute inset-0 knurl border border-line" />
            <TubArt className="absolute inset-[8%] w-[84%] h-[84%]" />
          </Reveal>
          <Reveal>
            <h2 className="text-5xl sm:text-6xl">Built for people who train</h2>
            <p className="mt-6 text-mute text-lg leading-relaxed max-w-lg">{site.story[0]}</p>
            <p className="mt-4 text-mute leading-relaxed max-w-lg">Our mission is simple: make good sports nutrition easy to find and easy to choose.</p>
            <Link to="/about" className="btn-ghost mt-8">Discover our story <ArrowRight className="w-4 h-4" /></Link>
          </Reveal>
        </div>
      </section>

      {site.testimonials.length > 0 && (
        <section className="py-24">
          <div className="container-x">
            <SectionHeading title="What customers say" />
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {site.testimonials.map((t) => (
                <Reveal as="figure" key={t.name} className="border-l-2 border-lime pl-6">
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
              <h2 className="text-5xl sm:text-7xl">Not sure what to take? Start with a message.</h2>
              <p className="mt-6 text-mute text-lg max-w-md leading-relaxed">Tell us what you are training for and any dietary needs. We will come back with options.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => openWhatsApp(generalMessage())} className="btn-wa"><WhatsAppIcon className="w-5 h-5" /> Enquire on WhatsApp</button>
                <Link to="/contact" className="btn-ghost">Go to contact page</Link>
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
