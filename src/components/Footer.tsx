import { CAFE_INFO } from '../data/cafeConfig';

export function Footer() {
  return (
    <footer className="bg-[#FAF9F7] py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-[#1C1917]">{CAFE_INFO.name}</p>
          <p className="mt-1 text-xs text-[#57534E]">
            {CAFE_INFO.addressLine1} · {CAFE_INFO.addressLine2}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#57534E]">
          <a href="#menu" className="hover:text-[#1C1917]">
            Menu
          </a>
          <a href="#ambiance" className="hover:text-[#1C1917]">
            Ambiance
          </a>
          <a href="#gallery" className="hover:text-[#1C1917]">
            Gallery
          </a>
          <a href="#reserve" className="hover:text-[#1C1917]">
            Reserve
          </a>
          <a href="#location" className="hover:text-[#1C1917]">
            Location
          </a>
        </nav>

        <p className="text-xs text-[#57534E] tabular-nums">
          Developed by Sai Babu Karri · Contact:{' '}
          <a href="tel:9374567746" className="hover:text-[#1C1917] underline underline-offset-2">
            9374567746
          </a>{' '}
          · Email:{' '}
          <a
            href="mailto:saibabukarri25@gmail.com"
            className="hover:text-[#1C1917] underline underline-offset-2"
          >
            saibabukarri25@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
