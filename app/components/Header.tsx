'use client';

import { useState, useEffect, useRef, type JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ExternalLink } from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  external?: true;
  ariaLabel?: string;
};

// Issue #6: unified nav array eliminates desktop/mobile duplication
// Issue #2: anchor links use absolute /#fragment hrefs (work from any page)
// Issue #5: Portfolio has aria-label flagging new-tab behavior
const navItems: NavItem[] = [
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Book a Call', href: '/#book' },
  { label: 'Blog', href: '/blog' },
  {
    label: 'Portfolio',
    href: 'https://goehmen.dev',
    external: true,
    ariaLabel: 'Portfolio (opens in new tab)',
  },
];

const navLinkClass =
  'text-sm text-foreground-secondary hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

function NavLink({ item, onClick }: { item: NavItem; onClick?: () => void }): JSX.Element {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.ariaLabel}
        className={navLinkClass}
        onClick={onClick}
      >
        {item.label}
        <ExternalLink className="inline w-3 h-3 ml-1" aria-hidden="true" />
      </a>
    );
  }
  // Internal Next.js page (e.g. /blog) — use client-side navigation
  if (!item.href.includes('#')) {
    return (
      <Link href={item.href} className={navLinkClass} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  // Anchor/fragment links — plain <a> for reliable browser scroll behavior
  return (
    <a href={item.href} className={navLinkClass} onClick={onClick}>
      {item.label}
    </a>
  );
}

export default function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const closeMenu = () => setIsOpen(false);

  // Close menu when viewport reaches lg breakpoint
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Issue #4: outside-click and scroll dismiss
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => setIsOpen(false);

    document.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  // Issue #3: focus trap while mobile menu is open
  useEffect(() => {
    if (!isOpen) return;

    const nav = mobileNavRef.current;
    if (!nav) return;

    const focusable = nav.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    first?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm"
    >
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
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
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
        <nav
          ref={mobileNavRef}
          id="mobile-nav"
          aria-label="Mobile"
          className="lg:hidden max-w-6xl mx-auto mt-4 pt-4 border-t border-white/10 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} onClick={closeMenu} />
          ))}
        </nav>
      )}
    </header>
  );
}
