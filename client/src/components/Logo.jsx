import { site } from '../config/site';

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 24" className="w-9 h-5" aria-hidden="true">
        <rect x="0" y="8" width="3" height="8" fill="#C6FF00" />
        <rect x="5" y="3" width="5" height="18" fill="#C6FF00" />
        <rect x="10" y="10.5" width="20" height="3" fill="#fff" />
        <rect x="30" y="3" width="5" height="18" fill="#C6FF00" />
        <rect x="37" y="8" width="3" height="8" fill="#C6FF00" />
      </svg>
      <span className="font-display font-black text-2xl tracking-wide leading-none">{site.brand}</span>
    </span>
  );
}
