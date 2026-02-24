import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/">
          <Image 
            src="/logo-horizontal.svg" 
            alt="Greg Oehmen | Fractional Chief Product Officer" 
            width={400} 
            height={40}
            priority
          />
        </a>
        
        <nav className="hidden sm:flex items-center gap-6">
          <a href="#services" className="text-sm text-foreground-secondary hover:text-white transition-colors">
            Services
          </a>
          <a href="#about" className="text-sm text-foreground-secondary hover:text-white transition-colors">
            About
          </a>
          <a href="#book" className="text-sm text-accent-teal hover:opacity-80 transition-opacity font-semibold">
            Book a Call
          </a>
        </nav>
      </div>
    </header>
  );
}