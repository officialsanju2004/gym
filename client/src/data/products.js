// Centralised catalogue. Swap this module for an API call later; the shape stays the same.
// IMPORTANT: specifications below are SAMPLE DATA (see `specsAreSample`). Replace with the
// manufacturer's verified specs and real prices before launch.
// Images: drop files at client/public/images/products/<slug>.jpg — until then a designed placeholder renders.

export const categories = [
  'Cardio',
  'Strength Machines',
  'Free Weights',
  'Benches and Racks',
  'Functional Training',
  'Accessories',
  'Home Gym',
  'Commercial Gym',
];

const img = (slug) => [`/images/products/${slug}.jpg`, `/images/products/${slug}-2.jpg`];

const p = (o) => ({
  price: null,
  priceType: 'enquiry', // 'enquiry' | 'fixed'
  featured: false,
  availability: 'Contact us for availability',
  specsAreSample: true,
  variants: [],
  ...o,
  images: img(o.slug),
});

export const products = [
  p({
    id: 'p01', slug: 'pro-series-treadmill', name: 'Pro Series Treadmill', category: 'Cardio',
    segments: ['Home Gym', 'Commercial Gym'], icon: 'treadmill', featured: true,
    shortDescription: 'Motorised running deck with a stable frame for daily cardio.',
    description: 'A motorised treadmill built around a wide running deck, cushioned landing and a stable frame. Suited to steady runs, intervals and walking programmes in home studios and light commercial floors.',
    features: ['Wide cushioned running deck', 'Adjustable speed and incline', 'Console with workout readouts', 'Folding or fixed frame options on request'],
    specifications: { 'Motor (sample)': 'Continuous-duty AC', 'Speed range (sample)': '1–20 km/h', 'Incline (sample)': '0–15%', 'Deck size (sample)': '150 × 50 cm' },
  }),
  p({
    id: 'p02', slug: 'studio-spin-bike', name: 'Studio Spin Bike', category: 'Cardio',
    segments: ['Home Gym', 'Commercial Gym'], icon: 'bike', featured: true,
    shortDescription: 'Heavy flywheel indoor cycle with a fully adjustable fit.',
    description: 'An indoor cycling bike with a weighted flywheel and adjustable saddle and handlebars. Designed for smooth, quiet rides in studios and at home.',
    features: ['Weighted flywheel', 'Adjustable saddle and handlebar', 'Resistance dial with emergency stop', 'Dual-sided pedals'],
    specifications: { 'Flywheel (sample)': '18 kg', 'Drive (sample)': 'Belt', 'User weight (sample)': 'Up to 130 kg' },
  }),
  p({
    id: 'p03', slug: 'adjustable-dumbbell-set', name: 'Adjustable Dumbbell Set', category: 'Free Weights',
    segments: ['Home Gym'], icon: 'dumbbell', featured: true,
    shortDescription: 'One compact pair that replaces a full rack of fixed dumbbells.',
    description: 'A pair of adjustable dumbbells with a quick-change selector, so one stand covers a wide range of loads. A space-saving choice for home training.',
    features: ['Quick-change weight selector', 'Compact footprint with storage tray', 'Knurled handle for secure grip'],
    specifications: { 'Range per hand (sample)': '2–24 kg', 'Increment (sample)': '2 kg', 'Handle (sample)': 'Knurled steel' },
    variants: ['24 kg pair', '32 kg pair', '40 kg pair'],
  }),
  p({
    id: 'p04', slug: 'adjustable-weight-bench', name: 'Adjustable Weight Bench', category: 'Benches and Racks',
    segments: ['Home Gym', 'Commercial Gym'], icon: 'bench', featured: true,
    shortDescription: 'Flat, incline and decline positions on a rigid steel frame.',
    description: 'A multi-position bench with a thick pad and rigid frame for pressing, rows and supported dumbbell work.',
    features: ['Multiple back-pad angles', 'Non-slip floor feet', 'Dense, wipe-clean upholstery'],
    specifications: { 'Positions (sample)': 'Flat / incline / decline', 'Load rating (sample)': '300 kg' },
  }),
  p({
    id: 'p05', slug: 'power-rack', name: 'Power Rack', category: 'Benches and Racks',
    segments: ['Home Gym', 'Commercial Gym'], icon: 'rack', featured: true,
    shortDescription: 'Four-post rack with safety arms for squats, presses and pulls.',
    description: 'A four-post power rack with adjustable J-hooks and safety arms, the base for a serious barbell setup. Add a pull-up bar and plate storage as needed.',
    features: ['Adjustable J-hooks and safeties', 'Pull-up bar', 'Plate storage pegs', 'Bolt-down option'],
    specifications: { 'Upright (sample)': '75 × 75 mm steel', 'Height (sample)': '215 cm', 'Load rating (sample)': '450 kg' },
  }),
  p({
    id: 'p06', slug: 'cable-crossover-machine', name: 'Cable Crossover Machine', category: 'Strength Machines',
    segments: ['Commercial Gym'], icon: 'cable', featured: true,
    shortDescription: 'Dual adjustable pulleys for chest, back, arms and core.',
    description: 'A dual-stack cable station with adjustable pulleys, for isolation and functional movements at any height.',
    features: ['Dual weight stacks', 'Adjustable pulley heights', 'Accessory hooks for handles and bars'],
    specifications: { 'Stacks (sample)': '2 × 80 kg', 'Pulley ratio (sample)': '2:1' },
  }),
  p({
    id: 'p07', slug: 'smith-machine', name: 'Smith Machine', category: 'Strength Machines',
    segments: ['Home Gym', 'Commercial Gym'], icon: 'smith', featured: true,
    shortDescription: 'Guided barbell path with safety stops for solo lifting.',
    description: 'A Smith machine with a guided bar and adjustable safety catches. Useful for solo training and for lifters building confidence under load.',
    features: ['Linear bearing guide rods', 'Adjustable safety stops', 'Weight horns for plates'],
    specifications: { 'Bar (sample)': 'Counter-balanced', 'Load rating (sample)': '350 kg' },
  }),
  p({
    id: 'p08', slug: 'plate-loaded-leg-press', name: 'Plate-Loaded Leg Press', category: 'Strength Machines',
    segments: ['Commercial Gym', 'Home Gym'], icon: 'legpress', featured: true,
    shortDescription: '45° sled with a large foot plate and padded back support.',
    description: 'A 45-degree plate-loaded leg press with a generous foot platform and supportive seat for heavy lower-body work.',
    features: ['Large foot platform', 'Safety stops', 'Padded, angled backrest', 'Plate pegs on both sides'],
    specifications: { 'Angle (sample)': '45°', 'Load rating (sample)': '600 kg' },
  }),
  p({
    id: 'p09', slug: 'cross-trainer-elliptical', name: 'Cross Trainer Elliptical', category: 'Cardio',
    segments: ['Home Gym', 'Commercial Gym'], icon: 'elliptical', featured: true,
    shortDescription: 'Low-impact full-body cardio with moving handles.',
    description: 'An elliptical cross trainer with a smooth stride path and moving handles for low-impact, full-body conditioning.',
    features: ['Smooth stride path', 'Moving handlebars', 'Adjustable resistance levels'],
    specifications: { 'Stride (sample)': '50 cm', 'Resistance (sample)': '16 levels' },
  }),
  p({
    id: 'p10', slug: 'olympic-weight-plate-set', name: 'Olympic Weight Plate Set', category: 'Free Weights',
    segments: ['Home Gym', 'Commercial Gym'], icon: 'plates', featured: true,
    shortDescription: 'Olympic-hole plates for barbells and plate-loaded machines.',
    description: 'Olympic-hole weight plates in standard increments, compatible with 50 mm barbells and most plate-loaded machines.',
    features: ['50 mm centre hole', 'Clear weight markings', 'Available in multiple sizes'],
    specifications: { 'Hole (sample)': '50 mm', 'Material (sample)': 'Cast iron / rubber-coated' },
    variants: ['Cast iron', 'Rubber-coated'],
  }),
  p({
    id: 'p11', slug: 'kettlebell-set', name: 'Kettlebell Set', category: 'Functional Training',
    segments: ['Home Gym', 'Commercial Gym'], icon: 'kettlebell',
    shortDescription: 'Flat-based kettlebells for swings, carries and presses.',
    description: 'A graded set of kettlebells with a flat base and wide handle, for swings, goblet squats, presses and carries.',
    features: ['Flat, stable base', 'Smooth wide handle', 'Colour-coded weights'],
    specifications: { 'Weights (sample)': '8–32 kg', 'Material (sample)': 'Cast iron' },
  }),
  p({
    id: 'p12', slug: 'olympic-barbell', name: 'Olympic Barbell', category: 'Accessories',
    segments: ['Home Gym', 'Commercial Gym'], icon: 'barbell',
    shortDescription: '20 kg-class barbell for squats, presses and pulls.',
    description: 'A 2.2 m Olympic barbell with rotating sleeves and a knurled shaft, designed for general strength training.',
    features: ['Rotating sleeves', 'Medium knurl', 'Standard Olympic sleeve diameter'],
    specifications: { 'Length (sample)': '220 cm', 'Weight (sample)': '20 kg', 'Capacity (sample)': '450 kg' },
  }),
];

export const getProduct = (slug) => products.find((x) => x.slug === slug);
export const featuredProducts = products.filter((x) => x.featured);
export const relatedProducts = (product, n = 3) =>
  products
    .filter((x) => x.id !== product.id)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, n);
export const formatPrice = (x) =>
  x.priceType === 'fixed' && x.price != null ? `₹${x.price.toLocaleString('en-IN')}` : 'Request a quote';
