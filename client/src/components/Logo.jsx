import { site } from '../config/site';

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
        <rect x="5" y="1" width="14" height="4" fill="#fff" />
        <rect x="4" y="6" width="16" height="17" fill="#C6FF00" />
        <rect x="4" y="11" width="16" height="6" fill="#090909" />
      </svg>
      <span className="font-display font-black text-2xl tracking-wide leading-none">{site.brand}</span>
    </span>
  );
}
