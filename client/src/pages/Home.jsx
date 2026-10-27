import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, BadgeIndianRupee, Target, Phone } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import Scene from '../components/Scenes';
import HeroSlider from '../components/HeroSlider';
import ShopByCategory from '../components/ShopByCategory';
import ContactForm from '../components/ContactForm';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { featuredProducts, products, PRICE_NOTE } from '../data/products';
import { site } from '../config/site';
import { useSEO } from '../hooks/useSEO';
import { openWhatsApp, generalMessage } from '../utils/whatsapp';

const highlights = [
  { icon: Globe2, title: 'Imported and Indian brands', text: 'Protein, creatine, pre-workout and more from brands you know.' },
  { icon: BadgeIndianRupee, title: 'Prices listed upfront', text: 'MRP and our price shown on every product, no guessing.' },
  { icon: Target, title: 'Goal-based choices', text: 'Muscle gain, performance, recovery or everyday wellness.' },
  { icon: Phone, title: 'Talk to a real person', text: `Call or WhatsApp ${site.contact.phone}, or visit us in Ferozepur.` },
];

const reasons = [
  ['Quality-focused selection', 'We stock brands chosen for their formulation and reputation, not for the loudest marketing.'],
  ['For every goal and budget', 'From a 1 kg oats pack to a 5 kg mass-gainer bucket, with options at every price.'],
  ['Help choosing', 'Tell us your goal, budget and any dietary needs and we will point you to what fits.'],
  ['Straightforward enquiries', 'Call, WhatsApp or use the form and get a direct reply.'],
];

export default function Home() {
  useSEO({
    title: 'Gym Supplements in Ferozepur: Protein, Creatine, Pre-Workout & More',
    description: `${site.brand}, Kaccha Zira Road, Near Dana Mandi, Ferozepur City 152002. Protein, creatine, pre-workout, gainers, amino acids and vitamins. Call ${site.contact.phone}.`,
    path: '/',
  });
  const picks = featuredProducts.slice(0, 7);
  const wideAt = new Set([0, 5]);

  return (
    <>
      <HeroSlider />

      <ShopByCategory />

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

      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 self-start">
            <SectionHeading title="Why choose us" text="Choosing supplements can be confusing. We keep it simple and honest." />
            <Reveal delay={0.1} className="mt-8 max-w-[360px]"><Scene name="why" className="h-auto w-full" /></Reveal>
          </div>
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
            <Scene name="story" className="h-auto w-full" />
          </Reveal>
          <Reveal>
            <h2 className="text-5xl sm:text-6xl">Punjabi power, in a tub</h2>
            <p className="mt-6 text-mute text-lg leading-relaxed max-w-lg">{site.story[0]}</p>
            <p className="mt-4 text-mute leading-relaxed max-w-lg">{site.brand}, Kaccha Zira Road, Near Dana Mandi, Ferozepur City.</p>
            <div className="order-4 mt-0 lg:mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
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
              <div className="order-4 mt-0 lg:mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
                <button type="button" onClick={() => openWhatsApp(generalMessage())} className="btn-wa"><WhatsAppIcon className="w-5 h-5" /> Enquire on WhatsApp</button>
                <a href={site.contact.phoneHref} className="btn-primary"><Phone className="w-4 h-4" /> {site.contact.phone}</a>
                <Link to="/contact" className="btn-ghost">Contact page</Link>
              </div>
              <Scene name="enquiry" className="mt-10 hidden h-auto w-full max-w-[380px] sm:block" />
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