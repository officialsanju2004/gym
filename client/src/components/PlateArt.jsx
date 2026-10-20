import { motion } from 'framer-motion';

/** Illustrated Olympic plate — the brand's recurring visual until real photography is supplied. */
export default function PlateArt({ rotate, className = '' }) {
  const ticks = Array.from({ length: 60 });
  return (
    <motion.svg viewBox="0 0 400 400" className={className} style={{ rotate }} role="img" aria-label="Illustration of an Olympic weight plate">
      <defs>
        <radialGradient id="plateBody" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#0f0f0f" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="196" fill="url(#plateBody)" stroke="#2f2f2f" strokeWidth="2" />
      <circle cx="200" cy="200" r="178" fill="none" stroke="#C6FF00" strokeWidth="5" />
      {ticks.map((_, i) => (
        <line key={i} x1="200" y1="30" x2="200" y2={i % 5 === 0 ? 48 : 40} stroke="#555" strokeWidth={i % 5 === 0 ? 3 : 1.5}
          transform={`rotate(${i * 6} 200 200)`} />
      ))}
      <circle cx="200" cy="200" r="120" fill="none" stroke="#2f2f2f" strokeWidth="2" />
      <circle cx="200" cy="200" r="70" fill="#141414" stroke="#333" strokeWidth="2" />
      <text x="200" y="196" textAnchor="middle" fontFamily="Big Shoulders Display, sans-serif" fontWeight="900" fontSize="46" fill="#fff">45</text>
      <text x="200" y="222" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="13" fill="#C6FF00">LB / 20 KG</text>
      <circle cx="200" cy="200" r="22" fill="#090909" stroke="#444" strokeWidth="2" />
    </motion.svg>
  );
}
