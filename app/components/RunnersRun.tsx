import type { JSX } from 'react';
import Image from 'next/image';

export default function RunnersRun(): JSX.Element {
  return (
    <section id="runnersrun" className="py-20 sm:py-24 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-4">
            Case Study
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            RunnersRun
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-foreground-secondary max-w-2xl mx-auto">
            A production-grade SaaS I built solo{"\u2014"}from first commit to private
            beta{"\u2014"}using a disciplined AI-native workflow.
          </p>
        </div>

        {/* Dashboard Screenshot */}
        <div className="mb-16">
          <Image
            src="/runnersrun-dashboard.png"
            alt="RunnersRun dashboard showing cumulative mileage pace-line graph, stats summary, and monthly distance breakdown"
            width={2630}
            height={1420}
            className="w-full rounded-lg shadow-2xl"
          />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-foreground-secondary mb-12 text-center">
            Every runner with an annual mileage goal asks the same question:{" "}
            {"\u201C"}Am I on pace?{"\u201D"} RunnersRun answers it with a cumulative
            pace-line graph that shows actual miles against the trend line needed to hit
            the target. No comparable standalone product exists{"\u2014"}runners currently
            track this in spreadsheets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6">
              <p className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-3">
                Solo AI-Native Build
              </p>
              <p className="text-foreground-secondary">
                First commit March 2026. Built entirely solo using a structured,
                spec-driven development methodology{"\u2014"}sequential, isolated sessions
                where quality is driven by spec clarity, not AI capability.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6">
              <p className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-3">
                Production-Grade
              </p>
              <p className="text-foreground-secondary">
                Enterprise-standard architecture with auth, payments, background jobs,
                observability, and automated testing. This is not a demo{"\u2014"}it
                {"\u2019"}s a real product built to ship.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6">
              <p className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-3">
                Private Beta
              </p>
              <p className="text-foreground-secondary">
                Currently in private beta. 15 years of product judgment applied to every
                decision{"\u2014"}from architecture to user experience.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://runnersrun.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit RunnersRun (opens in new tab)"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-accent-teal rounded-lg hover:opacity-90 transition-opacity"
          >
            Visit RunnersRun
          </a>
        </div>
      </div>
    </section>
  );
}
