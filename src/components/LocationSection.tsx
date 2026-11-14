import { ExternalLink, MapPin } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeConfig';

export function LocationSection() {
  return (
    <section id="location" className="border-b border-[#1C1917]/10 bg-[#FAF9F7] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: Address, hours & contact */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-sm font-medium text-[#1B3B2B]">Location &amp; Hours</p>
              <h2
                className="mt-2 font-display text-3xl font-medium tracking-tight text-[#1C1917] sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                Visit us in Sri Sai Nagar, Simhachalam.
              </h2>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-[#57534E]">Address</h3>
                  <p className="mt-1.5 text-base font-medium text-[#1C1917]">
                    {CAFE_INFO.addressLine1}
                  </p>
                  <p className="text-base text-[#57534E]">{CAFE_INFO.addressLine2}</p>
                  <p className="mt-1 text-sm text-[#1B3B2B]">{CAFE_INFO.landmark}</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-[#57534E]">Opening Hours</h3>
                  <div className="mt-2 divide-y divide-[#1C1917]/10 border-t border-b border-[#1C1917]/10">
                    {CAFE_INFO.hours.map((row) => (
                      <div
                        key={row.days}
                        className="flex items-center justify-between gap-4 py-3 text-sm"
                      >
                        <span className="font-medium text-[#1C1917]">{row.days}</span>
                        <span className="font-mono text-[#57534E] tabular-nums">{row.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-semibold text-[#57534E]">Owner WhatsApp &amp; Phone</h3>
                    <p className="mt-1 font-mono text-sm font-medium text-[#1C1917] tabular-nums">
                      {CAFE_INFO.displayPhone}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#57534E]">Parking</h3>
                    <p className="mt-1 text-sm text-[#57534E]">{CAFE_INFO.parkingNote}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-2">
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1B3B2B] px-6 py-3 text-sm font-medium text-[#FAF9F7] transition-colors hover:bg-[#142D21]"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: Clean Neighborhood Wayfinding Card */}
          <div className="lg:col-span-6">
            <div className="flex h-full flex-col justify-between rounded-xl border border-[#1C1917]/10 bg-[#F1EFEA] p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-[#1C1917]/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-5 w-5 text-[#1B3B2B]" aria-hidden="true" />
                    <span className="font-display text-lg font-medium text-[#1C1917]">
                      Wayfinding Guide
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#57534E]">
                    Simhachalam · Visakhapatnam
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-lg border border-[#1C1917]/8 bg-[#FAF9F7] p-4">
                    <p className="text-xs font-medium text-[#1B3B2B]">Old Adavivaram &amp; Sri Sai Nagar</p>
                    <p className="mt-1 text-sm text-[#1C1917]">
                      Located at 3-208, Old Adavivaram, Sri Sai Nagar—conveniently accessible from
                      Simhachalam Road and Adavivaram main junction.
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#1C1917]/8 bg-[#FAF9F7] p-4">
                    <p className="text-xs font-medium text-[#1B3B2B]">From Simhachalam Temple Foothills</p>
                    <p className="mt-1 text-sm text-[#1C1917]">
                      A short drive toward Adavivaram &amp; Sri Sai Nagar with easy drop-off and
                      courtyard entry.
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#1C1917]/8 bg-[#FAF9F7] p-4">
                    <p className="text-xs font-medium text-[#1B3B2B]">Accessibility &amp; Seating</p>
                    <p className="mt-1 text-sm text-[#1C1917]">
                      Step-free courtyard entry, filtered drinking water refill station, and high-speed
                      guest Wi-Fi for remote work.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 border-t border-[#1C1917]/10 pt-4 text-xs text-[#57534E]">
                Direct inquiries: {CAFE_INFO.email} · {CAFE_INFO.displayPhone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
