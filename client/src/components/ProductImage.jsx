import { useState } from 'react';
import ProductArt from './ProductArt';

/**
 * Real photo when the product has one (product.images or the `src` prop);
 * otherwise (or if it fails to load) the generated pack illustration. Never a broken image.
 */
export default function ProductImage({ product, src, className = '', eager = false, bare = false }) {
  const [failed, setFailed] = useState(false);
  const url = src || product.images?.[0];

  if (!url || failed) return <ProductArt product={product} bare={bare} className={`${bare ? '' : 'bg-black'} ${className}`} />;
  return (
    <img
      src={url}
      alt={`${product.name} — ${product.category}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      width="800"
      height="600"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
