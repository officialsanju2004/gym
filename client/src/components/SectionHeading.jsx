import Reveal from './Reveal';

export default function SectionHeading({ title, text, align = 'left', as = 'h2', className = '' }) {
  const Tag = as;
  return (
    <Reveal className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      <Tag className="text-5xl sm:text-6xl lg:text-7xl">{title}</Tag>
      {text && <p className="mt-5 text-mute text-lg leading-relaxed max-w-xl" style={align === 'center' ? { marginInline: 'auto' } : undefined}>{text}</p>}
    </Reveal>
  );
}
