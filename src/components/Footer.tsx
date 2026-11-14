import { CAFE_INFO } from '../data/cafeConfig';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLegalClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#FAF9F7] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-[#1C1917]">{CAFE_INFO.name}</p>
            <p className="mt-1 text-xs text-[#57534E]">
              {CAFE_INFO.addressLine1} · {CAFE_INFO.addressLine2}
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#57534E]"
          >
            <a
              href="/#menu"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/#menu');
              }}
              className="hover:text-[#1C1917]"
            >
              Menu
            </a>
            <a
              href="/#ambiance"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/#ambiance');
              }}
              className="hover:text-[#1C1917]"
            >
              Ambiance
            </a>
            <a
              href="/#gallery"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/#gallery');
              }}
              className="hover:text-[#1C1917]"
            >
              Gallery
            </a>
            <a
              href="/#reserve"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/#reserve');
              }}
              className="hover:text-[#1C1917]"
            >
              Reserve
            </a>
            <a
              href="/#location"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/#location');
              }}
              className="hover:text-[#1C1917]"
            >
              Location
            </a>
            <a
              href="/privacy-policy"
              onClick={(e) => handleLegalClick(e, '/privacy-policy')}
              className="hover:text-[#1C1917]"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => handleLegalClick(e, '/terms')}
              className="hover:text-[#1C1917]"
            >
              Terms &amp; FSSAI
            </a>
          </nav>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-[#1C1917]/10 pt-6 text-xs text-[#57534E] sm:flex-row sm:items-center">
          <p className="max-w-xl leading-relaxed">
            © 2026 {CAFE_INFO.name} · {CAFE_INFO.fssaiNumber} · {CAFE_INFO.demoDisclosure}
          </p>

          <p className="tabular-nums shrink-0">
            Developed by Sai Babu Karri · Contact:{' '}
            <a href="tel:9374567746" className="underline underline-offset-2 hover:text-[#1C1917]">
              9374567746
            </a>{' '}
            · Email:{' '}
            <a
              href="mailto:saibabukarri25@gmail.com"
              className="underline underline-offset-2 hover:text-[#1C1917]"
            >
              saibabukarri25@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
