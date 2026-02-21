'use client';

import { useEffect } from 'react';

export default function BookCall() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section id="book" className="py-20 sm:py-24 bg-background-secondary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Let&apos;s Talk
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-foreground-secondary max-w-2xl mx-auto">
            Ready to turn your product vision into reality? Book a free discovery call to discuss your challenges and see if we&apos;re a good fit.
          </p>
        </div>

        {/* Calendly Embed */}
        <div
          className="calendly-inline-widget rounded-xl overflow-hidden"
          data-url="https://calendly.com/greg-oehmen-product-strategy?hide_gdpr_banner=1&background_color=1e293b&text_color=ffffff&primary_color=06b6d4"
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </section>
  );
}