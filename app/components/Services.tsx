import ServiceCard from './ServiceCard';
import { Compass, Search, Target, Rocket, Lightbulb, Scissors, Map } from 'lucide-react';

const strategyServices = [
  {
    title: "North Star Alignment",
    description: "Define the one metric that matters. I'll help you cut through vanity metrics to identify the outcome that proves product-market fit—then align your roadmap, team, and investors around it.",
    icon: <Compass className="w-6 h-6" />,
  },
  {
    title: "Problem Validation",
    description: "Before you build, know you're solving a real problem worth solving. I lead rapid customer discovery sprints that separate signal from noise and de-risk your biggest assumptions.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    title: "Persona & Positioning",
    description: "Nail who you're for and why they should care. I'll help you define your ideal customer profile, craft positioning that resonates, and build messaging that converts.",
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
    description: "Test ideas before you invest engineering cycles. I'll help you design and run rapid experiments—from low-fidelity mockups to clickable prototypes—that validate demand fast.",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    title: "MVP Scoping & Prioritization",
    description: "Ship the smallest thing that proves the biggest hypothesis. I bring ruthless prioritization frameworks honed at Visa, Pivotal, and Salesforce to cut scope without cutting corners.",
    icon: <Scissors className="w-6 h-6" />,
  },
  {
    title: "Engineering-Ready Roadmap",
    description: "Bridge the gap between strategy and sprint. I deliver roadmaps your engineers can actually build from—with clear requirements, sequencing rationale, and success metrics baked in.",
    icon: <Map className="w-6 h-6" />,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            How I Help
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-foreground-secondary max-w-2xl mx-auto">
            From strategy to shipped product. I partner with founders to turn 
            vision into validated, engineering-ready roadmaps.
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
          <h3 className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-8 text-center">
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
      </div>
    </section>
  );
}