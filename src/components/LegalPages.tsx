import { ArrowLeft } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeConfig';

export type LegalRoute = 'privacy' | 'terms';

interface LegalPageProps {
  route: LegalRoute;
  onNavigate: (path: string) => void;
}

export function LegalPage({ route, onNavigate }: LegalPageProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('/');
        }}
        className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-[#1B3B2B] hover:underline hover:underline-offset-4"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span>Back to {CAFE_INFO.name}</span>
      </a>

      {route === 'privacy' ? (
        <article className="mt-8 space-y-6 text-sm leading-relaxed text-[#57534E]">
          <header className="border-b border-[#1C1917]/10 pb-6">
            <p className="text-xs font-medium text-[#1B3B2B]">
              Digital Personal Data Protection (DPDP) Act, 2023 Notice
            </p>
            <h1 className="mt-2 font-display text-3xl font-medium text-[#1C1917] sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs text-[#57534E]">
              Last updated: November 2026 · {CAFE_INFO.name}, {CAFE_INFO.addressLine1},{' '}
              {CAFE_INFO.addressLine2}
            </p>
          </header>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-medium text-[#1C1917]">
              1. Information You Provide
            </h2>
            <p>
              When you place a food order or request a table reservation on this website, you
              voluntarily enter your name, phone/WhatsApp number, optional delivery address, and
              seating or dietary preferences.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-medium text-[#1C1917]">
              2. How Your Information Is Processed
            </h2>
            <p>
              This website operates purely as a static client-side web application without a backend
              database. Your form inputs are sanitized in your browser and formatted into a
              WhatsApp message link addressed to the cafe owner ({CAFE_INFO.displayPhone}). Nothing
              is stored on external web servers or sold to third parties. Data is transmitted to
              WhatsApp only when you explicitly click &ldquo;Open WhatsApp &amp; Send&rdquo;.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-medium text-[#1C1917]">
              3. Cookies, Fonts &amp; Analytics
            </h2>
            <p>
              We do not use advertising cookies, Meta Pixels, Google Analytics, or third-party
              tracking scripts. All web fonts are self-hosted with this site so visitor IP
              addresses are never sent to external font servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-medium text-[#1C1917]">
              4. Your Rights Under DPDP Act 2023
            </h2>
            <p>
              You may request access to, correction of, or deletion of any order or reservation
              messages shared via WhatsApp by contacting the Data Fiduciary ({CAFE_INFO.name}) at{' '}
              {CAFE_INFO.displayPhone} or {CAFE_INFO.email}.
            </p>
          </section>
        </article>
      ) : (
        <article className="mt-8 space-y-6 text-sm leading-relaxed text-[#57534E]">
          <header className="border-b border-[#1C1917]/10 pb-6">
            <p className="text-xs font-medium text-[#1B3B2B]">
              Terms, Food Safety &amp; Licensing Disclosures
            </p>
            <h1 className="mt-2 font-display text-3xl font-medium text-[#1C1917] sm:text-4xl">
              Terms of Service &amp; Compliance
            </h1>
            <p className="mt-2 text-xs text-[#57534E]">
              {CAFE_INFO.name} · {CAFE_INFO.addressLine1}, {CAFE_INFO.addressLine2}
            </p>
          </header>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-medium text-[#1C1917]">
              1. Food Orders, Pricing &amp; Availability
            </h2>
            <p>
              All prices are listed in Indian Rupees (INR). Submitting an order or reservation
              prepares a WhatsApp request to the cafe owner; orders and table bookings are confirmed
              only once acknowledged by {CAFE_INFO.name} on WhatsApp ({CAFE_INFO.displayPhone}).{' '}
              {CAFE_INFO.demoDisclosure}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-medium text-[#1C1917]">
              2. FSSAI, GSTIN &amp; Vegetarian Kitchen Standards
            </h2>
            <p>
              <strong className="text-[#1C1917]">FSSAI Status:</strong> {CAFE_INFO.fssaiNumber}.
              <br />
              <strong className="text-[#1C1917]">GSTIN Status:</strong> {CAFE_INFO.gstinNumber}.
            </p>
            <p>
              Menu items are prepared in a 100% vegetarian kitchen. Please disclose nut, dairy,
              gluten, or Sattvic dietary requirements in the Special Notes field before sending
              your WhatsApp order or reservation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-medium text-[#1C1917]">
              3. Cancellations &amp; Refunds
            </h2>
            <p>
              To modify or cancel an order or table booking, message or call {CAFE_INFO.displayPhone}{' '}
              immediately via WhatsApp.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-medium text-[#1C1917]">
              4. Media &amp; Font Licensing
            </h2>
            <p>
              All photography on this site consists of custom-generated local assets created
              exclusively for this website (zero unlicensed third-party stock scrapes). Typography
              uses self-hosted SIL Open Font License fonts (Fraunces, Plus Jakarta Sans, and
              JetBrains Mono).
            </p>
          </section>
        </article>
      )}
    </section>
  );
}
