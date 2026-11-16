'use client';
import { useEffect, useRef, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV, NAV_MENUS, isStaticPath } from '@/content/site';
import { ArrowUpRight, Button } from './ui';

/** Desktop links with hover panels, the mobile dialog, and the header's scrolled state. */
export default function HeaderMenus() {
  const path = usePathname();
  const anchor = useRef<HTMLSpanElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const header = anchor.current?.closest('header');
    if (!header) return;
    const update = () => { header.dataset.scrolled = String(scrollY > 4); };
    update();
    addEventListener('scroll', update, { passive: true });
    return () => removeEventListener('scroll', update);
  }, []);

  const current = (href: string) => (path === href || path.startsWith(href + '/') ? ('page' as const) : undefined);
  const closeOnEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') (document.activeElement as HTMLElement | null)?.blur(); };

  return (
    <>
      <span ref={anchor} hidden />
      <nav aria-label="Main" className="hidden items-center gap-0.5 nav:flex" onKeyDown={closeOnEsc}>
        {NAV.map((n) => (
          <div key={n.href} className="nav-item relative">
            <Link href={n.href} className="nav-link t-nav" aria-current={current(n.href)}>{n.label}</Link>
            {NAV_MENUS[n.href] && (
              <div className="nav-panel">
                {NAV_MENUS[n.href].map((m) => {
                  const body = (
                    <>
                      <span className="block text-[14px] leading-5 font-medium text-fg">{m.title}</span>
                      <span className="block text-[13px] leading-[19px] text-fg-3">{m.desc}</span>
                    </>
                  );
                  return isStaticPath(m.href)
                    ? <a key={m.href} href={m.href} className="nav-row">{body}</a>
                    : <Link key={m.href} href={m.href} className="nav-row">{body}</Link>;
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
      <button
        type="button"
        aria-label="Open navigation"
        aria-haspopup="dialog"
        className="grid size-10 place-items-center rounded-lg border border-line bg-surface nav:hidden"
        onClick={() => dialog.current?.showModal()}
      >
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
          <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <dialog ref={dialog} className="menu-dialog" aria-label="Navigation" onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}>
        <div className="mb-4 flex items-center justify-between">
          <p className="t-eyebrow">Menu</p>
          <button type="button" aria-label="Close navigation" className="grid size-10 place-items-center rounded-lg border border-line" onClick={() => dialog.current?.close()}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m1 1 10 10M11 1 1 11" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="grid">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href)} onClick={() => dialog.current?.close()} className="nudge flex items-center justify-between gap-4 border-b border-line py-4 text-[22px] leading-7 font-medium tracking-[-.02em]">
              {n.label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </nav>
        <div className="mt-6 grid"><Button href="/contact">Request a pilot</Button></div>
      </dialog>
    </>
  );
}
