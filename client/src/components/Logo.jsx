import { site } from '../config/site';

/** Compact logo for the navbar / footer: emblem image + wordmark. */
export default function Logo({ className = '', size = 'h-12 sm:h-14', showText = true }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/images/logo-240.jpg"
        srcSet="/images/logo-240.jpg 240w, /images/logo-480.jpg 480w"
        sizes="64px"
        alt={`${site.brand} logo`}
        width="240"
        height="226"
        className={`logo-blend ${size} w-auto`}
      />
      {showText && (
        <span className="hidden min-[360px]:block font-display font-black leading-[0.85] tracking-wide">
          <span className="block text-xl sm:text-2xl text-gold">PUNJABI</span>
          <span className="block text-xl sm:text-2xl text-flame">TADKA</span>
        </span>
      )}
    </span>
  );
}
