// Catalogue built from the shop's price list (Price_List.pdf). Every row of the PDF is here.
// Columns per row: [name, imported?, MRP, dealing price, retail price]
//   'I'  = marked "Imported" in the PDF (blank = not marked)
//   null = the PDF shows "--" or nothing for that column
// Prices apply to the stock in hand and can change when new stock arrives (see PRICE_NOTE).

/** The dealing (trade) price is kept in the data but NOT shown to customers unless this is true. */
export const SHOW_DEALER_PRICE = false;

export const PRICE_NOTE = 'Rates apply to the current stock only. Prices may go up or down when new stock arrives.';
export const PREWORKOUT_NOTE = 'No guarantee on pre-workout products. Check the seal before buying — it cannot be exchanged later.';

// Display category -> settings. Order here = order of the filter chips.
export const categoryMeta = {
  'Protein': { icon: 'protein', blurb: 'Whey, isolate and blends' },
  'Mass Gainers': { icon: 'gainer', blurb: 'High-calorie gainers' },
  'Gaining Products': { icon: 'gainer', blurb: 'Weight & mass products' },
  'Creatine': { icon: 'creatine', blurb: 'Monohydrate, HCL and more' },
  'Pre-Workout': { icon: 'preworkout', blurb: 'Energy and focus before training' },
  'Amino Acids': { icon: 'amino', blurb: 'BCAA, arginine, carnitine' },
  'Nutrition & Vitamins': { icon: 'vitamin', blurb: 'Omega, multivitamins, wellness' },
  'Oats': { icon: 'oats', blurb: 'High-protein oats' },
};
export const categories = Object.keys(categoryMeta);

const rows = {
  'Pre-Workout': [
    ['Gat Nitraflex', 'I', 6000, 2000, 2300],
    ['PWR1 Thunder Storm', 'I', 3200, 1800, 2200],
    ['Illuminatti', 'I', 5000, 1400, 1800],
    ['Nitrotest', 'I', 5000, 2900, 3200],
    ['C4', '', 3199, 1550, 1850],
    ['GNC', '', 2100, 1000, 1200],
    ['AB Junglee', '', 1550, 780, 1000],
    ['WB Blast (with fat Burner)', '', 2499, 1350, 1500],
    ['BEN Gladiator', '', 2799, 1200, 1500],
    ['WA Stanger', '', 2900, 750, 900],
    ['Psycodelic', '', null, 1700, 2000],
  ],
  'Creatine': [
    ['Schinoussa 1kg', 'I', null, null, null],
    ['Schinoussa 300g', 'I', null, 2000, 2400],
    ['Con-Cret HCL 60/s', 'I', 3000, 1450, 1700],
    ['Celluc-R 33/s', '', 700, 375, 500],
    ['Muscle Tech 81/s', '', 1779, 600, 800],
    ['ON 65/s', '', 1039, 675, 900],
    ['ELEV 67/s', '', 1749, 650, 800],
    ['Wellcore 83/s', '', 1399, 675, 900],
    ['MB 80/s', '', 1099, 675, 900],
    ['WB', '', 2199, 650, 700],
  ],
  'Amino Acids': [
    ['Amino Decanate', 'I', 4600, 2450, 2850],
    ['HIT', 'I', 4000, 1600, 1900],
    ['BF BCAA', '', 1599, 1100, 1300],
    ['WA BCAA', '', 2800, 800, 1050],
    ['V/s L-Arginine', 'I', 2450, 1150, 1450],
    ['Musclife L-Carnitine', '', 1900, 1200, 1400],
    ['Ultra L-Carnitine', '', 3200, 1400, 1600],
  ],
  'Nutrition & Vitamins': [
    ['Army1 Omega', 'I', null, null, null],
    ['Now Omega 100/s', 'I', null, 1350, 1500],
    ['MB Fish oil', '', 629, 425, 550],
    ['IP Omega', '', 1500, 750, 950],
    ['My Protein Omega', '', 1000, 675, 800],
    ['Magnum Primer', 'I', null, 3500, 3900],
    ['Illuminati Multi Test', 'I', 3500, 1150, 1400],
    ['MuscleMed Vitamin-T', 'I', 2300, 1600, 1900],
    ['Muscle Tech Fish Oil', '', 1329, 800, 950],
    ['Gat Multi Test', 'I', 2500, 1450, 1700],
    ['Labrada Multi', '', 1200, 500, 700],
    ['ConPrev D3', '', null, 1800, 2100],
    ['BPI', '', 1400, 500, 750],
    ['GNC Tripple Root Ginseng', '', 1200, 600, 750],
    ['BEN Multi', '', 900, 450, 550],
    ['BEN ZMA', '', 800, 400, 500],
    ['TF True Vita', '', 550, 250, 400],
    ['TF Live Pro1500', '', 2000, 850, 1050],
    ['GNC Calcium plus', '', 400, 275, 350],
  ],
  'Gaining Products': [
    ['Dallaso Mostuosa Massa', '', null, 1550, 1800],
    ['MyoDrol Red', '', null, 1600, 1900],
    ['MyoDrol Black', '', null, 1700, 2100],
    ['Musclife Muscle Matter', '', 2500, 1500, 1800],
  ],
  'Protein': [
    ['Schinoussa New Zealand', 'I', null, 10500, 11500],
    ['Illuminatti Isolate', 'I', 15000, 7500, 8600],
    ['Essential Whey 2.27kg 83/s', 'I', 12000, 5200, 6800],
    ['Army1 Whey 2.27kg', 'I', 11000, 6250, 7100],
    ['V/S Complex Pro Whey 2kg', 'I', 8500, 4600, 5700],
    ['A/N Body Fuel Whey', 'I', 12000, 6200, 6800],
    ['One Science Whey (Creatine Free)', 'I', 9000, 5600, 6500],
    ['MyoGenetix Whey Concentrate', '', 12000, 4400, 5600],
    ['MT Nitrotech', '', 6939, 6200, 6600],
    ['RC Pro Antium', '', 9200, 6000, 6500],
    ['Sintha-6', '', 7400, 6100, 6800],
    ['Elev Tri Whey', '', 10600, 4800, 5800],
    ['AB Whey (Creatine, Multi & shaker free)', '', 6500, 3800, 4800],
    ['AB Isolate (Creatine, Multi & shaker free)', '', 9000, 4800, 6200],
    ['BM Crude Whey', '', 3700, 2700, 3000],
    ['NB 100% Whey', '', 7000, 3700, 4500],
    ['W/A ISO Rich', '', 9500, 4500, 5500],
    ['W/A High Whey Protein', '', 6500, 3500, 4300],
    ['W/A Whey Blend', '', 7500, 4200, 5100],
    ['Atom 1kg', '', 2800, 1950, 2200],
    ['GNC Yeast Protein', '', 3200, 1900, 2000],
    ['TF Performance Whey 1kg', '', 4500, 2600, 2950],
    ['TF Power Fuel 1kg', '', 5000, 2800, 3200],
  ],
  'Mass Gainers': [
    ['Avvatar 5kg Bucket', '', 5000, 3300, 3950],
    ['IP Heavy Weight Mass Gainer 3kg', '', 5000, 2350, 2800],
    ['TF Gaint 3kg', '', 4000, 2200, 2700],
    ['MyoGenetix Massive High Calorie Gainer', '', null, null, null],
    ['TF Gaint 5kg Bucket', '', 6500, 3400, 4000],
    ['Musclife Huge Gainer 3kg', '', 3700, 2200, 2600],
    ['Musclife Bulko Mania 5kg Bucket', '', 5517, 3200, 3800],
    ['WB Super Muscle Mass gainer 3kg', '', 4000, 2100, 2600],
    ['BEN Mass Gainer 3kg', '', 3300, 2000, 2500],
    ['MPN Anabolic Mass gainer 4kg Bucket', '', 6200, 2000, 2200],
    ['Muscle Garage Anabolic Mass gainer 3kg', '', 4450, 1750, 2000],
    ['W/A Pro Mass Gainer', '', 4500, 2000, 2500],
  ],
  'Oats': [
    ['Alpino HP Oats 2kg Bucket', '', 1300, 800, 900],
    ['Alpino HP Oats 1kg', '', 650, 475, 550],
    ['Alpino Peanut Butter 32g protein 1kg', '', 679, 475, 550],
    ['Health Ninja Kulfi oats 1kg', '', 750, 500, 650],
    ['Health Ninja Musli 1kg (strawberry & Dark chocolate)', '', 800, 550, 700],
  ],
};

// Products shown in "Featured" on the home page (by name).
const FEATURED = [
  'Illuminatti Isolate', 'Essential Whey 2.27kg 83/s', 'Gat Nitraflex', 'Schinoussa 300g',
  'Avvatar 5kg Bucket', 'Amino Decanate', 'Now Omega 100/s',
];

const blurbs = {
  'Protein': 'A protein powder for adding protein to your day, after training or between meals.',
  'Mass Gainers': 'A high-calorie gainer powder for people who find it hard to eat enough to build weight.',
  'Gaining Products': 'A weight and mass product from our gaining range. Ask us about use before you buy.',
  'Creatine': 'A creatine supplement, one of the most widely used sports supplements.',
  'Pre-Workout': 'A pre-workout supplement to take before training. Check the label for caffeine and other stimulants.',
  'Amino Acids': 'An amino acid supplement for use around training.',
  'Nutrition & Vitamins': 'An everyday nutrition supplement from our vitamins and wellness range.',
  'Oats': 'High-protein oats for a quick, filling breakfast or snack.',
};

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const shapeFor = (category, name) => {
  if (category === 'Nutrition & Vitamins') return 'jar';
  if (category === 'Oats') return /bucket/i.test(name) ? 'bucket' : 'pouch';
  if (/bucket|5kg|4kg/i.test(name)) return 'bucket';
  return 'tub';
};

const used = new Set();
let n = 0;
export const products = Object.entries(rows).flatMap(([category, list]) =>
  list.map(([name, imp, mrp, dealing, retail]) => {
    let slug = slugify(name);
    if (used.has(slug)) slug = `${slug}-${category === 'Creatine' ? 'creatine' : n}`;
    used.add(slug);
    n += 1;

    const servings = name.match(/(\d+)\s*\/\s*s\b/i)?.[1];
    const pack = name.match(/(\d+(?:\.\d+)?)\s*(kg|g)\b/i);
    const imported = imp === 'I';
    const priced = retail != null;
    const off = priced && mrp && mrp > retail ? Math.round(((mrp - retail) / mrp) * 100) : 0;

    const specifications = {
      Category: category,
      ...(imported ? { Origin: 'Imported' } : {}),
      ...(pack ? { 'Pack size': `${pack[1]} ${pack[2].toLowerCase()}` } : {}),
      ...(servings ? { Servings: servings } : {}),
      ...(mrp ? { MRP: `₹${mrp.toLocaleString('en-IN')}` } : {}),
      'Retail price': priced ? `₹${retail.toLocaleString('en-IN')}` : 'Ask us for the price',
      ...(SHOW_DEALER_PRICE && dealing ? { 'Dealing price': `₹${dealing.toLocaleString('en-IN')}` } : {}),
    };

    const features = [
      imported ? 'Imported product' : null,
      priced ? `Retail price ₹${retail.toLocaleString('en-IN')}` : 'Price on request — call or WhatsApp us',
      off ? `${off}% below the printed MRP` : null,
      servings ? `${servings} servings` : null,
      pack ? `${pack[1]} ${pack[2].toLowerCase()} pack` : null,
      category === 'Pre-Workout' ? 'Check the seal before purchase — no exchange later' : 'Ask us to confirm current stock',
    ].filter(Boolean);

    return {
      id: `p${String(n).padStart(3, '0')}`,
      slug,
      name,
      category,
      icon: categoryMeta[category].icon,
      shape: shapeFor(category, name),
      imported,
      mrp: mrp ?? null,
      dealerPrice: dealing ?? null,
      price: retail ?? null,
      priceType: priced ? 'fixed' : 'enquiry',
      discount: off,
      servings: servings ? Number(servings) : null,
      featured: FEATURED.includes(name),
      // Optional real photo(s): add URLs here or drop files in client/public/images/products/<slug>.jpg
      // If empty or the image fails to load, a generated pack illustration is shown instead.
      images: [],
      shortDescription: `${category}${imported ? ' · Imported' : ''}${priced ? ` · ₹${retail.toLocaleString('en-IN')}` : ''}`,
      description: `${name}. ${blurbs[category]}${priced ? '' : ' The price is not fixed yet, so please ask us.'}`,
      features,
      specifications,
      availability: 'Call or WhatsApp to confirm current stock',
      notes: category === 'Pre-Workout' ? PREWORKOUT_NOTE : null,
    };
  })
);

export const getProduct = (slug) => products.find((x) => x.slug === slug);
export const featuredProducts = products.filter((x) => x.featured);
export const countByCategory = Object.fromEntries(categories.map((c) => [c, products.filter((x) => x.category === c).length]));
export const firstOfCategory = (c) => products.find((x) => x.category === c);
export const relatedProducts = (product, n = 3) =>
  products
    .filter((x) => x.id !== product.id && x.category === product.category)
    .slice(0, n);
export const inr = (v) => `₹${v.toLocaleString('en-IN')}`;
export const formatPrice = (x) => (x.price != null ? inr(x.price) : 'Ask for price');
