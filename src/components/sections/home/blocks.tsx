import Link from 'next/link';
import { Badge, Button, Chip, Human, Icon, Ring, Section, SectionHead, Tile, type IconName } from '@/components/ui';
import { AGENT_FEATURES, AGENTS, CONSOLE_HREF, HOME, METRICS, PRODUCTS, PROTOTYPE, RUNS_ON } from '@/content/site';

/** The runtimes the session layer runs on. Real, so it stands where a logo wall would. */
export function RunsOn() {
  return (
    <section className="wrap mt-10">
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-y border-line py-5">
        <li className="t-label">Runs on</li>
        {RUNS_ON.map((r) => <li key={r} className="text-[17px] font-medium tracking-[-.02em] text-fg-2">{r}</li>)}
      </ul>
    </section>
  );
}

export function Metrics() {
  return (
    <Section>
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {METRICS.map((m) => (
          <li key={m.value} className="grid content-start gap-4 bg-surface p-7 sm:p-9">
            <span className="t-stat">{m.value}</span>
            <span className="t-stat-label max-w-[300px]">{m.label}</span>
          </li>
        ))}
      </ul>
      <p className="t-small mt-4">Measured on Lumenar’s own coding-agent logs.</p>
    </Section>
  );
}

const F = Object.fromEntries(AGENT_FEATURES.map((f) => [f.name, f]));
const SMALL: [string, IconName][] = [['Plan first', 'plan'], ['Trace and audit log', 'log'], ['Hand-offs to people', 'handoff'], ['Stop, any time', 'stop']];

/** Six features: two large cards with a piece of the product in them, four small ones. */
export function FeatureBento() {
  return (
    <Section id="features">
      <SectionHead eyebrow="What every agent does" title="Work you can check, step by step." lede="Agents are useful when you can see what they did and stop what they shouldn’t do. Each of these is built in, not bolted on." />
      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        <article data-tone="lime" className="grid content-between gap-10 rounded-2xl p-7 sm:p-9 lg:col-span-7">
          <div className="grid max-w-[440px] gap-3">
            <h3 className="t-bento">{F['Approval gates'].name}</h3>
            <p className="text-[16px] leading-[26px] text-fg-2">{F['Approval gates'].desc}</p>
          </div>
          <div data-tone="paper" aria-hidden="true" className="grid max-w-[420px] justify-items-start gap-3 justify-self-end rounded-xl border border-line bg-surface! p-5 shadow-float">
            <Chip state="waiting">Needs approval</Chip>
            <b className="text-[17px] font-medium tracking-[-.01em]">Refund $48.00 · order 88213</b>
            <p className="t-body">Within policy: delivered damaged 9 days ago.</p>
            <div className="flex gap-2">
              <span className="rounded-lg bg-fg px-3.5 py-2 text-[13px] font-medium text-bg">Approve</span>
              <span className="rounded-lg border border-line px-3.5 py-2 text-[13px] font-medium">Redirect</span>
            </div>
            <span className="flex items-center gap-2 text-[13px] text-fg-3"><Human initials="PN" /> Priya N. · Support lead</span>
          </div>
        </article>

        <article className="grid content-between gap-10 rounded-2xl bg-accent-soft p-7 sm:p-9 lg:col-span-5">
          <div className="grid gap-3">
            <h3 className="t-bento">{F['Step receipts'].name}</h3>
            <p className="text-[16px] leading-[26px] text-fg-2">{F['Step receipts'].desc}</p>
          </div>
          <div aria-hidden="true" className="card grid gap-0 p-5 font-mono text-[12px] leading-5 shadow-float">
            {[['Read ticket 4812', '0.4s'], ['Looked up order 88213', '0.8s'], ['Checked refund policy', '0.2s'], ['Drafted the reply', '1.9s']].map(([what, t]) => (
              <span key={what} className="flex justify-between gap-4 border-b border-line py-2 text-fg-2"><span>{what}</span><span className="text-fg-3">{t}</span></span>
            ))}
            <span className="flex justify-between gap-4 pt-3 font-medium"><span>6 steps · 41s</span><span>$0.08</span></span>
          </div>
        </article>

        {SMALL.map(([name, icon]) => (
          <article key={name} className="card lift grid content-start gap-4 p-6 sm:col-span-1 lg:col-span-3">
            <span className="grid size-10 place-items-center rounded-lg bg-raise"><Icon name={icon} size={19} /></span>
            <h3 className="t-h3">{F[name].name}</h3>
            <p className="t-body">{F[name].desc}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/** One agent card. Shared with the agents page. */
export function AgentCard({ a }: { a: (typeof AGENTS)[number] }) {
  return (
    <article className="card lift grid content-start gap-5 p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Ring />
          <div className="grid"><h3 className="t-h3">{a.title}</h3><span className="font-mono text-[12px] text-fg-3">{a.id}</span></div>
        </div>
        <Badge />
      </div>
      <p className="t-body">{a.job}</p>
      <p className="flex flex-wrap gap-1.5">{a.tools.map((t) => <span key={t} className="tag">{t}</span>)}</p>
      <p className="border-t border-line pt-4 text-[13px] leading-5 text-fg-3">Waits for a person: <span className="text-fg">{a.approval}</span></p>
    </article>
  );
}

export function AgentCatalogue() {
  return (
    <Section id="agents">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow="The agents" title="Each agent has a job title and a catalogue ID." />
        <Button href="/agents" variant="ghost" arrow>All agents</Button>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((a) => <AgentCard key={a.id} a={a} />)}
        <Link href="/contact" data-tone="lime" className="nudge grid content-between gap-8 rounded-xl p-6">
          <span className="t-bento max-w-[240px]">Have a workflow in mind? Put one agent on it.</span>
          <span className="flex items-center gap-2 text-[15px] font-medium">Request a pilot <Icon name="arrow-up-right" size={16} /></span>
        </Link>
      </div>
    </Section>
  );
}

export function SoftwareTeaser() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow="Software" title="Products with agents inside." lede="The same agents, inside calm products your team uses every day, on one account." />
        <Button href="/software" variant="ghost" arrow>The software</Button>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {PRODUCTS.map((p) => (
          <article key={p.name} className="card lift grid content-start gap-5 p-7">
            <div className="flex items-start justify-between gap-3"><Tile size="lg" /><Badge /></div>
            <h3 className="t-bento">{p.name}</h3>
            <p className="t-body max-w-[420px]">{p.desc}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/** The closing ask, on ink, with the turning silver star. */
/** The Inferstack prototype: real measurements and the way into the live Console. */
export function Prototype() {
  return (
    <Section id="inferstack">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          eyebrow="Inferstack prototype"
          title="The session layer is running."
          lede="Inferstack is the gateway under our agents. On a laptop with no GPU, the second turn of a session already costs a fraction of the first."
        />
        <div className="flex flex-wrap gap-3">
          <Button href={CONSOLE_HREF}>Open the Console</Button>
          <Button href="/inferstack" variant="ghost" arrow>How it works</Button>
        </div>
      </div>
      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {PROTOTYPE.map((m) => (
          <li key={m.value} className="grid content-start gap-4 bg-surface p-7 sm:p-9">
            <span className="t-stat">{m.value}</span>
            <span className="t-stat-label max-w-[300px]">{m.label}</span>
          </li>
        ))}
      </ul>
      <p className="t-small mt-4">Measured on the Inferstack prototype: Qwen2.5 0.5B and 1.5B on llama.cpp, CPU only.</p>
    </Section>
  );
}

export function Closing() {
  const c = HOME.closing;
  return (
    <section className="wrap sec mb-0!">
      <div data-tone="ink" className="relative grid items-center gap-10 overflow-hidden rounded-3xl p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:p-16">
        <div className="dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative grid justify-items-start gap-6">
          <h2 className="t-h2-lg max-w-[620px]">{c.title}</h2>
          <p className="t-lede max-w-[480px]">{c.body}</p>
          <div className="flex flex-wrap gap-3">
            <Button href={c.primary.href}>{c.primary.label}</Button>
            <Button href={c.secondary.href} variant="ghost" arrow>{c.secondary.label}</Button>
          </div>
        </div>
        <div className="turn relative justify-self-center lg:mr-10" aria-hidden="true" />
      </div>
    </section>
  );
}
