import { useId } from 'react';

// Original vector illustrations in the logo's palette (black, gold, red).
// Each scene is drawn for a specific section of the site; the logo itself is only used in the navbar and footer.
const GOLD = '#F5B642';
const GOLD_D = '#C98A1B';
const RED = '#E5090B';
const RED_D = '#7d0407';
const INK = '#070505';

function Defs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}gold`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFE29A" /><stop offset=".5" stopColor={GOLD} /><stop offset="1" stopColor={GOLD_D} />
      </linearGradient>
      <linearGradient id={`${id}dark`} x1="0" x2="1">
        <stop offset="0" stopColor={INK} /><stop offset=".4" stopColor="#2e2523" /><stop offset="1" stopColor="#060404" />
      </linearGradient>
      <linearGradient id={`${id}red`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ff3b2f" /><stop offset="1" stopColor={RED_D} />
      </linearGradient>
      <linearGradient id={`${id}flame`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={RED} /><stop offset=".55" stopColor="#FF7A00" /><stop offset="1" stopColor="#FFD34D" />
      </linearGradient>
      <radialGradient id={`${id}glow`}>
        <stop offset="0" stopColor={RED} stopOpacity=".55" /><stop offset="1" stopColor={RED} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}gglow`}>
        <stop offset="0" stopColor={GOLD} stopOpacity=".3" /><stop offset="1" stopColor={GOLD} stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}blur`}><feGaussianBlur stdDeviation="9" /></filter>
    </defs>
  );
}

const u = (id, n) => `url(#${id}${n})`;
const display = { fontFamily: 'Big Shoulders Display, Arial Narrow, sans-serif', fontWeight: 900 };

/* ---------- primitives ---------- */
function Flame({ id, x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 C-34 -18 -40 -62 -12 -112 C-10 -78 6 -72 14 -100 C42 -64 44 -20 0 0Z" fill={u(id, 'flame')} />
      <path d="M0 -4 C-16 -14 -18 -36 -4 -58 C-2 -42 6 -40 9 -52 C20 -34 18 -12 0 -4Z" fill="#FFE08A" opacity=".9" />
    </g>
  );
}
const FlameRow = ({ id, x, y, n = 5, gap = 44, s = 1 }) =>
  Array.from({ length: n }).map((_, i) => <Flame key={i} id={id} x={x + i * gap} y={y + (i % 2) * 8} s={s * (0.8 + ((i * 37) % 5) / 12)} />);

function Tub({ id, x, y, w, h, name = 'WHEY', sub = 'PROTEIN', fs = 34 }) {
  const lidH = h * 0.13;
  const labY = y + h * 0.3;
  const labH = h * 0.5;
  return (
    <g>
      <ellipse cx={x + w / 2} cy={y + h + 6} rx={w * 0.62} ry="9" fill="#000" opacity=".6" />
      <rect x={x - 4} y={y} width={w + 8} height={lidH} rx="9" fill={u(id, 'gold')} />
      <rect x={x} y={y + lidH - 2} width={w} height={h - lidH + 2} rx="14" fill={u(id, 'dark')} stroke="#3a2f2b" strokeWidth="2" />
      <rect x={x + 4} y={labY} width={w - 8} height={labH} fill="#0b0807" stroke="#3a2f2b" strokeWidth="1.5" />
      <rect x={x + 4} y={labY} width={w - 8} height="10" fill={RED} />
      <rect x={x + 4} y={labY + labH - 10} width={w - 8} height="10" fill={GOLD} />
      <text x={x + w / 2} y={labY + labH * 0.52} textAnchor="middle" fontSize={fs} fill="#fff" style={display}>{name}</text>
      <text x={x + w / 2} y={labY + labH * 0.52 + fs * 0.62} textAnchor="middle" fontSize={fs * 0.5} fill={GOLD} letterSpacing="3" style={display}>{sub}</text>
      <rect x={x + 12} y={y + lidH + 8} width="8" height={h - lidH - 24} rx="4" fill="#fff" opacity=".07" />
    </g>
  );
}

function Shaker({ id, x, y, w, h }) {
  return (
    <g>
      <ellipse cx={x + w / 2} cy={y + h + 6} rx={w * 0.6} ry="8" fill="#000" opacity=".6" />
      <rect x={x + w * 0.3} y={y - 16} width={w * 0.4} height="20" rx="6" fill="#120d0b" stroke={GOLD_D} strokeWidth="2" />
      <rect x={x - 4} y={y} width={w + 8} height={h * 0.16} rx="8" fill={u(id, 'gold')} />
      <path d={`M${x} ${y + h * 0.15} L${x + w} ${y + h * 0.15} L${x + w - 8} ${y + h} L${x + 8} ${y + h} Z`} fill={u(id, 'dark')} stroke="#3a2f2b" strokeWidth="2" />
      <text x={x + w / 2} y={y + h * 0.5} textAnchor="middle" fontSize={w * 0.34} fill={GOLD} style={display}>PT</text>
      <rect x={x + 6} y={y + h * 0.62} width={w - 12} height="8" fill={RED} />
      {[0.72, 0.8, 0.88].map((t) => <line key={t} x1={x + w - 26} x2={x + w - 10} y1={y + h * t} y2={y + h * t} stroke={GOLD} strokeOpacity=".5" strokeWidth="2" />)}
    </g>
  );
}

function Chili({ x, y, s = 1, rot = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C60 -18 150 10 190 70 C204 92 180 104 162 88 C128 56 60 40 0 36 C-14 30 -14 6 0 0Z" fill="url(#chiliGrad)" />
      <path d="M12 6 C70 -4 140 14 176 56" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" />
      <path d="M2 2 C-6 -10 -2 -24 10 -34 C12 -22 20 -16 30 -14 C22 -8 14 0 2 2Z" fill="#3c7d2a" />
      <defs><linearGradient id="chiliGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff4a3a" /><stop offset=".6" stopColor={RED} /><stop offset="1" stopColor={RED_D} /></linearGradient></defs>
    </g>
  );
}

function PlateSide({ id, x, y, h, w = 34 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={u(id, 'dark')} stroke={GOLD} strokeWidth="3" />
      <rect x={x + w * 0.3} y={y + 10} width="5" height={h - 20} rx="2.5" fill={GOLD} opacity=".5" />
    </g>
  );
}

function Barbell({ id, x1, x2, y, big = 170, small = 120 }) {
  return (
    <g>
      <rect x={x1} y={y - 7} width={x2 - x1} height="14" rx="7" fill={u(id, 'gold')} />
      <PlateSide id={id} x={x1 + 18} y={y - big / 2} h={big} />
      <PlateSide id={id} x={x1 + 56} y={y - small / 2} h={small} w={26} />
      <rect x={x1 + 86} y={y - 14} width="12" height="28" rx="3" fill={GOLD_D} />
      <PlateSide id={id} x={x2 - 52} y={y - big / 2} h={big} />
      <PlateSide id={id} x={x2 - 82} y={y - small / 2} h={small} w={26} />
      <rect x={x2 - 98} y={y - 14} width="12" height="28" rx="3" fill={GOLD_D} />
    </g>
  );
}

function Sparks({ seed = 1, n = 18, w = 600, h = 600 }) {
  return Array.from({ length: n }).map((_, i) => {
    const a = ((i * 9301 + seed * 49297) % 233280) / 233280;
    const b = ((i * 4271 + seed * 1237) % 9973) / 9973;
    return <circle key={i} cx={a * w} cy={b * h} r={1.2 + ((i * 7) % 4)} fill={i % 3 ? GOLD : RED} opacity={0.35 + ((i * 13) % 6) / 10} />;
  });
}

function Emblem({ id, glowY = 300 }) {
  return (
    <>
      <circle cx="300" cy={glowY} r="260" fill={u(id, 'glow')} />
      <circle cx="300" cy="300" r="268" fill="none" stroke={u(id, 'gold')} strokeWidth="7" />
      <circle cx="300" cy="300" r="256" fill="none" stroke={RED} strokeWidth="3" strokeOpacity=".8" />
    </>
  );
}

/* ---------- scenes ---------- */
const scenes = {
  // Home hero: the supplement stack, ready to train
  hero: {
    label: 'A tub of whey protein and a shaker in front of a barbell and flames',
    box: '0 0 600 600',
    draw: (id) => (
      <>
        <Emblem id={id} />
        <Sparks seed={3} />
        <FlameRow id={id} x={150} y={470} n={7} gap={50} s={1.35} />
        <Tub id={id} x={205} y={140} w={190} h={300} name="WHEY" sub="PROTEIN" fs={44} />
        <Shaker id={id} x={420} y={230} w={82} h={210} />
        <Barbell id={id} x1={40} x2={560} y={455} />
        <Chili x={230} y={398} s={0.95} rot={-8} />
      </>
    ),
  },
  // Home "built for people who train": shaker, scoop and powder
  story: {
    label: 'A protein shaker, scoop of powder and a red chilli',
    box: '0 0 600 600',
    draw: (id) => (
      <>
        <Emblem id={id} />
        <Sparks seed={7} />
        <FlameRow id={id} x={90} y={500} n={9} gap={52} s={1.1} />
        <Tub id={id} x={70} y={230} w={120} h={210} name="MASS" sub="GAINER" fs={30} />
        <Shaker id={id} x={230} y={120} w={140} h={330} />
        <path d="M400 470 C410 410 470 400 500 420 C530 400 560 430 550 470 Z" fill={u(id, 'gold')} />
        <circle cx="450" cy="412" r="38" fill="#0b0807" stroke={GOLD} strokeWidth="5" />
        <rect x="486" y="372" width="70" height="12" rx="6" transform="rotate(-35 486 372)" fill={GOLD_D} />
        <Chili x={140} y={470} s={0.8} rot={-4} />
      </>
    ),
  },
  // Home "why choose us": quality shield
  why: {
    label: 'A gold quality shield with a tick, flanked by a protein tub and a dumbbell',
    box: '0 0 600 520',
    draw: (id) => (
      <>
        <circle cx="300" cy="260" r="230" fill={u(id, 'glow')} />
        <Sparks seed={11} n={14} h={520} />
        <path d="M300 40 L470 100 V250 C470 350 400 420 300 470 C200 420 130 350 130 250 V100 Z" fill={u(id, 'dark')} stroke={u(id, 'gold')} strokeWidth="10" strokeLinejoin="round" />
        <path d="M300 70 L444 120 V250 C444 332 386 394 300 438 C214 394 156 332 156 250 V120 Z" fill="none" stroke={RED} strokeWidth="3" />
        <path d="M222 252 L280 312 L388 190" fill="none" stroke={u(id, 'gold')} strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
        <Tub id={id} x={20} y={290} w={90} h={150} name="PRO" sub="WHEY" fs={24} />
        <g transform="translate(470 395)">
          <rect x="0" y="12" width="14" height="52" rx="3" fill={u(id, 'gold')} /><rect x="18" y="0" width="14" height="76" rx="3" fill={u(id, 'dark')} stroke={GOLD} strokeWidth="2" />
          <rect x="32" y="30" width="46" height="16" fill={GOLD_D} />
          <rect x="78" y="0" width="14" height="76" rx="3" fill={u(id, 'dark')} stroke={GOLD} strokeWidth="2" /><rect x="96" y="12" width="14" height="52" rx="3" fill={u(id, 'gold')} />
        </g>
      </>
    ),
  },
  // Home enquiry: call / WhatsApp
  enquiry: {
    label: 'A phone showing a chat about supplements',
    box: '0 0 600 520',
    draw: (id) => (
      <>
        <circle cx="300" cy="260" r="230" fill={u(id, 'glow')} />
        <Sparks seed={5} n={14} h={520} />
        <rect x="190" y="30" width="220" height="440" rx="34" fill="#0b0807" stroke={u(id, 'gold')} strokeWidth="8" />
        <rect x="262" y="42" width="76" height="10" rx="5" fill="#2a2321" />
        <rect x="204" y="70" width="192" height="46" fill={RED} opacity=".9" />
        <text x="300" y="102" textAnchor="middle" fontSize="22" fill="#fff" letterSpacing="2" style={display}>PUNJABI TADKA</text>
        <rect x="214" y="136" width="130" height="50" rx="14" fill="#241c1a" /><rect x="228" y="154" width="90" height="8" rx="4" fill="#6b5a54" />
        <rect x="256" y="204" width="132" height="62" rx="14" fill="#25d366" /><rect x="270" y="222" width="100" height="8" rx="4" fill="#0b3d1d" /><rect x="270" y="238" width="64" height="8" rx="4" fill="#0b3d1d" />
        <rect x="214" y="284" width="150" height="50" rx="14" fill="#241c1a" /><rect x="228" y="302" width="110" height="8" rx="4" fill="#6b5a54" />
        <Tub id={id} x={236} y={350} w={44} h={76} name="" sub="" fs={10} />
        <rect x="300" y="370" width="84" height="40" rx="10" fill={u(id, 'gold')} />
        <text x="342" y="398" textAnchor="middle" fontSize="20" fill="#000" style={display}>₹ PRICE</text>
        <g transform="translate(70 330)"><rect x="0" y="20" width="16" height="60" rx="3" fill={u(id, 'gold')} /><rect x="20" y="0" width="16" height="100" rx="3" fill={u(id, 'dark')} stroke={GOLD} strokeWidth="2" /><rect x="36" y="42" width="60" height="16" fill={GOLD_D} /></g>
        <Flame id={id} x={500} y={440} s={1.1} /><Flame id={id} x={540} y={452} s={0.8} />
      </>
    ),
  },
  // About hero: gym gear
  about: {
    label: 'A kettlebell, weight plates and a lightning bolt',
    box: '0 0 600 600',
    draw: (id) => (
      <>
        <Emblem id={id} />
        <Sparks seed={9} />
        <path d="M330 70 L210 300 H300 L260 520 L410 250 H318 Z" fill={u(id, 'gold')} opacity=".16" />
        <FlameRow id={id} x={110} y={500} n={8} gap={52} s={1.2} />
        {/* weight plate stack */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={380 - i * 8} y={410 - i * 36} width={150 + i * 16} height="30" rx="10" fill={u(id, 'dark')} stroke={GOLD} strokeWidth="3" />
            <rect x={400 - i * 8} y={418 - i * 36} width={110 + i * 16} height="6" rx="3" fill={RED} />
          </g>
        ))}
        {/* kettlebell */}
        <path d="M150 300 C150 215 250 215 250 300" fill="none" stroke={u(id, 'gold')} strokeWidth="26" strokeLinecap="round" />
        <circle cx="200" cy="380" r="100" fill={u(id, 'dark')} stroke="#3a2f2b" strokeWidth="3" />
        <text x="200" y="396" textAnchor="middle" fontSize="54" fill={GOLD} style={display}>PT</text>
        <path d="M140 340 C150 310 180 296 210 296" fill="none" stroke="#fff" strokeOpacity=".15" strokeWidth="8" strokeLinecap="round" />
        {/* dumbbell */}
        <g transform="translate(300 220) rotate(-18)">
          <rect x="0" y="22" width="26" height="76" rx="6" fill={u(id, 'gold')} /><rect x="30" y="0" width="26" height="120" rx="6" fill={u(id, 'dark')} stroke={GOLD} strokeWidth="3" />
          <rect x="56" y="52" width="110" height="18" rx="4" fill={GOLD_D} />
          <rect x="166" y="0" width="26" height="120" rx="6" fill={u(id, 'dark')} stroke={GOLD} strokeWidth="3" /><rect x="196" y="22" width="26" height="76" rx="6" fill={u(id, 'gold')} />
        </g>
      </>
    ),
  },
  // About "our story": the shop
  store: {
    label: 'The shop front with a red and gold awning and a shelf of supplements',
    box: '0 0 600 480',
    draw: (id) => (
      <>
        <circle cx="300" cy="260" r="240" fill={u(id, 'glow')} />
        <Sparks seed={13} n={12} h={480} />
        <rect x="70" y="150" width="460" height="290" fill="#0d0908" stroke="#3a2f2b" strokeWidth="3" />
        <rect x="50" y="40" width="500" height="64" rx="6" fill={u(id, 'gold')} />
        <text x="300" y="86" textAnchor="middle" fontSize="46" fill="#120c0a" letterSpacing="4" style={display}>PUNJABI TADKA</text>
        {Array.from({ length: 10 }).map((_, i) => <path key={i} d={`M${50 + i * 50} 104 h50 v34 q-25 22 -50 0Z`} fill={i % 2 ? GOLD : RED} />)}
        <rect x="100" y="180" width="250" height="170" fill="#050303" stroke={GOLD} strokeWidth="4" />
        <line x1="100" y1="300" x2="350" y2="300" stroke={GOLD_D} strokeWidth="5" />
        <Tub id={id} x={116} y={224} w={44} h={72} name="" sub="" fs={8} /><Tub id={id} x={172} y={212} w={54} h={84} name="" sub="" fs={8} /><Shaker id={id} x={240} y={230} w={40} h={66} /><Tub id={id} x={296} y={226} w={44} h={70} name="" sub="" fs={8} />
        <Tub id={id} x={120} y={316} w={56} h={30} name="" sub="" fs={8} /><Tub id={id} x={196} y={316} w={56} h={30} name="" sub="" fs={8} /><Tub id={id} x={272} y={316} w={56} h={30} name="" sub="" fs={8} />
        <rect x="380" y="180" width="110" height="260" fill="#050303" stroke={GOLD} strokeWidth="4" />
        <circle cx="474" cy="320" r="6" fill={GOLD} />
        <text x="435" y="240" textAnchor="middle" fontSize="30" fill={RED} letterSpacing="2" style={display}>OPEN</text>
        <rect x="30" y="440" width="540" height="16" rx="4" fill="#1a1412" />
        <Flame id={id} x={40} y={440} s={0.7} /><Flame id={id} x={560} y={440} s={0.7} />
      </>
    ),
  },
  // Supplements page header: shelf of products
  shelf: {
    label: 'A shelf of supplement tubs, buckets and shakers',
    box: '0 0 800 300',
    draw: (id) => (
      <>
        <ellipse cx="400" cy="270" rx="380" ry="30" fill={u(id, 'glow')} />
        <Tub id={id} x={30} y={110} w={96} h={150} name="WHEY" sub="PROTEIN" fs={26} />
        <Tub id={id} x={150} y={60} w={140} h={200} name="MASS" sub="GAINER" fs={34} />
        <Tub id={id} x={316} y={130} w={80} h={130} name="CREA" sub="TINE" fs={22} />
        <Tub id={id} x={420} y={90} w={100} h={170} name="PRE" sub="WORKOUT" fs={28} />
        <Shaker id={id} x={550} y={120} w={66} h={140} />
        <Tub id={id} x={640} y={140} w={70} h={120} name="OATS" sub="HP" fs={22} />
        <Chili x={715} y={228} s={0.34} rot={-6} />
        <rect x="0" y="262" width="800" height="14" rx="4" fill={u(id, 'gold')} />
        <FlameRow id={id} x={20} y={262} n={2} gap={30} s={0.5} />
      </>
    ),
  },
  // Contact page: location pin
  pin: {
    label: 'A map pin over a road with a supplement tub',
    box: '0 0 600 520',
    draw: (id) => (
      <>
        <circle cx="300" cy="260" r="230" fill={u(id, 'glow')} />
        <Sparks seed={17} n={12} h={520} />
        <g stroke="#3a2f2b" strokeWidth="2" fill="none"><path d="M40 400 H560 M40 450 H560 M120 330 V520 M300 330 V520 M480 330 V520" /></g>
        <path d="M0 420 L600 380" stroke={GOLD_D} strokeWidth="10" strokeDasharray="30 20" opacity=".6" />
        <ellipse cx="300" cy="438" rx="90" ry="16" fill="#000" opacity=".6" />
        <circle cx="300" cy="438" r="40" fill="none" stroke={RED} strokeWidth="3" opacity=".7" />
        <path d="M300 430 C200 330 150 280 150 210 A150 150 0 0 1 450 210 C450 280 400 330 300 430Z" fill={u(id, 'gold')} stroke={GOLD_D} strokeWidth="4" />
        <circle cx="300" cy="210" r="102" fill={INK} />
        <Tub id={id} x={250} y={150} w={100} h={118} name="PT" sub="" fs={34} />
        <Flame id={id} x={190} y={450} s={0.7} /><Flame id={id} x={410} y={450} s={0.7} />
      </>
    ),
  },
  // 404: tipped-over empty tub
  empty: {
    label: 'A tipped-over empty supplement tub with a question mark',
    box: '0 0 600 400',
    draw: (id) => (
      <>
        <ellipse cx="300" cy="360" rx="250" ry="30" fill={u(id, 'glow')} />
        <Sparks seed={21} n={10} h={400} />
        <ellipse cx="300" cy="352" rx="190" ry="16" fill="#000" opacity=".6" />
        <g transform="translate(260 250) rotate(-78)">
          <rect x="-86" y="-112" width="172" height="30" rx="9" fill={u(id, 'gold')} />
          <rect x="-80" y="-84" width="160" height="196" rx="14" fill={u(id, 'dark')} stroke="#3a2f2b" strokeWidth="2" />
          <rect x="-72" y="-44" width="144" height="96" fill="#0b0807" stroke="#3a2f2b" />
          <rect x="-72" y="-44" width="144" height="9" fill={RED} /><rect x="-72" y="43" width="144" height="9" fill={GOLD} />
          <text x="0" y="12" textAnchor="middle" fontSize="38" fill="#fff" style={display}>EMPTY</text>
        </g>
        <path d="M70 346 C100 306 140 326 160 310 C190 290 210 330 240 346 Z" fill={u(id, 'gold')} opacity=".85" />
        <text x="430" y="170" textAnchor="middle" fontSize="150" fill={RED} style={display}>?</text>
        <circle cx="500" cy="318" r="26" fill="#0b0807" stroke={GOLD} strokeWidth="4" /><rect x="520" y="296" width="52" height="9" rx="4" fill={GOLD_D} transform="rotate(-30 520 296)" />
      </>
    ),
  },
};

export default function Scene({ name, className = '', label }) {
  const id = useId().replace(/[^a-z0-9]/gi, '');
  const sc = scenes[name];
  return (
    <svg viewBox={sc.box} className={className} role="img" aria-label={label || sc.label} preserveAspectRatio="xMidYMid meet">
      <Defs id={id} />
      {sc.draw(id)}
    </svg>
  );
}
