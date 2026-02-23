import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <a href="/">
          <Image 
            src="/logo-horizontal.svg" 
            alt="Greg Oehmen | Fractional Chief Product Officer" 
            width={400} 
            height={40}
            priority
          />
        </a>
      </div>
    </header>
  );
}