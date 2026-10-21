import { site } from '../config/site';

/** Full-size logo artwork. Responsive: pass `sizes` to match the rendered width. */
export default function LogoImage({ className = '', sizes = '(min-width:1024px) 520px, 90vw', eager = false, style }) {
  return (
    <img
      src="/images/logo-960.jpg"
      srcSet="/images/logo-480.jpg 480w, /images/logo-960.jpg 960w"
      sizes={sizes}
      alt={`${site.brand} logo — Fuel your body, feed your dreams`}
      width="960"
      height="902"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={style}
      className={`logo-blend h-auto w-full select-none ${className}`}
    />
  );
}
