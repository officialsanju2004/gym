import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, SearchX, ChevronDown, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import ProductGrid from './ProductGrid';
import { products, categories, countByCategory } from '../data/products';

const PAGE = 6;
const sorts = [
  { v: 'featured', l: 'Featured' },
  { v: 'name-asc', l: 'Name: A–Z' },
  { v: 'name-desc', l: 'Name: Z–A' },
  { v: 'price-asc', l: 'Price: low to high' },
  { v: 'price-desc', l: 'Price: high to low' },
];

/** Home-page version of the Supplements page: search + category chips + product grid, filtered in place. */
export default function ShopByCategory() {
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('featured');
  const [limit, setLimit] = useState(PAGE);

  const list = useMemo(() => {
    let out = products.filter((p) => !category || p.category === category);
    const priced = (p) => (p.price == null ? Infinity : p.price);
    if (sort === 'featured') out = [...out].sort((a, b) => Number(b.featured) - Number(a.featured));
    if (sort === 'name-asc') out = [...out].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc') out = [...out].sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'price-asc') out = [...out].sort((a, b) => priced(a) - priced(b));
    if (sort === 'price-desc') out = [...out].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    return out;
  }, [category, sort]);

  const filtered = category || sort !== 'featured';
  const reset = () => { setCategory(''); setSort('featured'); setLimit(PAGE); };
  const change = (setter) => (v) => { setter(v); setLimit(PAGE); };

  const seeAll = new URLSearchParams();
  if (category) seeAll.set('category', category);
  const seeAllUrl = `/supplements${seeAll.toString() ? `?${seeAll}` : ''}`;

  return (
    <section id="shop-by-category" className="border-b border-line bg-coal py-14 sm:py-20 lg:py-24 scroll-mt-20">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading title="Shop by category" text="Pick a category to see everything in that range. Looking for something specific? Use the search in the top bar." />
          <Link to={seeAllUrl} className="btn-ghost hidden sm:inline-flex">View all supplements <ArrowRight className="w-4 h-4" /></Link>
        </div>

        <div role="group" aria-label="Filter by category" className="mt-8 sm:mt-10 flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
          {['', ...categories].map((c) => {
            const active = category === c;
            return (
              <button key={c || 'all'} type="button" aria-pressed={active} onClick={() => change(setCategory)(c)}
                className={`shrink-0 min-h-11 px-4 text-sm font-semibold border transition-colors ${active ? 'bg-gold text-black border-gold' : 'border-line text-mute hover:text-white hover:border-white/40'}`}>
                {c || 'All'} <span className={active ? 'text-black/60' : 'text-mute/60'}>{c ? countByCategory[c] : products.length}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 text-sm text-mute" aria-live="polite">
          <p>Showing {Math.min(limit, list.length)} of {list.length} {list.length === 1 ? 'product' : 'products'}</p>
          <div className="flex items-center gap-4">
            {filtered && (
              <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 min-h-11 text-white hover:text-gold">
                <X className="w-4 h-4" /> Clear
              </button>
            )}
            <label htmlFor="home-sort" className="sr-only">Sort by</label>
            <select id="home-sort" value={sort} onChange={(e) => change(setSort)(e.target.value)} className="field !min-h-11 !w-auto !py-0 text-sm">
              {sorts.map((x) => <option key={x.v} value={x.v}>{x.l}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-3">
          {list.length ? (
            <>
              <ProductGrid products={list.slice(0, limit)} />
              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                {list.length > limit && (
                  <button type="button" onClick={() => setLimit((n) => n + PAGE)} className="btn-ghost w-full sm:w-auto">
                    Show more ({list.length - limit} left) <ChevronDown className="w-4 h-4" />
                  </button>
                )}
                <Link to={seeAllUrl} className="btn-primary w-full sm:w-auto">Open full supplements page <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </>
          ) : (
            <div className="border border-dashed border-line py-14 px-6 text-center">
              <SearchX className="w-10 h-10 mx-auto text-mute" strokeWidth={1.25} />
              <h3 className="mt-5 text-3xl sm:text-4xl">No supplements found</h3>
              <p className="mt-3 text-mute">Try a different category, or ask us — we may be able to source it.</p>
              <button type="button" onClick={reset} className="btn-primary mt-7">Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
