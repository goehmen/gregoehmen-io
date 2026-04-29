import type { JSX } from 'react';

export default function About(): JSX.Element {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 sm:py-24 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold">
            About
          </h2>
        </div>

        {/* Stacked columns */}
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Who You Are */}
          <div>
            <p className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-4">
              Who You Are
            </p>
            <p className="text-lg sm:text-xl leading-relaxed mb-6">
              You&apos;re a founder who has raised the round — or is close to it — and product decisions are getting more complex and more consequential. You need seasoned product leadership, but not yet a full-time CPO.
            </p>
            <p className="text-foreground-secondary leading-relaxed mb-4">
              Or you&apos;re a senior product leader who understands that the tools for building software have fundamentally changed, and you want to learn to use them the way they were meant to be used — not to generate code, but to apply product judgment at the execution layer.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              Either way, you need a partner who has operated at both ends of the spectrum: enterprise scale and zero-to-one execution.
            </p>
          </div>

          {/* Who I Am */}
          <div>
            <p className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-4">
              Who I Am
            </p>
            <p className="text-lg sm:text-xl leading-relaxed mb-6">
              I&apos;m Greg Oehmen — a product executive with 15+ years scaling platforms at Visa, Pivotal/VMware, and Salesforce, and most recently the solo founder of RunnersRun, a consumer SaaS application I designed, engineered, and shipped from zero to production using a modern full-stack and a structured AI-assisted development workflow I designed specifically for solo execution.
            </p>
            <p className="text-foreground-secondary leading-relaxed mb-4">
              At Visa, I scaled the Digital Wallet Platform to 200+ issuing banks, 54M+ enrolled cards, and 4B+ annual transactions — achieving more than 10x revenue growth over four years. At Pivotal, I owned the Cloud Foundry strategic roadmap across a 75-person PM team during growth from $0 to $400M ARR. These are not credentials I reference lightly — they are the foundation of the product judgment I bring to every engagement.
            </p>
            <p className="text-foreground-secondary leading-relaxed mb-4">
              RunnersRun is the proof that the judgment still works at the execution layer. I built it because the product didn&apos;t exist, using the same discipline — API-first architecture, forward-compatibility design, structured validation workflows — that I applied at enterprise scale. The difference is I did it alone, in months, using AI tools I orchestrated rather than tools that orchestrated me.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              That experience is now a service. I work with a small number of founders as a Fractional CPO — turning product vision into validated, engineering-ready roadmaps — and with senior product leaders who want to learn to build with AI tools the right way: structured, disciplined, and grounded in real product thinking rather than vibe coding.
            </p>
          </div>
        </div>

        {/* My Approach */}
        <div className="mt-16 pt-16 border-t border-white/10 max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-8 text-center">
            My Approach
          </p>
          <div className="space-y-6">
            <p><strong>Customer-Centric</strong> Every decision informed by real user needs and data-backed insights — not by what&apos;s technically interesting or competitively reactive.</p>
            <p><strong>Strategic &amp; Pragmatic</strong> A clear roadmap and focused execution. Not bloated feature lists, not premature optimization. The smallest thing that proves the biggest hypothesis.</p>
            <p><strong>Collaborative</strong> Product strategy is a shared vision built with founders and teams. I work alongside you, not above you.</p>
            <p><strong>Execution-Focused</strong> Strategy without execution is hallucination. I ensure teams ship — and I&apos;ve proven I can ship alone when that&apos;s what the moment requires.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
