export default function Hero() {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/55" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            You Raised the Round.
            <br />
            Now let&apos;s build the proof.
          </h1>
  
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
            Fractional CPO for early-stage startups. I partner with founders 
            to turn product vision into validated, engineering-ready roadmaps.
          </p>
  
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-accent-teal rounded-lg hover:opacity-90 transition-opacity">
              Book a Call
            </a>
            
            <a href="#services" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-accent-teal text-accent-teal rounded-lg hover:bg-accent-teal/10 transition-all">
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <a href="#services" className="flex flex-col items-center text-white/50 hover:text-white transition-colors">
          <span className="text-sm mb-2">Scroll Down</span>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>
    );
  }