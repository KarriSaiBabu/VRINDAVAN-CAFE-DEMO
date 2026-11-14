import { useMemo, useState } from 'react';
import { Minus, Plus, Search } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuCategory,
} from '../data/cafeConfig';
import { formatInr, type OrderPricingSummary } from '../utils/security';
import { OrderPanel } from './OrderPanel';

interface MenuSectionProps {
  cart: Record<string, number>;
  summary: OrderPricingSummary;
  fulfillment: 'delivery' | 'pickup';
  onFulfillmentChange: (next: 'delivery' | 'pickup') => void;
  onUpdateQuantity: (itemId: string, nextQty: number) => void;
  onClearCart: () => void;
  onOpenMobileDrawer: () => void;
  onNavigate: (path: string) => void;
}

export function MenuSection({
  cart,
  summary,
  fulfillment,
  onFulfillmentChange,
  onUpdateQuantity,
  onClearCart,
  onOpenMobileDrawer,
  onNavigate,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.dietaryNote.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="border-b border-[#1C1917]/10 bg-[#FAF9F7] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-[#1C1917]/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-[#1B3B2B]">Menu &amp; Direct Ordering</p>
            <h2
              className="mt-2 font-display text-3xl font-medium tracking-tight text-[#1C1917] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Select dishes &amp; send your order straight to our kitchen.
            </h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#57534E]"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Search menu items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chai, flatbread, vegan..."
              className="min-h-[44px] w-full rounded-lg border border-[#1C1917]/15 bg-white pr-4 pl-10 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#1B3B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/25"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`min-h-[40px] rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#1B3B2B] text-[#FAF9F7]'
                    : 'bg-[#F1EFEA] text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Mobile/Tablet Quick Order Banner (hidden on lg where sticky panel is visible) */}
        {summary.totalCount > 0 && (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-[#1B3B2B]/20 bg-[#F1EFEA] px-4 py-3 lg:hidden">
            <div>
              <p className="text-sm font-semibold text-[#1C1917] tabular-nums">
                {summary.totalCount} {summary.totalCount === 1 ? 'item' : 'items'} selected ·{' '}
                {formatInr(summary.subtotalInr)}
              </p>
              <p className="text-xs text-[#57534E]">Complete delivery address &amp; send on WhatsApp</p>
            </div>
            <button
              type="button"
              onClick={onOpenMobileDrawer}
              className="min-h-[40px] rounded-lg bg-[#1B3B2B] px-4 py-2 text-xs font-medium text-[#FAF9F7] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Checkout
            </button>
          </div>
        )}

        {/* Main 2-column split: Menu grid left, Sticky Order Panel right */}
        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {filteredItems.length === 0 ? (
              <div className="rounded-xl border border-[#1C1917]/10 bg-[#F1EFEA]/60 p-10 text-center">
                <p className="text-base font-medium text-[#1C1917]">No dishes match that search.</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-sm font-medium text-[#1B3B2B] underline underline-offset-4 cursor-pointer"
                >
                  Show all menu items
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filteredItems.map((item) => {
                  const qty = cart[item.id] ?? 0;
                  return (
                    <article
                      key={item.id}
                      className="flex flex-col justify-between rounded-xl border border-[#1C1917]/10 bg-white p-5 transition-transform duration-150 hover:-translate-y-0.5"
                    >
                      <div>
                        <p className="text-xs font-medium text-[#57534E]">
                          {item.category}
                          <span aria-hidden="true"> · </span>
                          {item.dietaryNote}
                        </p>

                        <div className="mt-2 flex items-baseline justify-between gap-3">
                          <h3 className="text-base font-semibold text-[#1C1917]">{item.name}</h3>
                          <span className="font-mono text-sm font-semibold text-[#1C1917] whitespace-nowrap shrink-0 tabular-nums">
                            {formatInr(item.priceInr)}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#1C1917]/8 pt-4">
                        <span className="text-xs font-medium text-[#1B3B2B]">
                          {item.isHouseFavorite ? 'House Favorite' : 'Prepared Fresh'}
                        </span>

                        {qty === 0 ? (
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#1B3B2B] bg-[#FAF9F7] px-4 py-2 text-xs font-semibold text-[#1B3B2B] whitespace-nowrap transition-colors hover:bg-[#1B3B2B] hover:text-[#FAF9F7] cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Add</span>
                          </button>
                        ) : (
                          <div className="inline-flex items-center rounded-lg border border-[#1B3B2B] bg-[#1B3B2B] text-[#FAF9F7]">
                            <button
                              type="button"
                              aria-label={`Remove one ${item.name}`}
                              onClick={() => onUpdateQuantity(item.id, qty - 1)}
                              className="flex h-10 w-10 items-center justify-center rounded-l-lg transition-colors hover:bg-[#142D21] cursor-pointer"
                            >
                              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                            <span className="w-7 text-center font-mono text-xs font-semibold tabular-nums">
                              {qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Add one more ${item.name}`}
                              onClick={() => onUpdateQuantity(item.id, qty + 1)}
                              className="flex h-10 w-10 items-center justify-center rounded-r-lg transition-colors hover:bg-[#142D21] cursor-pointer"
                            >
                              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop sticky Order & Checkout Panel */}
          <aside className="hidden lg:sticky lg:top-22 lg:col-span-5 lg:block">
            <OrderPanel
              summary={summary}
              fulfillment={fulfillment}
              onFulfillmentChange={onFulfillmentChange}
              onUpdateQuantity={onUpdateQuantity}
              onClearCart={onClearCart}
              onNavigate={onNavigate}
              idPrefix="desktop"
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
