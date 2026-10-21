import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, Check, Info, Phone, AlertTriangle } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { getProduct, relatedProducts, formatPrice, inr, PRICE_NOTE } from '../data/products';
import { site } from '../config/site';
import { buyProduct } from '../utils/whatsapp';
import { useSEO } from '../hooks/useSEO';
import NotFound from './NotFound';

function Details({ product }) {
  const [active, setActive] = useState(0);
  useSEO({ title: product.name, description: product.shortDescription, path: `/supplements/${product.slug}` });

  const buy = () => buyProduct(product);
  const rel = relatedProducts(product);

  return (
    <>
      <div className="container-x pt-28 pb-24">
        <Link to="/supplements" className="inline-flex items-center gap-1 text-mute hover:text-gold min-h-11"><ChevronLeft className="w-4 h-4" /> All supplements</Link>

        <div className="mt-4 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <div className="relative aspect-[4/3] border border-line overflow-hidden bg-coal">
              <AnimatePresence mode="wait">
                <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <ProductImage product={product} src={product.images[active]} eager className="w-full h-full" />
                </motion.div>
              </AnimatePresence>
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {product.images.map((src, i) => (
                  <button key={src} type="button" onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`} aria-current={i === active}
                    className={`aspect-[4/3] overflow-hidden border-2 transition-colors ${i === active ? 'border-gold' : 'border-line hover:border-white/40'}`}>
                    <ProductImage product={product} src={src} className="w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-gold">{product.category}</p>
            <h1 className="mt-2 text-6xl sm:text-7xl">{product.name}</h1>
            <p className="mt-6 text-mute text-lg leading-relaxed">{product.description}</p>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p className="text-5xl font-display font-extrabold">{formatPrice(product)}</p>
              {product.mrp && product.price != null && <p className="text-mute">MRP <s>{inr(product.mrp)}</s></p>}
              {product.discount > 0 && <span className="bg-gold px-2.5 py-1 text-xs font-bold text-black">{product.discount}% off MRP</span>}
              {product.imported && <span className="bg-flame px-2.5 py-1 text-xs font-bold text-white">Imported</span>}
            </div>
            <p className="text-sm text-mute mt-2">{product.availability}</p>
            {product.notes && (
              <p className="mt-5 flex gap-2 border border-gold/40 bg-gold/10 p-4 text-sm text-white"><AlertTriangle className="w-5 h-5 shrink-0 text-gold" aria-hidden="true" />{product.notes}</p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={buy} className="btn-wa flex-1 sm:flex-none"><WhatsAppIcon className="w-5 h-5" /> Buy Now on WhatsApp</button>
              <a href={site.contact.phoneHref} className="btn-primary flex-1 sm:flex-none"><Phone className="w-4 h-4" /> Call {site.contact.phone}</a>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="feat">
            <h2 id="feat" className="text-4xl">Key features</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {product.features.map((f) => <li key={f} className="flex gap-3 py-4"><Check className="w-5 h-5 text-gold shrink-0 mt-0.5" />{f}</li>)}
            </ul>
          </section>
          <section aria-labelledby="spec">
            <h2 id="spec" className="text-4xl">Product details</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {Object.entries(product.specifications).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-4"><dt className="text-mute">{k}</dt><dd className="font-semibold text-right">{v}</dd></div>
              ))}
            </dl>
            <p className="mt-4 flex gap-2 text-sm text-mute"><Info className="w-4 h-4 shrink-0 mt-0.5" /> {PRICE_NOTE} Pack images are illustrations — real packaging may differ. Check the label for ingredients and nutrition facts.</p>
          </section>
        </div>

        <p className="mt-16 flex gap-2 text-sm text-mute max-w-3xl">
          <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          Supplements are not a substitute for a varied diet or medical advice. Read the label before use, and speak to a doctor or pharmacist first if you are pregnant, breastfeeding, under 18, on medication or have a medical condition.
        </p>

        {rel.length > 0 && <section className="mt-16" aria-labelledby="rel">
          <h2 id="rel" className="text-5xl">More in {product.category}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rel.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>}
      </div>
    </>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProduct(slug);
  if (!product) return <NotFound what="product" />;
  return <Details key={product.slug} product={product} />;
}
