import { HERO_MEDIA } from '../data/cafeConfig';
import { ResilientImage } from './ResilientImage';

const AMBIANCE_CHAPTERS = [
  {
    index: '01.',
    title: 'Courtyard & Jasmine Pergola',
    detail:
      'Set back from the street behind pale sandstone arches, shaded by neem foliage, climbing white jasmine, and earthenware tulsi planters.',
  },
  {
    index: '02.',
    title: 'Brass-Kettle Chai & Slow Coffee',
    detail:
      'Every kettle of masala chai is crushed and simmered to order with green cardamom, fresh ginger, and courtyard tulsi alongside single-estate V60 filter brews.',
  },
  {
    index: '03.',
    title: 'Pure Vegetarian Kitchen',
    detail:
      'Stone-baked sourdough flatbreads, wholesome grain bowls, and eggless bakes prepared fresh daily with Sattvic-friendly customization on request.',
  },
];

export function AmbianceSection() {
  return (
    <section id="ambiance" className="border-b border-[#1C1917]/10 bg-[#F1EFEA]/65 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: Ambiance photography */}
          <div className="lg:col-span-5">
            <div className="h-72 overflow-hidden rounded-xl border border-[#1C1917]/10 bg-[#FAF9F7] sm:h-96 lg:h-full">
              <ResilientImage
                src={HERO_MEDIA.ambianceSrc}
                alt={HERO_MEDIA.ambianceAlt}
                title="Brass Kettle Masala Chai"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right: Editorial story + numbered details */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-sm font-medium text-[#1B3B2B]">Ambiance &amp; Craft</p>
            <h2
              className="mt-2 font-display text-3xl font-medium tracking-tight text-[#1C1917] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              A quiet courtyard shaped by stone, tulsi, and unhurried mornings.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#57534E]">
              Designed as a calm refuge for travelers, locals, and families alike, Vrindavan Cafe
              pairs traditional courtyard architecture with warm teakwood seating, natural daylight,
              and comforting aromas from the chai bar.
            </p>

            <div className="mt-8 divide-y divide-[#1C1917]/10 border-t border-b border-[#1C1917]/10">
              {AMBIANCE_CHAPTERS.map((chapter) => (
                <div key={chapter.index} className="py-5">
                  <h3 className="text-base font-semibold text-[#1C1917]">
                    <span className="mr-2 font-mono text-sm font-medium text-[#1B3B2B]">
                      {chapter.index}
                    </span>
                    {chapter.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#57534E]">{chapter.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
