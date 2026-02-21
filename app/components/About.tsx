export default function About() {
    return (
      <section id="about" className="py-20 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              About
            </h2>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Who You Are (the founder) */}
            <div>
              <h3 className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-4">
                Who You Are
              </h3>
              <p className="text-lg sm:text-xl leading-relaxed mb-6">
                You&apos;re a recently funded founder navigating the critical transition from idea to execution.
              </p>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                Your product decisions are getting more complex—and more critical—but you&apos;re not yet ready for a full-time CPO. At the same time, demands on your time are multiplying. You simply can&apos;t go deep on product while running everything else.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                That&apos;s where I come in. I bring seasoned product leadership exactly when it matters most—turning vision into strategy, and strategy into traction—so you can accelerate growth with confidence and focus.
              </p>
            </div>
  
            {/* Right: Who I Am */}
            <div>
              <h3 className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-4">
                Who I Am
              </h3>
              <p className="text-lg sm:text-xl leading-relaxed mb-6">
                I&apos;m Greg Oehmen, a product leader with 12+ years scaling platforms at Visa, Pivotal, Salesforce, and Apple.
              </p>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                I&apos;ve led teams from Series A through IPO, built products handling billions of API calls, and designed monetization strategies that drove 12x+ revenue growth. My expertise spans API platforms, B2B SaaS, GTM strategy, and pricing.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                I specialize in helping funded founders bridge the gap between vision and execution—building products that are scalable, investable, and market-ready.
              </p>
            </div>
          </div>
  
          {/* Bottom: My Approach */}
          <div className="mt-16 pt-16 border-t border-white/10">
            <h3 className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-8 text-center">
              My Approach
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h4 className="font-semibold mb-2">Customer-Centric</h4>
                <p className="text-sm text-foreground-secondary">Every decision informed by real user needs and data-backed insights.</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Strategic & Pragmatic</h4>
                <p className="text-sm text-foreground-secondary">Clear roadmap and focused execution—not bloated feature lists.</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Collaborative</h4>
                <p className="text-sm text-foreground-secondary">Product strategy is a shared vision built with founders and teams.</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Execution-Focused</h4>
                <p className="text-sm text-foreground-secondary">Strategy without execution is useless. I ensure teams ship.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }