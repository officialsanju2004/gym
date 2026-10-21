import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Dumbbell, Users, Building2, Trophy, Target, Eye, Handshake, ShieldCheck, Gem, Lightbulb } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import LogoImage from '../components/LogoImage';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { site } from '../config/site';
import { useSEO } from '../hooks/useSEO';
import { openWhatsApp, generalMessage } from '../utils/whatsapp';

const approach = [
  ['Product selection', 'We compare products by formulation, label transparency and brand reputation, then recommend what suits your goal.'],
  ['Product quality', 'We look for clearly labelled products from brands we can stand behind.'],
  ['Customer assistance', 'Ask us anything before you buy. We reply to enquiries on WhatsApp, by phone and in the shop.'],
  ['Every kind of trainee', 'A first-timer and a competitive lifter need different things. We help with both.'],
];
const serve = [
  [Sprout, 'Beginners'], [Dumbbell, 'Regular lifters'], [Trophy, 'Athletes'],
  [Users, 'Trainers and coaches'], [Building2, 'Gyms and studios'],
];
const values = [
  [ShieldCheck, 'Honesty', 'Clear answers on what we can supply and what it costs.'],
  [Gem, 'Quality', 'Products we would be comfortable using ourselves.'],
  [Handshake, 'Service', 'Help that continues after the enquiry.'],
  [Lightbulb, 'Fit', 'The right product for your goal, not the most expensive one.'],
];

export default function About() {
  useSEO({ title: 'About Us', description: `Learn about ${site.brand} in Ferozepur City: our story, mission, approach and the customers we serve.`, path: '/about' });
  return (
    <>
      <section className="relative pt-40 pb-24 overflow-hidden knurl">
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="text-6xl sm:text-8xl lg:text-[8.5rem]">Fuel worth training on.</h1>
            <p className="mt-8 text-mute text-lg max-w-xl leading-relaxed">{site.brand} supplies gym supplements to people and gyms in and around Ferozepur who take training seriously.</p>
          </div>
          <LogoImage eager className="mx-auto max-w-[320px] sm:max-w-[420px] lg:max-w-[460px]" sizes="(min-width:1024px) 460px, 420px" />
        </div>
      </section>

      <section className="py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <SectionHeading title="Our story" />
          <Reveal className="space-y-5 text-lg text-mute leading-relaxed">
            {site.story.map((s) => <p key={s}>{s}</p>)}
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-coal">
        <div className="container-x grid md:grid-cols-2">
          <Reveal className="py-16 md:pr-14 md:border-r border-line">
            <Target className="w-8 h-8 text-gold" strokeWidth={1.5} />
            <h2 className="mt-5 text-5xl">Mission</h2>
            <p className="mt-4 text-mute leading-relaxed">To make good sports nutrition easy to find and easy to choose, for everyone from first-time gym-goers to serious athletes.</p>
          </Reveal>
          <Reveal delay={0.08} className="py-16 md:pl-14 border-t md:border-t-0 border-line">
            <Eye className="w-8 h-8 text-gold" strokeWidth={1.5} />
            <h2 className="mt-5 text-5xl">Vision</h2>
            <p className="mt-4 text-mute leading-relaxed">To be the first name people in Ferozepur think of when they want honest advice on supplements.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading title="Our approach" />
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {approach.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 2) * 0.08} className="border-t border-line pt-6">
                <h3 className="text-3xl">{t}</h3>
                <p className="mt-3 text-mute leading-relaxed">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-coal border-y border-line">
        <div className="container-x">
          <SectionHeading title="Who we serve" />
          <ul className="mt-12 grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-5">
            {serve.map(([Icon, label], i) => (
              <Reveal as="li" key={label} delay={i * 0.05} className="bg-coal p-7 min-h-44 flex flex-col justify-between">
                <Icon className="w-8 h-8 text-gold" strokeWidth={1.25} aria-hidden="true" />
                <p className="font-display font-extrabold uppercase text-2xl leading-tight">{label}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading title="Our values" />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([Icon, t, d], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <Icon className="w-7 h-7 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-4 text-3xl">{t}</h3>
                <p className="mt-2 text-mute leading-relaxed">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8">
        <Reveal className="container-x">
          <div className="bg-flame text-white p-8 sm:p-14 flex flex-wrap items-center justify-between gap-8">
            <h2 className="text-5xl sm:text-7xl max-w-xl">Ready to fuel your training?</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/supplements" className="btn bg-black text-white hover:bg-white hover:text-black">Supplements <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/contact" className="btn border border-white/60 hover:bg-white hover:text-black">Contact</Link>
              <button type="button" onClick={() => openWhatsApp(generalMessage())} className="btn bg-wa text-black hover:bg-white"><WhatsAppIcon className="w-5 h-5" /> WhatsApp</button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
