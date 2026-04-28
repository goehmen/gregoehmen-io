import type { JSX } from 'react';
import ServiceCard from './ServiceCard';
import { Compass, Search, Target, Rocket, Lightbulb, Scissors, Map, Blocks, Wrench, ShieldCheck } from 'lucide-react';

const coachingServices = [
  {
    title: "Methodology Foundations",
    description: "Spec-first workflow, the right architecture decisions, and the enterprise-grade patterns that make your work credible in a corporate setting. Time-boxed. Outcome-defined.",
    icon: <Blocks className="w-6 h-6" />,
  },
  {
    title: "Guided Project Build",
    description: "Apply the methodology to a real project with hands-on coaching. Build something you\u2019ll actually ship\u2014not a toy\u2014with Greg reviewing every stage.",
    icon: <Wrench className="w-6 h-6" />,
  },
  {
    title: "Enterprise Readiness",
    description: "Take your AI-built product from \u2018it works\u2019 to \u2018it belongs in production.\u2019 Architecture review, security considerations, and the patterns that meet corporate-grade standards.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
];

const strategyServices = [
  {
    title: "North Star Alignment",
    description: "Define the one metric that matters. I\u2019ll help you cut through vanity metrics to identify the outcome that proves product-market fit\u2014then align your roadmap, team, and investors around it.",
    icon: <Compass className="w-6 h-6" />,
  },
  {
    title: "Problem Validation",
    description: "Before you build, know you\u2019re solving a real problem worth solving. I lead rapid customer discovery sprints that separate signal from noise and de-risk your biggest assumptions.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    title: "Persona & Positioning",
    description: "Nail who you\u2019re for and why they should care. I\u2019ll help you define your ideal customer profile, craft positioning that resonates, and build messaging that converts.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: "GTM & Pricing Strategy",
    description: "Strategy without execution is hallucination. I design go-to-market plans with clear segments, pricing that captures value, and launch sequences that create momentum.",
    icon: <Rocket className="w-6 h-6" />,
  },
];

const executionServices = [
  {
    title: "Prototype & Concept Testing",
    description: "Test ideas before you invest engineering cycles. I\u2019ll help you design and run rapid experiments\u2014from low-fidelity mockups to clickable prototypes\u2014that validate demand fast.",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    title: "MVP Scoping & Prioritization",
    description: "Ship the smallest thing that proves the biggest hypothesis. I bring ruthless prioritization frameworks honed at Visa, Pivotal, and Salesforce to cut scope without cutting corners.",
    icon: <Scissors className="w-6 h-6" />,
  },
  {
    title: "Engineering-Ready Roadmap",
    description: "Bridge the gap between strategy and sprint. I deliver roadmaps your engineers can actually build from\u2014with clear requirements, sequencing rationale, and success metrics baked in.",
    icon: <Map className="w-6 h-6" />,
  },
];

export default function Services(): JSX.Element {
  return (
    <section id="services">

      {/* Track 1: AI-Native Building Coaching/Advisory */}
      <div className="py-20 sm:py-24 bg-background-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-4">
              AI-Native Building
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Learn to Build With AI. Ship Something Real.
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-foreground-secondary max-w-2xl mx-auto">
              Structured coaching and advisory for tech professionals who want to build AI-native products{'\u2014'}and bring enterprise-grade skills back to work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coachingServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="#book" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-accent-teal rounded-lg hover:opacity-90 transition-opacity">
              Book a Discovery Call
            </a>
          </div>
        </div>
      </div>

      {/* Track 2: Fractional CPO */}
      <div className="py-20 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-4">
              Fractional CPO
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Fractional CPO for Early-Stage Startups
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-foreground-secondary max-w-2xl mx-auto">
              Embedded strategic product leadership for post-seed startups. I partner with founders to build validated roadmaps and ship.
            </p>
          </div>

          {/* Product Strategy */}
          <div className="mb-16">
            <h3 className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-8 text-center">
              Product Strategy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {strategyServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              ))}
            </div>
          </div>

          {/* Product Execution */}
          <div>
            <h3 className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-8 text-center">
              Product Execution
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {executionServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="#book" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-accent-teal rounded-lg hover:opacity-90 transition-opacity">
              Book a Discovery Call
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
