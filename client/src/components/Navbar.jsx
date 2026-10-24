import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import { nav, site } from '../config/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? 'bg-ink/95 backdrop-blur border-b border-line' : 'bg-transparent border-b border-transparent'}`}>
      <div className="container-x flex h-[72px] items-center justify-between">
        <Link to="/" aria-label={`${site.brand} — Home`} className="relative z-10"><Logo /></Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-9">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => `relative py-2 text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-mute hover:text-white'}`}>
              {({ isActive }) => (
                <>
                  {n.label}
                  {isActive && <motion.span layoutId="nav-ind" className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-flame" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/supplements" className="btn-primary !min-h-11">Shop Supplements</Link>
        </div>

        <button
          type="button"
          className="md:hidden relative z-10 grid place-items-center w-11 h-11 -mr-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="md:hidden absolute inset-x-0 top-full bg-ink border-b border-line px-5 pt-2 pb-6"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `block py-3.5 border-b border-line font-display font-extrabold text-3xl uppercase ${isActive ? 'text-gold' : 'text-white'}`}>
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <Link to="/supplements" className="btn-primary w-full mt-6">Shop Supplements</Link>
            <a href={site.contact.phoneHref} className="btn-ghost w-full mt-3"><Phone className="w-4 h-4" /> Call {site.contact.phone}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
