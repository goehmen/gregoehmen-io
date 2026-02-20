'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Greg helped us cut through the noise and find our North Star metric. Within 6 weeks, we went from 'building features' to 'proving PMF.'",
    author: "Sarah Chen",
    role: "CEO & Co-founder",
    company: "Stealth AI Startup",
  },
  {
    quote: "Most advisors give you frameworks. Greg gave us a roadmap our engineers could actually build. Game changer for our Series A prep.",
    author: "Marcus Johnson",
    role: "Technical Co-founder",
    company: "FinTech Startup",
  },
  {
    quote: "We were drowning in feature requests. Greg helped us ruthlessly prioritize and ship an MVP that actually validated our hypothesis.",
    author: "Emily Rodriguez",
    role: "Head of Product",
    company: "B2B SaaS Company",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
          What Founders Say
        </h2>

        <div className="relative">
          {/* Previous Arrow */}
          <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-8 p-2 text-white/40 hover:text-white transition-colors z-10" aria-label="Previous testimonial">
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-8 sm:px-12">
                  <div className="text-center">
                    <div className="text-6xl text-accent-teal/20 font-serif leading-none mb-4">&ldquo;</div>
                    <blockquote className="text-xl md:text-2xl leading-relaxed mb-8">{testimonial.quote}</blockquote>
                    <cite className="not-italic block">
                      <span className="text-lg font-semibold">{testimonial.author}</span>
                      <span className="block text-foreground-secondary mt-1">{testimonial.role}, {testimonial.company}</span>
                    </cite>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow */}
          <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-8 p-2 text-white/40 hover:text-white transition-colors z-10" aria-label="Next testimonial">
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button key={index} onClick={() => scrollTo(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-accent-teal w-8' : 'bg-white/30 hover:bg-white/50'}`} aria-label={`Go to testimonial ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}