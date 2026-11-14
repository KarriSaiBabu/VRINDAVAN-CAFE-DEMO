import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeConfig';

interface NavbarProps {
  cartCount: number;
  onOpenOrderDrawer: () => void;
  onNavigate: (path: string) => void;
}

const NAV_LINKS = [
  { label: 'Menu', href: '/#menu' },
  { label: 'Ambiance', href: '/#ambiance' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Reserve', href: '/#reserve' },
  { label: 'Location', href: '/#location' },
];

export function Navbar({ cartCount, onOpenOrderDrawer, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#1C1917]/10 bg-[#FAF9F7]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="font-display text-xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B3B2B]"
        >
          {CAFE_INFO.name}
        </a>

        {/* Zone 2: 5 concise single-line text links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.href);
              }}
              className="py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#1C1917] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B3B2B]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (+ mobile menu toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenOrderDrawer}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#1B3B2B] px-4 py-2 text-sm font-medium text-[#FAF9F7] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#142D21] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B] cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span className="tabular-nums">
              {cartCount > 0 ? `Order (${cartCount})` : 'Order Food'}
            </span>
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#1C1917]/12 text-[#1C1917] transition-colors hover:bg-[#F1EFEA] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive mobile drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#1C1917]/10 bg-[#FAF9F7] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col divide-y divide-[#1C1917]/8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  onNavigate(link.href);
                }}
                className="flex min-h-[44px] items-center text-base font-medium text-[#1C1917] transition-colors hover:text-[#1B3B2B]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
