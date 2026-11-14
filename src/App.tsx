/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AmbianceSection } from './components/AmbianceSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Hero } from './components/Hero';
import { LegalPage, type LegalRoute } from './components/LegalPages';
import { LocationSection } from './components/LocationSection';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { OrderDrawer } from './components/OrderDrawer';
import { ReservationSection } from './components/ReservationSection';
import { MENU_ITEMS } from './data/cafeConfig';
import { calculateVerifiedOrder, INPUT_LIMITS } from './utils/security';

const VALID_ITEM_IDS = new Set(MENU_ITEMS.map((item) => item.id));

function resolveRouteFromLocation(): LegalRoute | null {
  const base = import.meta.env.BASE_URL || '/';
  let path = window.location.pathname;
  if (base !== '/' && path.startsWith(base)) {
    path = '/' + path.slice(base.length);
  }
  const normalized = path.replace(/\/+$/, '') || '/';
  if (normalized === '/privacy-policy') return 'privacy';
  if (normalized === '/terms') return 'terms';
  return null;
}

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [legalRoute, setLegalRoute] = useState<LegalRoute | null>(
    resolveRouteFromLocation,
  );

  useEffect(() => {
    const handlePopState = () => {
      setLegalRoute(resolveRouteFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((target: string) => {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
    const [rawPath, hashPart] = target.split('#');
    const cleanPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
    const fullUrl = `${base}${cleanPath === '/' ? '/' : cleanPath}${hashPart ? `#${hashPart}` : ''}`;

    window.history.pushState(null, '', fullUrl);

    if (cleanPath === '/privacy-policy') {
      setLegalRoute('privacy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (cleanPath === '/terms') {
      setLegalRoute('terms');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLegalRoute(null);
    if (hashPart) {
      window.requestAnimationFrame(() => {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleUpdateQuantity = (itemId: string, nextQty: number) => {
    if (!VALID_ITEM_IDS.has(itemId)) return;
    const safeQty = Math.floor(nextQty);
    setCart((prev) => {
      const updated = { ...prev };
      if (!Number.isFinite(safeQty) || safeQty <= 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = Math.min(safeQty, INPUT_LIMITS.maxItemQuantity);
      }
      return updated;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const orderSummary = useMemo(
    () => calculateVerifiedOrder(cart, fulfillment),
    [cart, fulfillment],
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF9F7] text-[#1C1917]">
      <Navbar
        cartCount={orderSummary.totalCount}
        onOpenOrderDrawer={() => setDrawerOpen(true)}
        onNavigate={handleNavigate}
      />

      <main>
        {legalRoute ? (
          <LegalPage route={legalRoute} onNavigate={handleNavigate} />
        ) : (
          <>
            <Hero />
            <MenuSection
              cart={cart}
              summary={orderSummary}
              fulfillment={fulfillment}
              onFulfillmentChange={setFulfillment}
              onUpdateQuantity={handleUpdateQuantity}
              onClearCart={handleClearCart}
              onOpenMobileDrawer={() => setDrawerOpen(true)}
              onNavigate={handleNavigate}
            />
            <AmbianceSection />
            <GallerySection />
            <ReservationSection onNavigate={handleNavigate} />
            <LocationSection />
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <OrderDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        summary={orderSummary}
        fulfillment={fulfillment}
        onFulfillmentChange={setFulfillment}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
