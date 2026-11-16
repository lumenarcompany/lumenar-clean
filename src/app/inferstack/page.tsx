import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import Shell from '@/components/Shell';
import { Closing } from '@/components/sections/home/blocks';
import { Badge, Button, Icon, PageHero, Section, SectionHead } from '@/components/ui';
import { CONSOLE_HREF, CONSOLE_STEPS, INFERSTACK_FEATURES, PROTOTYPE, PROTOTYPE_SETUP, SWITCH_STEPS, WHY_INFERSTACK } from '@/content/site';

export const metadata: Metadata = {
  title: 'Inferstack',
  description: 'Inferstack is Lumenar’s session-aware inference gateway for AI agents on open models: session cache, step routing, a cost ledger and a live Console.',
};

const API_SNIPPET = `from openai import OpenAI
client = OpenAI(base_url="https://<your-gateway>/v1", api_key="sk-lmn-...")
reply = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "Hello"}],
    extra_headers={"x-inferstack-session": "my-agent-1"},
)`;

const META_LINE = '[engine=cheap route=session_sticky:cheap cache=97.1% ttft=0.217s served=$0.000008 ref=$0.000002]';

export default function InferstackPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Inferstack"
        title={<>Your agent shouldn’t pay for the same tokens <em>twice.</em></>}
        lede="Inferstack is the session layer under every Lumenar agent: an inference gateway for open models. It keeps each session on the engine that already holds its cache, sends each step to the cheapest model that fits, and records what every request really cost."
      >
        <Button href={CONSOLE_HREF}>Open the Console</Button>
        <Button href="#measured" variant="ghost">What it measures</Button>
      </PageHero>

      <Section id="measured" className="mt-0!">
        <Reveal>
          <SectionHead
            eyebrow="What the prototype measures"
            title="Measured on a laptop with no GPU."
            lede="Two Qwen2.5 models served by llama.cpp behind one gateway. The same two-turn session was run cold, and then with the session cache."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {PROTOTYPE.map((m) => (
              <li key={m.value} className="grid content-start gap-4 bg-surface p-7 sm:p-9">
                <span className="t-stat">{m.value}</span>
                <span className="t-stat-label max-w-[300px]">{m.label}</span>
              </li>
            ))}
          </ul>
          <p className="t-small mt-4 max-w-[820px]">{PROTOTYPE_SETUP}</p>
        </Reveal>
      </Section>

      <Section id="what-it-does">
        <Reveal>
          <SectionHead
            eyebrow="What Inferstack does"
            title="It sits between your agent and your engines."
            lede="Your agent keeps using the OpenAI chat API. It adds one header for the session."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INFERSTACK_FEATURES.map((f) => (
              <li key={f.name} className="card grid content-start gap-4 p-6">
                <span className="grid size-10 place-items-center rounded-lg bg-raise"><Icon name={f.icon} size={19} /></span>
                <h3 className="t-h3">{f.name}</h3>
                <p className="t-body">{f.desc}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="mt-10">
          <div className="grid gap-5 lg:grid-cols-2">
            <figure className="card grid content-start gap-3 overflow-hidden p-6">
              <figcaption className="t-label">One extra header</figcaption>
              <pre className="overflow-x-auto rounded-lg bg-raise p-4 font-mono text-[13px] leading-[21px]"><code>{API_SNIPPET}</code></pre>
            </figure>
            <figure className="card grid content-start gap-3 overflow-hidden p-6">
              <figcaption className="t-label">Every response says what it cost</figcaption>
              <pre className="overflow-x-auto rounded-lg bg-raise p-4 font-mono text-[13px] leading-[21px]"><code>{META_LINE}</code></pre>
              <p className="t-body">Engine, route, cache hit, time to first token, served cost and the list-price reference, on every request. The same numbers go into the ledger.</p>
            </figure>
          </div>
        </Reveal>
      </Section>

      <Section id="console">
        <Reveal>
          <div className="rounded-3xl bg-raise p-6 sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead
                eyebrow="Inferstack Console"
                title="The control panel for a gateway."
                lede="Create an agent from a template, give it a task, press Run, and watch the result stream in with the engine, cache hit and cost it took. It runs in your browser and talks to your own gateway; your prompts never pass through us."
              />
              <span className="flex items-center gap-3"><Badge live>Live</Badge><Button href={CONSOLE_HREF}>Open the Console</Button></span>
            </div>
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {CONSOLE_STEPS.map((s, i) => (
                <li key={s.name} className="card grid content-start gap-3 p-6">
                  <span className="grid size-7 place-items-center rounded-full bg-accent font-mono text-[12px] font-medium text-accent-ink">{i + 1}</span>
                  <strong className="t-h3">{s.name}</strong>
                  <p className="t-body">{s.desc}</p>
                </li>
              ))}
            </ol>
            <p className="t-small mt-6">One codebase for Linux, Android and the browser. Windows and macOS builds are next.</p>
          </div>
        </Reveal>
      </Section>

      <Section id="why">
        <Reveal>
          <SectionHead
            eyebrow="Why this instead of a frontier API"
            title="A gateway you run changes what you can promise."
            lede="Hosted frontier models are the right tool for many jobs. For long-running agents on your own data, you want to measure the cost and own the cache."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_INFERSTACK.map((w) => (
              <li key={w.name} className="card grid content-start gap-3 p-6">
                <h3 className="t-h3">{w.name}</h3>
                <p className="t-body">{w.desc}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="next">
        <Reveal>
          <SectionHead
            eyebrow="Next"
            title="Switch models without losing the session."
            lede="A model’s cache is computed from its own weights, and each model has its own tokenizer, chat template and tool format. So the next layer is a session log that no single model owns."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {SWITCH_STEPS.map((s, i) => (
              <li key={s.name} className="grid content-start gap-2 bg-surface p-5">
                <span className="grid size-7 place-items-center rounded-full bg-raise font-mono text-[12px] font-medium">{i + 1}</span>
                <strong className="t-h3">{s.name}</strong>
                <p className="t-body">{s.desc}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8"><Button href="/changelog" variant="ghost" arrow>Where we are</Button></div>
        </Reveal>
      </Section>

      <Closing />
    </Shell>
  );
}
