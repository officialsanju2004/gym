import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProductImage from './ProductImage';
import WhatsAppIcon from './WhatsAppIcon';
import { buyProduct } from '../utils/whatsapp';
import { formatPrice } from '../data/products';

/** variant: 'standard' (stacked) | 'wide' (image left, copy right on sm+) */
export default function ProductCard({ product, variant = 'standard', index = 0 }) {
  const wide = variant === 'wide';
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex bg-coal border border-line hover:border-lime/60 transition-colors duration-300 ${wide ? 'flex-col sm:flex-row sm:col-span-2' : 'flex-col'}`}
    >
      <Link to={`/equipment/${product.slug}`} tabIndex={-1} aria-hidden="true" className={`block overflow-hidden ${wide ? 'sm:w-1/2' : ''}`}>
        <div className={`${wide ? 'aspect-[4/3] sm:aspect-auto sm:h-full' : 'aspect-[4/3]'} overflow-hidden`}>
          <ProductImage product={product} className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
        </div>
      </Link>

      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${wide ? 'sm:w-1/2' : ''}`}>
        <p className="text-sm font-semibold text-lime">{product.category}</p>
        <h3 className="mt-2 text-3xl sm:text-4xl">
          <Link to={`/equipment/${product.slug}`} className="hover:text-lime transition-colors">{product.name}</Link>
        </h3>
        <p className="mt-3 text-mute leading-relaxed">{product.shortDescription}</p>
        <p className="mt-4 text-sm font-semibold">{formatPrice(product)}</p>

        <div className="mt-auto pt-6 flex flex-wrap gap-3">
          <Link to={`/equipment/${product.slug}`} className="btn-ghost !min-h-11 !px-4 flex-1 whitespace-nowrap">
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
