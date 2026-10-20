import { motion } from 'framer-motion';

/** Illustrated supplement tub — the brand's recurring visual until real photography is supplied. */
export default function TubArt({ rotate, className = '' }) {
  return (
    <motion.svg viewBox="0 0 400 400" className={className} style={{ rotate }} role="img" aria-label="Illustration of a supplement tub">
      <defs>
        <linearGradient id="tubBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0f0f0f" />
          <stop offset="35%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </linearGradient>
        <linearGradient id="tubLid" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e9e9e9" />
          <stop offset="40%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#bdbdbd" />
        </linearGradient>
      </defs>
      {/* Lid */}
      <rect x="95" y="38" width="210" height="48" rx="8" fill="url(#tubLid)" />
      <rect x="95" y="78" width="210" height="8" fill="#9a9a9a" opacity="0.5" />
      {/* Body */}
      <rect x="85" y="86" width="230" height="286" rx="14" fill="url(#tubBody)" stroke="#2f2f2f" strokeWidth="2" />
      {/* Label */}
      <rect x="85" y="140" width="230" height="170" fill="#141414" stroke="#2f2f2f" strokeWidth="2" />
      <rect x="85" y="140" width="230" height="10" fill="#C6FF00" />
      <rect x="85" y="300" width="230" height="10" fill="#C6FF00" />
      <text x="200" y="215" textAnchor="middle" fontFamily="Big Shoulders Display, sans-serif" fontWeight="900" fontSize="64" fill="#fff">WHEY</text>
      <text x="200" y="252" textAnchor="middle" fontFamily="Big Shoulders Display, sans-serif" fontWeight="800" fontSize="30" fill="#C6FF00" letterSpacing="4">PROTEIN</text>
      <text x="200" y="282" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="12" fill="#a3a3a3" letterSpacing="2">ILLUSTRATION</text>
      {/* Highlight */}
      <rect x="105" y="100" width="10" height="260" rx="5" fill="#ffffff" opacity="0.06" />
    </motion.svg>
  );
}
