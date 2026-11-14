import { ArrowRight } from 'lucide-react';
import { CAFE_INFO, HERO_MEDIA } from '../data/cafeConfig';
import { ResilientImage } from './ResilientImage';

export function Hero() {
  return (
    <section id="top" className="border-b border-[#1C1917]/10 bg-[#FAF9F7]">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16 lg:pb-14">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial proposition */}
          <div className="flex flex-col justify-between lg:col-span-6 lg:py-4">
            <div className="space-y-6">
              <p className="text-sm font-medium text-[#1B3B2B]">
                {CAFE_INFO.addressLine1} · {CAFE_INFO.addressLine2}
              </p>

              <h1
                className="font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.08] font-medium tracking-tight text-[#1C1917]"
                style={{ textWrap: 'balance' }}
              >
                Slow-brewed chai and courtyard plates in Simhachalam.
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-[#57534E] sm:text-lg">
                Step inside a quiet limestone courtyard surrounded by potted tulsi and climbing
                jasmine. Enjoy brass-kettle masala chai, estate pour-over coffee, and fresh
                vegetarian plates—ordered or reserved directly with our kitchen on WhatsApp.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#menu"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1B3B2B] px-6 py-3 text-sm font-medium text-[#FAF9F7] whitespace-nowrap transition-colors duration-150 hover:bg-[#142D21] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
                >
                  <span>Browse Menu &amp; Order</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href="#reserve"
                  className="inline-flex min-h-[44px] items-center rounded-lg border border-[#1C1917]/15 bg-[#FAF9F7] px-6 py-3 text-sm font-medium text-[#1C1917] whitespace-nowrap transition-colors duration-150 hover:bg-[#F1EFEA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
                >
                  Reserve a Table
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Dominant 16:9 focal courtyard visual */}
          <div className="lg:col-span-6">
            <div className="relative h-64 overflow-hidden rounded-xl border border-[#1C1917]/10 bg-[#F1EFEA] sm:h-80 lg:h-full lg:min-h-[440px]">
              <ResilientImage
                src={HERO_MEDIA.src}
                alt={HERO_MEDIA.alt}
                title="Vrindavan Cafe Courtyard"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column info strip below hero split */}
        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[#1C1917]/10 pt-8 sm:grid-cols-4">
          <div>
            <p className="text-xs font-medium text-[#57534E]">Daily Hours</p>
            <p className="mt-1 text-sm font-semibold text-[#1C1917] tabular-nums">
              7:30 AM – 10:00 PM
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#57534E]">Kitchen Philosophy</p>
            <p className="mt-1 text-sm font-semibold text-[#1C1917]">100% Pure Vegetarian</p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#57534E]">Seating Zones</p>
            <p className="mt-1 text-sm font-semibold text-[#1C1917]">Garden &amp; Indoor</p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#57534E]">Direct Hospitality</p>
            <p className="mt-1 text-sm font-semibold text-[#1C1917]">WhatsApp Order &amp; Booking</p>
          </div>
        </div>
      </div>
    </section>
  );
}
