import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/cafeConfig';
import { ResilientImage } from './ResilientImage';

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_ITEMS.length,
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const activePhoto = selectedIndex !== null ? GALLERY_ITEMS[selectedIndex] : null;

  return (
    <section id="gallery" className="border-b border-[#1C1917]/10 bg-[#FAF9F7] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-[#1B3B2B]">Gallery</p>
            <h2
              className="mt-2 font-display text-3xl font-medium tracking-tight text-[#1C1917] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Inside the courtyard, kitchen &amp; chai bar.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#57534E]">
            Click any photograph to view full frame across mobile, tablet, or desktop.
          </p>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {GALLERY_ITEMS.map((item, idx) => {
            const spanClass =
              idx === 0
                ? 'lg:col-span-7 aspect-[16/10]'
                : idx === 1
                  ? 'lg:col-span-5 aspect-[4/3] lg:aspect-[16/11]'
                  : 'lg:col-span-4 aspect-[4/3]';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`group relative overflow-hidden rounded-xl border border-[#1C1917]/10 bg-[#F1EFEA] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B] cursor-pointer ${spanClass}`}
              >
                <ResilientImage
                  src={item.src}
                  alt={item.alt}
                  title={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
                  <p className="font-display text-lg font-medium text-white">{item.title}</p>
                  <p className="mt-0.5 text-xs text-white/85">{item.caption}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Keyboard-accessible Lightbox Modal */}
      {activePhoto && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-[#1C1917] text-[#FAF9F7]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
              <div>
                <p className="font-display text-lg font-medium">{activePhoto.title}</p>
                <p className="text-xs text-white/70">{activePhoto.caption}</p>
              </div>
              <button
                type="button"
                aria-label="Close gallery viewer"
                onClick={() => setSelectedIndex(null)}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex max-h-[70vh] items-center justify-center bg-black">
              <ResilientImage
                src={activePhoto.src}
                alt={activePhoto.alt}
                title={activePhoto.title}
                loading="eager"
                className="max-h-[70vh] w-full object-contain"
              />

              <button
                type="button"
                aria-label="Previous photo"
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
                  )
                }
                className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/85 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label="Next photo"
                onClick={() =>
                  setSelectedIndex((selectedIndex + 1) % GALLERY_ITEMS.length)
                }
                className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/85 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
