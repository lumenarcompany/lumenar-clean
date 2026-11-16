/* eslint-disable @next/next/no-img-element -- the mark is one small static image; next/image adds nothing here */
import Link from 'next/link';
import { isStaticPath } from '@/content/site';

/* Icons: one stroke set, drawn here so the site ships no icon package. */
const ICONS = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  chevron: 'm6 9 6 6 6-6',
  plus: 'M12 5v14M5 12h14',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z',
  plan: 'm4 6.5 1.5 1.5L8 5.5M4 12.5 5.5 14 8 11.5M4 18.5 5.5 20 8 17.5M12 7h8M12 13h8M12 19h8',
  receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6',
  log: 'M7 4h10a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 9h6M9 13h6M9 17h3',
  gate: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.500-7-4.5-7-9V6zM9 12l2 2 4-4',
  handoff: 'M9 11a3.5 3.5 0 1 0 0-7 3.500 3.500 0 0 0 0 7zM2.5 20c.6-3.400 3.200-5.500 6.500-5.500s5.900 2.100 6.500 5.500M16 4.500a3.500 3.500 0 0 1 0 6.500M18.500 14.800c1.600.800 2.700 2.600 3 5.200',
  stop: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 9h6v6H9z',
  cache: 'm12 3-9 5 9 5 9-5zM3 12l9 5 9-5M3 16l9 5 9-5',
  layout: 'M4 5h16v14H4zM4 10h16M10 10v9',
  route: 'M4 12h6l4-6h6M10 12l4 6h6M17 3l3 3-3 3M17 15l3 3-3 3',
  swap: 'm17 3 4 4-4 4M21 7H7a4 4 0 0 0-4 4M7 21l-4-4 4-4M3 17h14a4 4 0 0 0 4-4',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
} as const;
export type IconName = keyof typeof ICONS;

export const Icon = ({ name, size = 18, className }: { name: IconName; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d={ICONS[name]} />
  </svg>
);
export const ArrowUpRight = ({ size = 14 }: { size?: number }) => <Icon name="arrow-up-right" size={size} />;
export const Check = ({ size = 16 }: { size?: number }) => <Icon name="check" size={size} />;
export const Chevron = ({ size = 16 }: { size?: number }) => <Icon name="chevron" size={size} />;

/** The silver star and the Astra wordmark. `size` is the star's height in px. */
export function Logo({ size = 26, wordmark = true }: { size?: number; wordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src="/brand/star.webp" alt="" width={Math.round(size * 0.78)} height={size} className="logo-star" style={{ height: size }} />
      {wordmark && <span className="font-astra leading-none tracking-[.14em]" style={{ fontSize: Math.round(size * 0.68) }}>LUMENAR</span>}
    </span>
  );
}

export function Section({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`wrap sec ${className}`}>
      {children}
    </section>
  );
}

export const Eyebrow = ({ children }: { children: React.ReactNode }) => <p className="t-eyebrow">{children}</p>;

/** Eyebrow, section heading and an optional lede. `center` centres the block. */
export function SectionHead({ eyebrow, title, lede, large = false, center = false, className = '' }: { eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; large?: boolean; center?: boolean; className?: string }) {
  return (
    <header className={`grid gap-4 ${center ? 'justify-items-center text-center' : ''} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={large ? 't-h2-lg' : 't-h2'}>{title}</h2>
      {lede && <p className="t-lede max-w-[620px]">{lede}</p>}
    </header>
  );
}

/** Page opener for the inner pages: eyebrow, H1 with one marked phrase, lede, actions. */
export function PageHero({ eyebrow, title, lede, children }: { eyebrow: string; title: React.ReactNode; lede?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="wrap grid justify-items-start gap-6 pt-[clamp(48px,7vw,96px)] pb-[clamp(40px,5vw,64px)]">
      <p className="t-eyebrow arrive">{eyebrow}</p>
      <h1 className="t-display arrive max-w-[900px] [animation-delay:.06s]">{title}</h1>
      {lede && <p className="t-lede arrive max-w-[640px] [animation-delay:.14s]">{lede}</p>}
      {children && <div className="arrive flex flex-wrap gap-3 [animation-delay:.2s]">{children}</div>}
    </section>
  );
}

export type State = 'queued' | 'working' | 'waiting' | 'handed' | 'done' | 'failed';
const STATE_LABEL: Record<State, string> = {
  queued: 'Queued', working: 'Working', waiting: 'Waiting on you', handed: 'Handed off', done: 'Done', failed: 'Failed',
};
/** The shared status set. The brand accent never means a status. */
export const Chip = ({ state, children }: { state: State; children?: React.ReactNode }) => (
  <span className={`st st-${state}`}>{children ?? STATE_LABEL[state]}</span>
);

/** Agent presence: the mark in a ring. `working` adds the glint. */
export function Ring({ size = '', working = false }: { size?: '' | 'xs' | 'lg'; working?: boolean }) {
  return (
    <span className={`ring ${size} ${working ? 'on' : ''}`}>
      <img src="/brand/star.webp" alt="" width={15} height={20} className="logo-star" />
      {working && <i className="glint" />}
    </span>
  );
}

/** People are round initials. The mark is never a person. */
export const Human = ({ initials, size = '' }: { initials: string; size?: '' | 'xs' | 'lg' }) => (
  <span className={`human ${size}`} aria-hidden="true">{initials}</span>
);

/** A product tile: the mark on a rounded square. */
export const Tile = ({ size = '' }: { size?: '' | 'lg' | 'sm' | 'xs' }) => (
  <span className={`ptile ${size}`}>
    <img src="/brand/star.webp" alt="" width={18} height={24} className="logo-star" />
  </span>
);

/** `primary` is the split CTA; `ghost` is the quiet outline. */
export function Button({ href, variant = 'primary', size, arrow = false, children }: { href: string; variant?: 'primary' | 'ghost'; size?: 'sm'; arrow?: boolean; children: React.ReactNode }) {
  const cls = `${variant === 'primary' ? 'cta' : 'btn btn-ghost nudge'} ${size ?? ''}`;
  const body = variant === 'primary'
    ? <><span className="cta-label">{children}</span><span className="cta-arrow"><Icon name="arrow" size={size ? 16 : 18} /></span></>
    : <>{children}{arrow && <ArrowUpRight />}</>;
  return href.startsWith('/') && !isStaticPath(href) ? (
    <Link href={href} className={cls}>{body}</Link>
  ) : (
    <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{body}</a>
  );
}

/** Anything invented carries this, so nothing invented reads as fact. */
export const Badge = ({ children = 'Example', live = false }: { children?: React.ReactNode; live?: boolean }) => (
  <span className={`badge ${live ? 'live' : ''}`}>{children}</span>
);
