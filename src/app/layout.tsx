import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
/* Lumenar Astra is caps and digits only: it sets the wordmark and nothing else. */
const astra = localFont({ src: '../fonts/LumenarAstra.ttf', variable: '--font-astra', display: 'swap' });

/* Production lives on GitHub Pages at lumenar.company; Vercel previews keep their own host. */
const host = process.env.SITE_HOST ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'lumenar.company';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${host}`),
  title: { default: 'Lumenar · Agents that do the work, and show it', template: '%s · Lumenar' },
  description:
    'Lumenar builds AI agents and software on its own session layer. Every step has a receipt, and anything irreversible waits for a person.',
};

/* Runs before first paint so the theme, reveals and the motion preference never flash. Light unless the visitor chose dark. */
const prePaint = `(function(){var d=document.documentElement,m=null,t=null;d.dataset.js="1";try{m=localStorage.getItem("lumenar-motion");t=localStorage.getItem("lumenar-theme")}catch(e){}d.dataset.theme=t==="dark"?"dark":"light";d.dataset.reducedMotion=m==="off"||(m===null&&matchMedia("(prefers-reduced-motion: reduce)").matches)?"true":"false"})()`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" data-theme="light" className={`${sans.variable} ${mono.variable} ${astra.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
