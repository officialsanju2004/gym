import { useId } from 'react';

const GOLD = '#F5B642';
const GOLD_DEEP = '#C98A1B';
const RED = '#E5090B';

// Split a product name into at most 3 label lines and pick a font size that fits the label width.
function fitLabel(name, width, availH) {
  const words = name.replace(/\s*\(.*?\)\s*/g, ' ').trim().split(/\s+/);
  for (const fs of [30, 26, 22, 19, 16, 14]) {
    const maxChars = Math.floor(width / (fs * 0.47));
    const lines = [];
    let cur = '';
    for (const wd of words) {
      if (!cur) cur = wd;
      else if ((cur + ' ' + wd).length <= maxChars) cur += ' ' + wd;
      else { lines.push(cur); cur = wd; }
    }
    if (cur) lines.push(cur);
    if (lines.length <= 3 && lines.length * fs * 0.95 <= availH && lines.every((l) => l.length <= maxChars)) return { lines, fs };
  }
  return { lines: [words.join(' ').slice(0, 22)], fs: 14 };
}

/**
 * Generated pack illustration for a product (tub / bucket / jar / pouch) in the brand colours.
 * Used when no real photo is available, so every product always has an image.
 */
export default function ProductArt({ product, className = '', bare = false }) {
  const uid = useId().replace(/[^a-z0-9]/gi, '');
  const g = (n) => `${n}-${uid}`;
  const shape = product.shape || 'tub';
  const dims = {
    tub: { x: 120, w: 160, top: 76, bottom: 252, lab: [104, 232] },
    bucket: { x: 98, w: 204, top: 84, bottom: 254, lab: [110, 234] },
    jar: { x: 140, w: 120, top: 98, bottom: 252, lab: [126, 238] },
    pouch: { x: 116, w: 168, top: 56, bottom: 254, lab: [96, 234] },
  }[shape];
  const cx = 200;
  const labW = dims.w - 22;
  const labTop = dims.lab[0];
  const labBot = dims.lab[1];
  const areaTop = labTop + 38; // below the brand line
  const areaBot = labBot - 26; // above the category line
  const { lines, fs } = fitLabel(product.name, labW, areaBot - areaTop);
  const textBlock = lines.length * fs * 0.95;
  const firstY = areaTop + (areaBot - areaTop - textBlock) / 2 + fs * 0.82;

  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label={`${product.name} — ${product.category} (illustration)`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={g('glow')} cx="50%" cy="100%" r="75%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.55" />
          <stop offset="55%" stopColor={RED} stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g('body')} x1="0" x2="1">
          <stop offset="0" stopColor="#070505" />
          <stop offset="0.38" stopColor="#2a2220" />
          <stop offset="1" stopColor="#060404" />
        </linearGradient>
        <linearGradient id={g('gold')} x1="0" x2="1">
          <stop offset="0" stopColor={GOLD_DEEP} />
          <stop offset="0.45" stopColor="#FFD67A" />
          <stop offset="1" stopColor={GOLD_DEEP} />
        </linearGradient>
        <pattern id={g('hatch')} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="9" stroke={GOLD} strokeOpacity="0.07" strokeWidth="1" />
        </pattern>
      </defs>

      {!bare && (
        <>
          <rect width="400" height="300" fill="#050303" />
          <rect width="400" height="300" fill={`url(#${g('hatch')})`} />
          <rect width="400" height="300" fill={`url(#${g('glow')})`} />
          <circle cx="200" cy="150" r="128" fill="none" stroke={GOLD} strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="138" fill="none" stroke={RED} strokeOpacity="0.45" strokeWidth="1" />
        </>
      )}
      <ellipse cx={cx} cy={dims.bottom + 6} rx={dims.w / 2 + 14} ry="9" fill="#000" opacity="0.7" />

      {/* Container */}
      {shape === 'pouch' ? (
        <g>
          <path d={`M${dims.x} ${dims.top + 14} L${dims.x + dims.w} ${dims.top + 14} L${dims.x + dims.w - 6} ${dims.bottom} Q${cx} ${dims.bottom + 8} ${dims.x + 6} ${dims.bottom} Z`} fill={`url(#${g('body')})`} stroke="#3a2f2b" strokeWidth="1.5" />
          <rect x={dims.x - 2} y={dims.top} width={dims.w + 4} height="16" rx="3" fill={`url(#${g('gold')})`} />
          {Array.from({ length: 14 }).map((_, i) => <line key={i} x1={dims.x + 8 + i * 11.5} y1={dims.top + 2} x2={dims.x + 8 + i * 11.5} y2={dims.top + 14} stroke="#000" strokeOpacity="0.35" />)}
        </g>
      ) : shape === 'jar' ? (
        <g>
          <rect x={dims.x + 8} y="58" width={dims.w - 16} height="42" rx="7" fill={`url(#${g('gold')})`} />
          {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={dims.x + 16 + i * 10} y1="62" x2={dims.x + 16 + i * 10} y2="96" stroke="#000" strokeOpacity="0.25" />)}
          <rect x={dims.x} y={dims.top + 4} width={dims.w} height={dims.bottom - dims.top - 4} rx="16" fill={`url(#${g('body')})`} stroke="#3a2f2b" strokeWidth="1.5" />
        </g>
      ) : (
        <g>
          {shape === 'bucket' && <path d={`M${dims.x + 10} ${dims.top - 6} Q${cx} 20 ${dims.x + dims.w - 10} ${dims.top - 6}`} fill="none" stroke={GOLD_DEEP} strokeWidth="5" strokeLinecap="round" />}
          <rect x={dims.x - 4} y={dims.top - 30} width={dims.w + 8} height="34" rx="8" fill={`url(#${g('gold')})`} />
          <rect x={dims.x - 4} y={dims.top - 2} width={dims.w + 8} height="6" fill="#000" opacity="0.35" />
          <rect x={dims.x} y={dims.top + 4} width={dims.w} height={dims.bottom - dims.top - 4} rx="14" fill={`url(#${g('body')})`} stroke="#3a2f2b" strokeWidth="1.5" />
          <text x={cx} y={dims.top - 7} textAnchor="middle" fontFamily="Big Shoulders Display, sans-serif" fontWeight="900" fontSize="20" fill="#120c0a" letterSpacing="2">PT</text>
        </g>
      )}

      {/* Label */}
      <rect x={dims.x + 4} y={labTop} width={dims.w - 8} height={labBot - labTop} fill="#0b0807" stroke="#3a2f2b" strokeWidth="1.5" />
      <rect x={dims.x + 4} y={labTop} width={dims.w - 8} height="9" fill={RED} />
      <rect x={dims.x + 4} y={labBot - 9} width={dims.w - 8} height="9" fill={GOLD} />
      <text x={cx} y={labTop + 28} textAnchor="middle" fontFamily="Big Shoulders Display, sans-serif" fontWeight="800" fontSize="13" letterSpacing="3" fill={GOLD}>PUNJABI TADKA</text>
      {lines.map((l, i) => (
        <text key={i} x={cx} y={firstY + i * fs * 0.95} textAnchor="middle" fontFamily="Big Shoulders Display, sans-serif" fontWeight="900" fontSize={fs} fill="#fff">{l.toUpperCase()}</text>
      ))}
      <text x={cx} y={labBot - 16} textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="10" letterSpacing="1.5" fill="#b9aaa3">{product.category.replace('Nutrition & Vitamins', 'Vitamins').toUpperCase()}</text>

      {/* Highlight */}
      <rect x={dims.x + 10} y={dims.top + 12} width="7" height={dims.bottom - dims.top - 26} rx="3.5" fill="#fff" opacity="0.07" />
    </svg>
  );
}
