import { Linkedin, Github, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 sm:py-16 bg-background border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Brand */}
          <div>
            <a href="/" className="text-xl font-bold text-white hover:text-accent-teal transition-colors">
              Greg Oehmen
            </a>
            <p className="mt-2 text-sm text-foreground-secondary">
              Fractional CPO for early-stage startups
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-6 sm:gap-8">
            <a href="#services" className="text-sm text-foreground-secondary hover:text-white transition-colors">
              Services
            </a>
            <a href="#about" className="text-sm text-foreground-secondary hover:text-white transition-colors">
              About
            </a>
            <a href="#testimonials" className="text-sm text-foreground-secondary hover:text-white transition-colors">
              Testimonials
            </a>
            <a href="#book" className="text-sm text-foreground-secondary hover:text-white transition-colors">
              Book a Call
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/in/grego" target="_blank" rel="noopener noreferrer" className="p-2 text-foreground-secondary hover:text-white hover:bg-white/10 rounded-lg transition-all" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/goehmen" target="_blank" rel="noopener noreferrer" className="p-2 text-foreground-secondary hover:text-white hover:bg-white/10 rounded-lg transition-all" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://goehmen.dev" target="_blank" rel="noopener noreferrer" className="p-2 text-foreground-secondary hover:text-white hover:bg-white/10 rounded-lg transition-all" aria-label="Portfolio">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-white/5 text-center md:text-left">
          <p className="text-sm text-foreground-secondary">
            © {currentYear} Greg Oehmen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}