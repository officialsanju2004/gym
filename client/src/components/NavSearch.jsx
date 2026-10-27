import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import ProductImage from './ProductImage';
import { products, formatPrice } from '../data/products';

const MAX = 6;

function useMatches(q) {
  return useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return { list: [], total: 0 };
    const hit = products.filter((p) => [p.name, p.category, p.imported ? 'imported' : ''].join(' ').toLowerCase().includes(term));
    // names that start with the typed text come first
    hit.sort((a, b) => Number(b.name.toLowerCase().startsWith(term)) - Number(a.name.toLowerCase().startsWith(term)));
    return { list: hit.slice(0, MAX), total: hit.length };
  }, [q]);
}

/** Suggestions list shared by the desktop dropdown and the mobile panel */
function Suggestions({ q, list, total, active, onPick, onAll }) {
  if (!q.trim()) return null;
  return (
    <div id="nav-search-list" role="listbox" className="border border-line bg-ink shadow-2xl">
      {list.length ? (
        <>
          <ul>
            {list.map((p, n) => (
              <li key={p.id} role="option" aria-selected={n === active}>
                <Link to={`/supplements/${p.slug}`} onClick={onPick} className={`flex items-center gap-3 px-3 py-2.5 border-b border-line transition-colors ${n === active ? 'bg-coal' : 'hover:bg-coal'}`}>
                  <span className="aspect-[4/3] w-14 shrink-0 overflow-hidden bg-black"><ProductImage product={p} className="h-full w-full" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-white">{p.name}</span>
                    <span className="block truncate text-xs text-mute">{p.category}{p.imported ? ' · Imported' : ''}</span>
                  </span>
                  <span className="shrink-0 font-display text-xl font-extrabold text-gold">{formatPrice(p)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button type="button" onClick={onAll} className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-white hover:text-gold">
            See all {total} {total === 1 ? 'result' : 'results'} for “{q.trim()}” <ArrowRight className="h-4 w-4" />
          </button>
        </>
      ) : (
        <p className="px-4 py-5 text-sm text-mute">No supplements found for “{q.trim()}”. Try another name or category, or ask us on WhatsApp.</p>
      )}
    </div>
  );
}

/**
 * Navbar product search. lg+: always-visible box with a dropdown. Below lg: search icon that opens a full-width panel.
 * Enter (or "See all") opens /supplements?q=... where every match is listed.
 */
export default function NavSearch({ panelOpen, setPanelOpen }) {
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState(-1);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const wrap = useRef(null);
  const mobileInput = useRef(null);
  const { list, total } = useMatches(q);

  const done = () => { setQ(''); setFocus(false); setActive(-1); setPanelOpen(false); };
  const showAll = () => {
    const t = q.trim();
    if (!t) return;
    navigate(`/supplements?q=${encodeURIComponent(t)}`);
    done();
  };

  useEffect(() => { setActive(-1); }, [q]);
  useEffect(() => { done(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [pathname]);
  useEffect(() => { if (panelOpen) mobileInput.current?.focus(); }, [panelOpen]);
  useEffect(() => {
    const out = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setFocus(false); };
    document.addEventListener('pointerdown', out);
    return () => document.removeEventListener('pointerdown', out);
  }, []);

  const onKey = (e) => {
    if (e.key === 'Escape') { setFocus(false); setPanelOpen(false); e.currentTarget.blur(); }
    else if (e.key === 'ArrowDown' && list.length) { e.preventDefault(); setActive((a) => (a + 1) % list.length); }
    else if (e.key === 'ArrowUp' && list.length) { e.preventDefault(); setActive((a) => (a <= 0 ? list.length - 1 : a - 1)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (active >= 0 && list[active]) { navigate(`/supplements/${list[active].slug}`); done(); } else showAll();
    }
  };

  const field = (ref, id) => (
    <div className="relative">
      <label htmlFor={id} className="sr-only">Search supplements</label>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" aria-hidden="true" />
      <input
        id={id} ref={ref} type="search" value={q} autoComplete="off" enterKeyHint="search"
        role="combobox" aria-expanded={!!q.trim()} aria-controls="nav-search-list"
        onChange={(e) => setQ(e.target.value)} onFocus={() => setFocus(true)} onKeyDown={onKey}
        placeholder="Search supplements" className="field !min-h-11 !pl-10 text-sm"
      />
    </div>
  );

  return (
    <>
      {/* desktop */}
      <div ref={wrap} className="relative hidden w-52 xl:w-64 lg:block">
        {field(null, 'nav-search')}
        {focus && q.trim() && (
          <div className="absolute right-0 top-full z-50 mt-2 w-[min(26rem,90vw)]"><Suggestions q={q} list={list} total={total} active={active} onPick={done} onAll={showAll} /></div>
        )}
      </div>

      {/* mobile / tablet: icon + panel */}
      <button type="button" onClick={() => setPanelOpen(!panelOpen)} aria-label={panelOpen ? 'Close search' : 'Search supplements'} aria-expanded={panelOpen}
        className="relative z-10 grid h-11 w-11 place-items-center lg:hidden">
        {panelOpen ? <X /> : <Search />}
      </button>
      {panelOpen && (
        <div className="absolute inset-x-0 top-full z-40 max-h-[calc(100svh-72px)] overflow-y-auto border-b border-line bg-ink px-5 pb-5 pt-3 lg:hidden">
          {field(mobileInput, 'nav-search-m')}
          <div className="mt-2"><Suggestions q={q} list={list} total={total} active={active} onPick={done} onAll={showAll} /></div>
        </div>
      )}
    </>
  );
}
