// Centralised catalogue. Swap this module for an API call later; the shape stays the same.
// IMPORTANT: product details below are SAMPLE DATA (see `specsAreSample`). Replace with the
// brand's verified label information (nutrition facts, ingredients) and real prices before launch.
// Images: drop files at client/public/images/products/<slug>.jpg — until then a designed placeholder renders.

export const categories = [
  'Protein',
  'Mass Gainers',
  'Creatine',
  'Pre-Workout',
  'Amino Acids & Recovery',
  'Vitamins & Wellness',
  'Bars & Accessories',
];

const img = (slug) => [`/images/products/${slug}.jpg`, `/images/products/${slug}-2.jpg`];

const p = (o) => ({
  price: null,
  priceType: 'enquiry', // 'enquiry' | 'fixed'
  featured: false,
  availability: 'Contact us for availability',
  specsAreSample: true,
  variantLabel: 'Option', // legend shown above the variant buttons (e.g. 'Flavour', 'Size')
  variants: [],
  ...o,
  images: img(o.slug),
});

export const products = [
  p({
    id: 'p01', slug: 'whey-protein', name: 'Whey Protein', category: 'Protein',
    segments: ['Muscle Gain', 'Recovery'], icon: 'protein', featured: true,
    shortDescription: 'Everyday whey protein powder that mixes easily with water or milk.',
    description: 'A whey protein concentrate powder for adding protein to your day, whether after training or as part of a meal plan. Mixes in a shaker with water or milk.',
    features: ['Easy-mixing powder', 'Multiple flavours', 'Suited to post-workout or between meals', 'Full label details shared on request'],
    specifications: { 'Serving size (sample)': '1 scoop (30 g)', 'Servings per tub (sample)': '33', 'Form (sample)': 'Powder', 'Pack size (sample)': '1 kg' },
    variantLabel: 'Flavour', variants: ['Chocolate', 'Vanilla', 'Coffee'],
  }),
  p({
    id: 'p02', slug: 'whey-isolate', name: 'Whey Isolate', category: 'Protein',
    segments: ['Muscle Gain', 'Recovery'], icon: 'protein', featured: true,
    shortDescription: 'A more refined whey protein for a lighter, leaner shake.',
    description: 'A whey protein isolate powder, further filtered than standard concentrate. A popular choice for people who want a lighter shake with minimal extras.',
    features: ['Refined whey isolate', 'Light, smooth texture', 'Multiple flavours', 'Full label details shared on request'],
    specifications: { 'Serving size (sample)': '1 scoop (30 g)', 'Servings per tub (sample)': '30', 'Form (sample)': 'Powder', 'Pack size (sample)': '900 g' },
    variantLabel: 'Flavour', variants: ['Chocolate', 'Vanilla', 'Unflavoured'],
  }),
  p({
    id: 'p03', slug: 'plant-protein-blend', name: 'Plant Protein Blend', category: 'Protein',
    segments: ['Wellness', 'Muscle Gain'], icon: 'protein', featured: true,
    shortDescription: 'Dairy-free protein powder made from a blend of plant sources.',
    description: 'A dairy-free protein powder built from a blend of plant protein sources, for vegans and anyone who prefers to avoid whey.',
    features: ['Dairy-free', 'Blend of plant protein sources', 'Mixes with water or plant milk', 'Check the label for allergens'],
    specifications: { 'Serving size (sample)': '1 scoop (35 g)', 'Servings per tub (sample)': '28', 'Form (sample)': 'Powder', 'Pack size (sample)': '1 kg' },
    variantLabel: 'Flavour', variants: ['Chocolate', 'Vanilla'],
  }),
  p({
    id: 'p04', slug: 'mass-gainer', name: 'Mass Gainer', category: 'Mass Gainers',
    segments: ['Muscle Gain'], icon: 'gainer', featured: true,
    shortDescription: 'High-calorie powder for people who struggle to eat enough.',
    description: 'A carbohydrate and protein powder designed to add calories to your day. Meant for people who find it hard to reach their calorie target from food alone.',
    features: ['High-calorie formula', 'Carbohydrate and protein blend', 'Mixes in a shaker or blender'],
    specifications: { 'Serving size (sample)': '3 scoops (150 g)', 'Servings per tub (sample)': '20', 'Form (sample)': 'Powder' },
    variantLabel: 'Pack size', variants: ['1 kg', '3 kg'],
  }),
  p({
    id: 'p05', slug: 'creatine-monohydrate', name: 'Creatine Monohydrate', category: 'Creatine',
    segments: ['Performance', 'Muscle Gain'], icon: 'creatine', featured: true,
    shortDescription: 'Simple, single-ingredient creatine monohydrate powder.',
    description: 'Creatine monohydrate in powder form, one of the most widely used sports supplements. Unflavoured, so it mixes into water, juice or a shake.',
    features: ['Single ingredient', 'Unflavoured powder', 'Mixes into water, juice or shakes'],
    specifications: { 'Serving size (sample)': '1 scoop (3 g)', 'Servings per pack (sample)': '83', 'Form (sample)': 'Powder' },
    variantLabel: 'Pack size', variants: ['250 g', '500 g'],
  }),
  p({
    id: 'p06', slug: 'pre-workout-formula', name: 'Pre-Workout Formula', category: 'Pre-Workout',
    segments: ['Performance'], icon: 'preworkout', featured: true,
    shortDescription: 'Flavoured pre-training powder to mix and drink before you lift.',
    description: 'A flavoured pre-workout powder to take before training. Check the label for caffeine content and other stimulants, and avoid taking it late in the day.',
    features: ['Flavoured drink mix', 'Intended for use before training', 'Contains caffeine; check the label for the amount'],
    specifications: { 'Serving size (sample)': '1 scoop (10 g)', 'Servings per tub (sample)': '30', 'Form (sample)': 'Powder' },
    variantLabel: 'Flavour', variants: ['Fruit Punch', 'Blue Raspberry', 'Watermelon'],
  }),
  p({
    id: 'p07', slug: 'bcaa-eaa-powder', name: 'BCAA / EAA Powder', category: 'Amino Acids & Recovery',
    segments: ['Recovery', 'Performance'], icon: 'amino', featured: true,
    shortDescription: 'Flavoured amino acid drink mix to sip during or after training.',
    description: 'A flavoured amino acid powder to sip during or after a session. Light and refreshing, and easy to carry in a shaker or bottle.',
    features: ['Light, refreshing flavours', 'Dissolves in cold water', 'Easy to sip during training'],
    specifications: { 'Serving size (sample)': '1 scoop (12 g)', 'Servings per tub (sample)': '30', 'Form (sample)': 'Powder' },
    variantLabel: 'Flavour', variants: ['Orange', 'Green Apple', 'Mango'],
  }),
  p({
    id: 'p08', slug: 'l-glutamine', name: 'L-Glutamine', category: 'Amino Acids & Recovery',
    segments: ['Recovery'], icon: 'glutamine', featured: true,
    shortDescription: 'Unflavoured L-glutamine powder that mixes into any drink.',
    description: 'Pure L-glutamine powder, unflavoured so it can be stirred into water, a shake or any cold drink.',
    features: ['Single ingredient', 'Unflavoured powder', 'Mixes into cold drinks and shakes'],
    specifications: { 'Serving size (sample)': '1 scoop (5 g)', 'Servings per pack (sample)': '50', 'Form (sample)': 'Powder' },
  }),
  p({
    id: 'p09', slug: 'daily-multivitamin', name: 'Daily Multivitamin', category: 'Vitamins & Wellness',
    segments: ['Wellness'], icon: 'vitamin', featured: true,
    shortDescription: 'A once-a-day multivitamin to support a balanced diet.',
    description: 'A daily multivitamin to complement, not replace, a balanced diet. Easy to add to a morning routine.',
    features: ['Daily-use formula', 'Easy-to-swallow tablets', 'Complements a balanced diet'],
    specifications: { 'Serving size (sample)': '1 tablet', 'Count (sample)': '60 tablets', 'Form (sample)': 'Tablet' },
  }),
  p({
    id: 'p10', slug: 'omega-3-fish-oil', name: 'Omega-3 Fish Oil', category: 'Vitamins & Wellness',
    segments: ['Wellness', 'Recovery'], icon: 'omega', featured: true,
    shortDescription: 'Omega-3 fish oil softgels for everyday use.',
    description: 'Omega-3 fish oil in easy-to-swallow softgels, for people who do not eat much oily fish. Check the label if you have a fish or shellfish allergy.',
    features: ['Softgel capsules', 'Easy to take with a meal', 'Check the label for allergens'],
    specifications: { 'Serving size (sample)': '1–2 softgels', 'Count (sample)': '90 softgels', 'Form (sample)': 'Softgel' },
  }),
  p({
    id: 'p11', slug: 'protein-bar-box', name: 'Protein Bars (Box)', category: 'Bars & Accessories',
    segments: ['Muscle Gain', 'Wellness'], icon: 'bar',
    shortDescription: 'Grab-and-go protein bars sold by the box.',
    description: 'A box of protein bars for the gym bag, desk drawer or commute. A convenient snack when you cannot sit down to a meal.',
    features: ['Individually wrapped', 'Convenient, no preparation', 'Multiple flavours'],
    specifications: { 'Bars per box (sample)': '12', 'Form (sample)': 'Bar' },
    variantLabel: 'Flavour', variants: ['Chocolate Brownie', 'Peanut Butter', 'Cookies & Cream'],
  }),
  p({
    id: 'p12', slug: 'shaker-bottle', name: 'Shaker Bottle', category: 'Bars & Accessories',
    segments: ['Wellness'], icon: 'shaker',
    shortDescription: 'Leak-proof shaker with a mixing ball for smooth shakes.',
    description: 'A BPA-free shaker bottle with a screw lid and mixing ball, so powders blend smoothly wherever you are.',
    features: ['Screw-on leak-resistant lid', 'Mixing ball or whisk included', 'Measurement markings'],
    specifications: { 'Capacity (sample)': '700 ml', 'Material (sample)': 'BPA-free plastic' },
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
