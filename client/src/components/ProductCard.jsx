import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProductImage from './ProductImage';
import WhatsAppIcon from './WhatsAppIcon';
import { buyProduct } from '../utils/whatsapp';
import { inr, formatPrice } from '../data/products';

/** variant: 'standard' (stacked) | 'wide' (image left, copy right on sm+) */
export default function ProductCard({ product, variant = 'standard', index = 0 }) {
  const wide = variant === 'wide';
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex bg-coal border border-line hover:border-gold/60 transition-colors duration-300 ${wide ? 'flex-col sm:flex-row sm:col-span-2' : 'flex-col'}`}
    >
      <Link to={`/supplements/${product.slug}`} tabIndex={-1} aria-hidden="true" className={`relative block overflow-hidden ${wide ? 'sm:w-1/2' : ''}`}>
        <div className={`${wide ? 'aspect-[4/3] sm:aspect-auto sm:h-full' : 'aspect-[4/3]'} overflow-hidden`}>
          <ProductImage product={product} className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
        </div>
        {product.imported && <span className="absolute left-3 top-3 bg-flame px-2.5 py-1 text-xs font-bold text-white">Imported</span>}
        {product.discount > 0 && <span className="absolute right-3 top-3 bg-gold px-2.5 py-1 text-xs font-bold text-black">{product.discount}% off MRP</span>}
      </Link>

      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${wide ? 'sm:w-1/2' : ''}`}>
        <p className="text-sm font-semibold text-gold">{product.category}</p>
        <h3 className="mt-2 text-3xl sm:text-4xl">
          <Link to={`/supplements/${product.slug}`} className="hover:text-gold transition-colors">{product.name}</Link>
        </h3>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="font-display text-3xl font-extrabold text-white">{formatPrice(product)}</p>
          {product.mrp && product.price != null && <p className="text-sm text-mute">MRP <s>{inr(product.mrp)}</s></p>}
        </div>
        {product.servings && <p className="mt-1 text-sm text-mute">{product.servings} servings</p>}

        <div className="mt-auto pt-6 flex flex-wrap gap-3">
          <Link to={`/supplements/${product.slug}`} className="btn-ghost !min-h-11 !px-4 flex-1 whitespace-nowrap">
            View Details <ArrowUpRight className="w-4 h-4" />
          </Link>
          <button type="button" onClick={() => buyProduct(product)} className="btn-primary !min-h-11 !px-4 flex-1 whitespace-nowrap">
            <WhatsAppIcon className="w-4 h-4" /> Buy Now
          </button>
        </div>
      </div>
    </motion.article>
  );
}
