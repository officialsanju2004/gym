import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SearchX, Info, ChevronDown } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import Scene from '../components/Scenes';
import { products, categories, countByCategory, PRICE_NOTE, PREWORKOUT_NOTE } from '../data/products';
import { useSEO } from '../hooks/useSEO';

const hasPrices = true;
const PAGE = 24;
const sorts = [
  { v: 'featured', l: 'Featured' },
  { v: 'name-asc', l: 'Name: A–Z' },
  { v: 'name-desc', l: 'Name: Z–A' },
  ...(hasPrices ? [{ v: 'price-asc', l: 'Price: low to high' }, { v: 'price-desc', l: 'Price: high to low' }] : []),
];

export default function Supplements() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';
  const q = params.get('q') || '';
  const sort = params.get('sort') || 'featured';

  const [limit, setLimit] = useState(PAGE);
  const set = (k, v) => {
    setLimit(PAGE);
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    setParams(next, { replace: true });
  };

  useSEO({
    title: category ? `${category} Supplements` : 'Gym Supplements',
    description: `Browse all ${products.length} products at Punjabi Tadka Nutrition, Ferozepur: protein, creatine, pre-workout, gainers, amino acids, vitamins and oats, with prices.`,
    path: '/supplements',
  });

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    let out = products.filter((p) => {
      const inCat = !category || p.category === category;
      const inText = !term || [p.name, p.category, p.imported ? 'imported' : ''].join(' ').toLowerCase().includes(term);
      return inCat && inText;
    });
    const priced = (p) => (p.price == null ? Infinity : p.price);
    if (sort === 'featured') out = [...out].sort((a, b) => Number(b.featured) - Number(a.featured));
    if (sort === 'name-asc') out = [...out].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc') out = [...out].sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'price-asc') out = [...out].sort((a, b) => priced(a) - priced(b));
    if (sort === 'price-desc') out = [...out].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    return out;
  }, [category, q, sort]);

  const filtered = category || q || sort !== 'featured';

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-12 border-b border-line knurl">
        <Scene name="shelf" className="pointer-events-none absolute -right-10 bottom-0 hidden h-auto w-[620px] opacity-90 lg:block xl:right-6" />
        <div className="container-x relative">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl">Supplements</h1>
          <p className="mt-5 text-mute text-lg max-w-xl leading-relaxed">All {products.length} products from our price list: protein, gainers, creatine, pre-workout, amino acids, vitamins and oats. Open a product for details, or message us to buy.</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-x">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <div className="relative">
              <label htmlFor="search" className="sr-only">Search supplements</label>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mute pointer-events-none" aria-hidden="true" />
              <input id="search" type="search" value={q} onChange={(e) => set('q', e.target.value)} placeholder="Search supplements" className="field !pl-12" />
            </div>
            <div>
              <label htmlFor="sort" className="sr-only">Sort by</label>
              <select id="sort" value={sort} onChange={(e) => set('sort', e.target.value === 'featured' ? '' : e.target.value)} className="field md:w-56">
                {sorts.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
              </select>
            </div>
          </div>

          <div role="group" aria-label="Filter by category" className="mt-5 flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
            {['', ...categories].map((c) => {
              const active = category === c;
              return (
                <button key={c || 'all'} type="button" aria-pressed={active} onClick={() => set('category', c)}
                  className={`shrink-0 min-h-11 px-4 text-sm font-semibold border transition-colors ${active ? 'bg-gold text-black border-gold' : 'border-line text-mute hover:text-white hover:border-white/40'}`}>
                  {c || 'All'} <span className={active ? 'text-black/60' : 'text-mute/60'}>{c ? countByCategory[c] : products.length}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 text-sm text-mute" aria-live="polite">
            <p>Showing {Math.min(limit, list.length)} of {list.length} {list.length === 1 ? 'product' : 'products'}</p>
            {filtered && (
              <button type="button" onClick={() => setParams({}, { replace: true })} className="inline-flex items-center gap-1.5 text-white hover:text-gold">
                <X className="w-4 h-4" /> Clear filters
              </button>
            )}
          </div>

          <p className="mt-4 flex gap-2 text-sm text-mute"><Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />{PRICE_NOTE}</p>
          {(!category || category === 'Pre-Workout') && (
            <p className="mt-2 flex gap-2 text-sm text-gold"><Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />{PREWORKOUT_NOTE}</p>
          )}

          <div className="mt-6">
            {list.length ? (
              <>
                <ProductGrid products={list.slice(0, limit)} />
                {list.length > limit && (
                  <div className="mt-10 text-center">
                    <button type="button" onClick={() => setLimit((n) => n + PAGE)} className="btn-ghost">
                      Show more ({list.length - limit} left) <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="border border-dashed border-line py-20 px-6 text-center">
                <SearchX className="w-10 h-10 mx-auto text-mute" strokeWidth={1.25} />
                <h2 className="mt-5 text-4xl">No supplements found</h2>
                <p className="mt-3 text-mute">Try a different search or category, or ask us — we may be able to source it.</p>
                <button type="button" onClick={() => setParams({}, { replace: true })} className="btn-primary mt-7">Clear filters</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
