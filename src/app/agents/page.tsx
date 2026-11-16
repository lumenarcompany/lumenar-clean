import type { Metadata } from 'next';
import Fit from '@/components/Fit';
import Reveal from '@/components/Reveal';
import Shell from '@/components/Shell';
import AgentsConsole from '@/components/mocks/AgentsConsole';
import { AgentCard, Closing } from '@/components/sections/home/blocks';
import { Badge, Button, Icon, PageHero, Section, SectionHead, type IconName } from '@/components/ui';
import { AGENT_FEATURES, AGENTS, CONSOLE_HREF, MECHANISMS, SWITCH_STEPS } from '@/content/site';

export const metadata: Metadata = {
  title: 'Agents',
  description: 'Lumenar agents plan first, leave a receipt for every step, wait at approval gates and hand off to your people.',
};

const FEATURE_ICONS: IconName[] = ['plan', 'receipt', 'log', 'gate', 'handoff', 'stop'];
const MECHANISM_ICONS: IconName[] = ['cache', 'layout', 'route', 'swap'];

export default function AgentsPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Agents"
        title={<>Agents with a job title and a <em>paper trail.</em></>}
        lede="Each agent has one job, a catalogue ID and a set of tools. You watch the fleet, approve what matters, and read the trail of anything it did."
      >
        <Button href="/contact">Request a pilot</Button>
        <Button href="#catalogue" variant="ghost">The catalogue</Button>
        <Button href="/inferstack" variant="ghost">The gateway underneath</Button>
      </PageHero>

      <Section id="catalogue" className="mt-0!">
        <SectionHead eyebrow="Catalogue" title="Agents named for the job they do." lede="A job title and a catalogue ID, never a human name or face. These five are examples of what a pilot can start with." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a) => <AgentCard key={a.id} a={a} />)}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHead eyebrow="What every agent does" title="Nothing happens that you can’t see, stop or undo." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AGENT_FEATURES.map((f, i) => (
              <li key={f.name}>
                <a href="#console" className="card lift nudge grid h-full content-start gap-4 p-6">
                  <span className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-lg bg-accent text-accent-ink"><Icon name={FEATURE_ICONS[i]} size={19} /></span>
                    <Icon name="arrow-up-right" size={16} className="text-fg-3" />
                  </span>
                  <h3 className="t-h3">{f.name}</h3>
                  <p className="t-body">{f.desc}</p>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="console">
        <Reveal>
          <SectionHead eyebrow="The console" title="The fleet, the sessions and one agent’s trail." lede="The selected agent shows its approved plan, each traced step, the approval gate, its receipt and a live timer. Press Stop and it stops." />
          <div className="dots mt-12 rounded-2xl border border-line bg-raise p-2.5 sm:rounded-3xl sm:p-6 lg:p-10">
            <div className="overflow-hidden rounded-[10px] shadow-window">
              <Fit label="The full Lumenar agents console with example data"><AgentsConsole /></Fit>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="t-small flex items-center gap-2">Sample data throughout. <Badge /></p>
            <Button href={CONSOLE_HREF} variant="ghost" arrow>Open the live Inferstack Console</Button>
          </div>
        </Reveal>
      </Section>

      <Section id="under-the-hood">
        <Reveal>
          <SectionHead eyebrow="Under the hood" title="The session layer: four mechanisms." lede="Long agent sessions resend the same context again and again. The session layer is built so they don’t pay for it twice." />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2">
            {MECHANISMS.map((m, i) => (
              <li key={m.name} className="card grid content-start gap-4 p-7">
                <span className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-lg bg-raise"><Icon name={MECHANISM_ICONS[i]} size={19} /></span>
                  <span className="t-label">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <h3 className="t-bento">{m.name}</h3>
                <p className="t-body">{m.desc}</p>
                <p className="flex flex-wrap gap-1.5">{m.tags.map((t) => <span key={t} className="tag">{t}</span>)}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal className="mt-16">
          <h3 className="t-bento mb-6">What happens when you switch models mid-session</h3>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {SWITCH_STEPS.map((s, i) => (
              <li key={s.name} className="grid content-start gap-2 bg-surface p-5">
                <span className="grid size-7 place-items-center rounded-full bg-accent font-mono text-[12px] font-medium text-accent-ink">{i + 1}</span>
                <strong className="t-h3">{s.name}</strong>
                <p className="t-body">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      <Closing />
    </Shell>
  );
}
