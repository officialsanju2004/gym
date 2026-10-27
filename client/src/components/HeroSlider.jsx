import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MapPin, BadgeCheck } from 'lucide-react';
import ProductImage from './ProductImage';
import WhatsAppIcon from './WhatsAppIcon';
import { buyProduct } from '../utils/whatsapp';
import { products, inr, formatPrice } from '../data/products';
import { site } from '../config/site';

// ---- Tweak these ----
const SHOW_MS = 3000;       // each ad stays this long before moving on
const SLIDE_SECONDS = 0.9;  // how slowly the ad glides to the right

// Free-to-use Unsplash photos (Unsplash License). Swap any id for your own photo/URL.
const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`;

// One ad per slide. `name` must match a product name in data/products.js
const ADS = [
  { name: 'Illuminatti Isolate', kicker: 'Imported Isolate', word: 'Protein', line: 'Imported isolate for your post-workout shake.', l1: 'Build', l2: 'Muscle.', bg: photo('photo-1704650311190-7eeb9c4f6e11') },
  { name: 'Gat Nitraflex', kicker: 'Pre-Workout', word: 'Energy', line: 'Energy and focus before you hit the weights.', l1: 'Unleash', l2: 'The Beast.', bg: photo('photo-1701859081266-95a6ce1af505') },
  { name: 'Schinoussa 300g', kicker: 'Imported Creatine', word: 'Power', line: 'Imported creatine to back your strength training.', l1: 'Pure', l2: 'Strength.', bg: photo('photo-1693996045838-980674653385') },
  { name: 'Avvatar 5kg Bucket', kicker: 'Mass Gainer', word: 'Gain', line: 'High-calorie gainer in a big 5 kg bucket.', l1: 'Feed your', l2: 'Dreams.', bg: photo('photo-1637430308606-86576d8fef3c') },
]
  .map((a) => ({ ...a, product: products.find((p) => p.name === a.name) }))
  .filter((a) => a.product);

// small selling-point chips, built only from real product data
const chipsFor = (p) => [
  p.imported && 'Imported',
  p.servings && `${p.servings} servings`,
  p.specifications['Pack size'] && `${p.specifications['Pack size']} pack`,
  p.discount > 0 && `${p.discount}% below MRP`,
  'Price listed upfront',
].filter(Boolean).slice(0, 3);

function Photo({ src }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img src={src} alt="" aria-hidden="true" draggable="false" loading="eager" decoding="async" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover opacity-45" />;
}

/**
 * The whole hero is an auto-moving ad slider. Moves right every SHOW_MS.
 * Press and hold anywhere on it to freeze the ad; it resumes on release.
 */
export default function HeroSlider() {
  // i = ad on screen, prev = ad that is leaving to the right
  const [pos, setPos] = useState({ i: 0, prev: null });
  const [held, setHeld] = useState(false);
  const count = ADS.length;
  const { i, prev } = pos;

  useEffect(() => {
    if (held || count < 2) return undefined;
    const t = setTimeout(() => setPos((s) => ({ i: (s.i + 1) % count, prev: s.i })), SHOW_MS);
    return () => clearTimeout(t);
  }, [i, held, count]);

  const goTo = (n) => {
    if (n === i) return;
    if (n === prev) {
      // that ad is parked on the right: send it back to the left first so it can glide in from there
      setPos({ i, prev: null });
      setTimeout(() => setPos((s) => ({ i: n, prev: s.i })), 60);
    } else {
      setPos((s) => ({ i: n, prev: s.i }));
    }
  };

  if (!count) return null;
  const hold = () => setHeld(true);
  const release = () => setHeld(false);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured products"
      onPointerDown={hold}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
      onContextMenu={(e) => e.preventDefault()}
      onFocus={(e) => e.target.matches(':focus-visible') && hold()}
      onBlur={release}
      style={{ touchAction: 'pan-y', WebkitTouchCallout: 'none' }}
      className="relative h-[760px] sm:h-[800px] lg:h-[100svh] lg:min-h-[700px] overflow-hidden bg-ink select-none"
    >
      <h1 className="sr-only">{site.brand}: gym supplements in Ferozepur</h1>

      {ADS.map((ad, k) => {
        const p = ad.product;
        const live = k === i || k === prev;
        const x = k === i ? '0%' : k === prev ? '100%' : '-100%';
        return (
        <motion.div
          key={p.id}
          initial={{ x: k === 0 ? '0%' : '-100%' }}
          animate={{ x }}
          transition={live ? { duration: SLIDE_SECONDS, ease: [0.45, 0, 0.25, 1] } : { duration: 0 }}
          className="absolute inset-0 will-change-transform"
          aria-label={`Ad ${k + 1} of ${count}`}
          aria-hidden={k !== i}
          inert={k !== i}
        >
          {/* ad backdrop: photo + dark fade + brand glow */}
          <Photo src={ad.bg} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/90 lg:hidden" aria-hidden="true" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-black via-black/75 to-black/25 lg:block" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_90%,rgba(229,9,11,.38),transparent_60%)]" aria-hidden="true" />
          <div className="absolute inset-0 knurl opacity-30" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-20 top-0 h-full w-24 -skew-x-12 bg-gold/10 lg:w-40" aria-hidden="true" />
          <span
            className="pointer-events-none absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(8rem,40vw,24rem)] font-black uppercase leading-none text-transparent"
            style={{ WebkitTextStroke: '2px rgba(245,182,66,.13)' }}
            aria-hidden="true"
          >{ad.word}</span>

          <div className="container-x relative flex h-full flex-col justify-between gap-3 pt-[88px] pb-14 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-6 lg:pt-24 lg:pb-10">
            <div className="contents lg:block">
              <div className="order-1 text-center lg:text-left">
                <p className="inline-block bg-flame px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-white">{ad.kicker}</p>
                <h2 className="mt-3 lg:mt-5 text-[clamp(3.4rem,15vw,5.75rem)] lg:text-[clamp(5.5rem,9.5vw,9.5rem)]">
                  {ad.l1}<br /><span className="text-gold">{ad.l2}</span>
                </h2>
                <p className="mx-auto mt-3 max-w-[22rem] text-base text-white/80 lg:mx-0 lg:mt-5 lg:max-w-md lg:text-xl">{ad.line}</p>
              </div>

              <div className="order-3 text-center lg:text-left lg:mt-8">
                <p className="mb-3 font-display text-2xl font-extrabold uppercase tracking-tight text-gold sm:text-3xl">{p.name}</p>
                <ul className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {chipsFor(p).map((c) => (
                    <li key={c} className="inline-flex items-center gap-1.5 border border-gold/40 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white sm:text-sm">
                      <BadgeCheck className="h-4 w-4 text-gold" aria-hidden="true" />{c}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <button type="button" onClick={() => buyProduct(p)} className="btn-primary flex-1 sm:flex-none min-w-[150px]">
                    <WhatsAppIcon className="w-5 h-5" /> Order Now
                  </button>
                  <Link to="/supplements" className="btn-ghost flex-1 sm:flex-none min-w-[150px]">Shop All <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            </div>

            {/* product shot + price sticker */}
            <div className="order-2 relative flex min-h-0 flex-1 items-center justify-center lg:flex-none lg:justify-self-end">
              <div className="relative aspect-[4/3] h-full max-h-[300px] sm:max-h-[360px] lg:h-auto lg:max-h-none lg:w-[min(46vw,600px)]">
                <ProductImage product={p} bare eager className="h-full w-full drop-shadow-[0_18px_40px_rgba(0,0,0,.7)]" />
                {(p.discount > 0 || p.imported) && (
                  <span className="absolute bottom-3 left-0 -rotate-6 bg-flame px-3 py-1.5 font-display text-xl font-extrabold uppercase text-white shadow-lg sm:text-2xl lg:bottom-6 lg:text-3xl">
                    {p.discount > 0 ? `${p.discount}% off MRP` : 'Imported'}
                  </span>
                )}
                <div className="absolute -top-1 right-0 sm:right-2 lg:right-6 lg:top-2 grid h-[92px] w-[92px] sm:h-[112px] sm:w-[112px] lg:h-[132px] lg:w-[132px] rotate-[10deg] place-items-center rounded-full bg-gold text-center text-black shadow-[0_8px_24px_rgba(0,0,0,.55)] ring-2 ring-black/30 ring-offset-2 ring-offset-gold/60">
                  <div className="leading-none">
                    {p.price != null && <span className="block text-[10px] sm:text-xs font-bold tracking-widest">ONLY</span>}
                    <span className="block font-display text-[1.6rem] sm:text-4xl lg:text-5xl font-black">{formatPrice(p)}</span>
                    {p.mrp && p.price != null && <span className="mt-0.5 block text-[10px] sm:text-xs font-semibold text-black/70">MRP <s>{inr(p.mrp)}</s></span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        );
      })}

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-black/75 backdrop-blur-sm">
        <div className="container-x flex min-h-11 flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 text-xs font-semibold text-white/85 sm:text-sm lg:justify-between">
          <span className="hidden items-center gap-1.5 sm:inline-flex"><MapPin className="h-4 w-4 text-gold" aria-hidden="true" />{site.shortBrand} · Kaccha Zira Road, Ferozepur</span>
          <a href={site.contact.phoneHref} className="inline-flex items-center gap-1.5 text-gold hover:text-white"><Phone className="h-4 w-4" aria-hidden="true" />Call {site.contact.phone}</a>
        </div>
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-12 z-10 flex justify-center gap-1" role="group" aria-label="Choose ad">
          {ADS.map((a, n) => (
            <button key={a.name} type="button" aria-label={`Show ad ${n + 1}: ${a.name}`} aria-current={n === i} onClick={() => goTo(n)} className="grid h-8 w-8 place-items-center">
              <span className={`block h-1.5 transition-all duration-300 ${n === i ? 'w-7 bg-gold' : 'w-3 bg-white/40'}`} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
