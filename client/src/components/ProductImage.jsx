import { useState } from 'react';
import { Dumbbell, FlaskConical, Zap, Droplets, Flame, Pill, Fish, Cookie, GlassWater, Atom } from 'lucide-react';

const icons = {
  protein: Dumbbell, gainer: Flame, creatine: FlaskConical, preworkout: Zap, amino: Droplets,
  glutamine: Atom, vitamin: Pill, omega: Fish, bar: Cookie, shaker: GlassWater,
};

/** Real photo if present; otherwise a designed placeholder (never a broken image). */
export default function ProductImage({ product, src, className = '', eager = false, iconSize = 'w-16 h-16' }) {
  const [failed, setFailed] = useState(false);
  const Icon = icons[product.icon] || Dumbbell;
  const url = src || product.images[0];

  if (failed) {
    return (
      <div role="img" aria-label={`${product.name} (photo coming soon)`} className={`relative overflow-hidden bg-steel knurl grid place-items-center ${className}`}>
        <div className="absolute -right-1/4 -bottom-1/3 w-[85%] aspect-square rounded-full border-[14px] border-white/[0.04]" />
        <div className="absolute -right-[10%] -bottom-[18%] w-[55%] aspect-square rounded-full border-[8px] border-lime/10" />
        <Icon className={`${iconSize} text-lime/80 relative`} strokeWidth={1.25} aria-hidden="true" />
      </div>
    );
  }
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
