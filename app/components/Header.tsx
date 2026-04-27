'use client';

import { useState, useEffect, type JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const anchorLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Book a Call', href: '#book' },
];

const navLinkClass =
  'text-sm text-foreground-secondary hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export default function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-horizontal.svg"
            alt="Greg Oehmen | Fractional CPO & AI-Native Product Coach"
            width={400}
            height={40}
            priority
            className="h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-8">
          {anchorLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={navLinkClass}
            >
              {label}
            </a>
          ))}
          <Link
            href="/blog"
            className={navLinkClass}
          >
            Blog
          </Link>
          <a
            href="https://goehmen.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
          >
            Portfolio
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden p-2 text-foreground-secondary hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden max-w-6xl mx-auto mt-4 pt-4 border-t border-white/10 flex flex-col gap-4">
          {anchorLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className={navLinkClass}
            >
              {label}
            </a>
          ))}
          <Link
            href="/blog"
            onClick={closeMenu}
            className={navLinkClass}
          >
            Blog
          </Link>
          <a
            href="https://goehmen.dev"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className={navLinkClass}
          >
            Portfolio
          </a>
        </nav>
      )}
    </header>
  );
}
