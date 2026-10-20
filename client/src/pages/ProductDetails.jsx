import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, Check, Info } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { getProduct, relatedProducts, formatPrice } from '../data/products';
import { buyProduct } from '../utils/whatsapp';
import { useSEO } from '../hooks/useSEO';
import NotFound from './NotFound';

function Details({ product }) {
  const [active, setActive] = useState(0);
  const [variant, setVariant] = useState(product.variants[0] || '');
  useSEO({ title: product.name, description: product.shortDescription, path: `/equipment/${product.slug}` });

  const buy = () => buyProduct(variant ? { ...product, name: `${product.name} (${variant})` } : product);
  const rel = relatedProducts(product);

  return (
    <>
      <div className="container-x pt-28 pb-24">
        <Link to="/equipment" className="inline-flex items-center gap-1 text-mute hover:text-lime min-h-11"><ChevronLeft className="w-4 h-4" /> All equipment</Link>

        <div className="mt-4 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <div className="relative aspect-[4/3] border border-line overflow-hidden bg-coal">
              <AnimatePresence mode="wait">
                <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <ProductImage product={product} src={product.images[active]} eager iconSize="w-28 h-28" className="w-full h-full" />
                </motion.div>
              </AnimatePresence>
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {product.images.map((src, i) => (
                  <button key={src} type="button" onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`} aria-current={i === active}
                    className={`aspect-[4/3] overflow-hidden border-2 transition-colors ${i === active ? 'border-lime' : 'border-line hover:border-white/40'}`}>
                    <ProductImage product={product} src={src} className="w-full h-full" iconSize="w-8 h-8" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-lime">{product.category}</p>
            <h1 className="mt-2 text-6xl sm:text-7xl">{product.name}</h1>
            <p className="mt-6 text-mute text-lg leading-relaxed">{product.description}</p>
            <p className="mt-6 text-2xl font-display font-extrabold uppercase">{formatPrice(product)}</p>
            <p className="text-sm text-mute mt-1">{product.availability}</p>

            {product.variants.length > 0 && (
              <fieldset className="mt-7">
                <legend className="label">Variant</legend>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button key={v} type="button" aria-pressed={variant === v} onClick={() => setVariant(v)}
                      className={`min-h-11 px-4 text-sm font-semibold border transition-colors ${variant === v ? 'border-lime text-lime' : 'border-line text-mute hover:text-white'}`}>{v}</button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={buy} className="btn-wa flex-1 sm:flex-none"><WhatsAppIcon className="w-5 h-5" /> Buy Now on WhatsApp</button>
              <Link to="/contact" className="btn-ghost flex-1 sm:flex-none">Product enquiry</Link>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="feat">
            <h2 id="feat" className="text-4xl">Key features</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {product.features.map((f) => <li key={f} className="flex gap-3 py-4"><Check className="w-5 h-5 text-lime shrink-0 mt-0.5" />{f}</li>)}
            </ul>
          </section>
          <section aria-labelledby="spec">
            <h2 id="spec" className="text-4xl">Specifications</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {Object.entries(product.specifications).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-4"><dt className="text-mute">{k}</dt><dd className="font-semibold text-right">{v}</dd></div>
              ))}
            </dl>
            {product.specsAreSample && (
              <p className="mt-4 flex gap-2 text-sm text-mute"><Info className="w-4 h-4 shrink-0 mt-0.5" /> Sample figures for illustration. Ask us for confirmed specifications before you buy.</p>
            )}
          </section>
        </div>

        <section className="mt-24" aria-labelledby="rel">
          <h2 id="rel" className="text-5xl">Related equipment</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rel.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
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
