import Faq from '@/components/Faq';
import PlanCards from '@/components/PlanCards';
import Reveal from '@/components/Reveal';
import Shell from '@/components/Shell';
import TrustGrid from '@/components/TrustGrid';
import { Button, Section, SectionHead } from '@/components/ui';
import Hero from '@/components/sections/home/Hero';
import HowItWorks from '@/components/sections/home/HowItWorks';
import SessionLayer from '@/components/sections/home/SessionLayer';
import Statement from '@/components/sections/home/Statement';
import { AgentCatalogue, Closing, FeatureBento, Metrics, Prototype, RunsOn, SoftwareTeaser } from '@/components/sections/home/blocks';
import { PRICING_FAQ } from '@/content/site';

export default function Home() {
  return (
    <Shell>
      <Hero />
      <RunsOn />
      <Statement />
      <Reveal><Metrics /></Reveal>
      <Reveal><FeatureBento /></Reveal>
      <HowItWorks />
      <Reveal><SessionLayer /></Reveal>
      <Reveal><Prototype /></Reveal>
      <Reveal><AgentCatalogue /></Reveal>
      <Reveal><SoftwareTeaser /></Reveal>
      <Reveal>
        <Section id="pricing">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Pricing" title="Pay for work that got done." lede="Example pricing while Lumenar is in pilot. Pilot terms are agreed with each team." />
            <Button href="/pricing" variant="ghost" arrow>Compare plans</Button>
          </div>
          <div className="mt-14"><PlanCards /></div>
        </Section>
      </Reveal>
      <Reveal>
        <Section id="trust">
          <SectionHead eyebrow="Trust" title="Every step on the record." className="mb-12" />
          <TrustGrid />
        </Section>
      </Reveal>
      <Reveal>
        <Section id="faq">
          <SectionHead eyebrow="Questions" title="Asked before a pilot." center className="mb-10" />
          <Faq items={PRICING_FAQ} />
        </Section>
      </Reveal>
      <Reveal><Closing /></Reveal>
    </Shell>
  );
}
