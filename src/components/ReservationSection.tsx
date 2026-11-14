import { useState, type FormEvent } from 'react';
import { Calendar, Check, Copy, ExternalLink } from 'lucide-react';
import {
  CAFE_INFO,
  RESERVATION_TIME_SLOTS,
  SEATING_ZONES,
} from '../data/cafeConfig';
import {
  buildSafeWhatsAppUrl,
  formatWhatsAppReservationMessage,
  getMaxReservationIsoDate,
  getTodayIsoDate,
  INPUT_LIMITS,
  isValidDateRange,
  isValidPhone,
  sanitizePhoneInput,
  sanitizeText,
} from '../utils/security';

interface ReservationErrors {
  guestName?: string;
  guestPhone?: string;
  dateIso?: string;
  partySize?: string;
}

interface ReservationSectionProps {
  onNavigate: (path: string) => void;
}

export function ReservationSection({ onNavigate }: ReservationSectionProps) {
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [dateIso, setDateIso] = useState(getTodayIsoDate);
  const [timeSlot, setTimeSlot] = useState(RESERVATION_TIME_SLOTS[5]);
  const [partySize, setPartySize] = useState(2);
  const [seatingZone, setSeatingZone] = useState(SEATING_ZONES[0].id);
  const [specialRequests, setSpecialRequests] = useState('');
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [dispatchState, setDispatchState] = useState<{
    message: string;
    whatsappUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: ReservationErrors = {};

    const cleanName = sanitizeText(guestName, INPUT_LIMITS.nameMax);
    if (cleanName.length < 2) {
      nextErrors.guestName = 'Enter your name (at least 2 characters).';
    }

    if (!isValidPhone(guestPhone)) {
      nextErrors.guestPhone = 'Enter a valid 7–15 digit WhatsApp number.';
    }

    if (!isValidDateRange(dateIso)) {
      nextErrors.dateIso = 'Choose today or a date within the next 90 days.';
    }

    if (partySize < 1 || partySize > INPUT_LIMITS.maxGuests) {
      nextErrors.partySize = `Party size must be between 1 and ${INPUT_LIMITS.maxGuests}.`;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const formatted = formatWhatsAppReservationMessage({
      guestName: cleanName,
      guestPhone,
      dateIso,
      timeSlot,
      partySize,
      seatingZone,
      specialRequests,
    });
    const whatsappUrl = buildSafeWhatsAppUrl(formatted);
    setDispatchState({ message: formatted, whatsappUrl });
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!dispatchState) return;
    try {
      await navigator.clipboard.writeText(dispatchState.message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard may be blocked in restricted frames
    }
  };

  return (
    <section id="reserve" className="border-b border-[#1C1917]/10 bg-[#F1EFEA]/65 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: Seating info */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#1B3B2B]">Table Reservations</p>
            <h2
              className="mt-2 font-display text-3xl font-medium tracking-tight text-[#1C1917] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Book a courtyard table directly via WhatsApp.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#57534E]">
              Reserve in under thirty seconds—no accounts or booking fees required. Select your
              preferred date, time, and seating corner, and send your request straight to our
              host desk on WhatsApp.
            </p>

            <div className="mt-8 divide-y divide-[#1C1917]/10 border-t border-b border-[#1C1917]/10">
              {SEATING_ZONES.filter((zone) => zone.id !== 'No Preference').map((zone) => (
                <div key={zone.id} className="py-4">
                  <p className="text-sm font-semibold text-[#1C1917]">{zone.label}</p>
                  <p className="mt-0.5 text-sm text-[#57534E]">{zone.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive WhatsApp Reservation Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#1C1917]/10 bg-[#FAF9F7] p-6 sm:p-8">
              {dispatchState ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1B3B2B]">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>Reservation Message Ready</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-medium text-[#1C1917]">
                    Send your table request on WhatsApp
                  </h3>
                  <p className="mt-1.5 text-sm text-[#57534E]">
                    Tap below to send your reservation details directly to {CAFE_INFO.name} (
                    {CAFE_INFO.displayPhone}).
                  </p>

                  <pre className="mt-4 rounded-lg border border-[#1C1917]/10 bg-[#F1EFEA] p-4 font-sans text-xs leading-relaxed whitespace-pre-wrap text-[#1C1917]">
                    {dispatchState.message}
                  </pre>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={dispatchState.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#1B3B2B] px-5 py-3 text-sm font-medium text-[#FAF9F7] transition-colors hover:bg-[#142D21]"
                    >
                      <span>Open WhatsApp &amp; Send</span>
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#1C1917]/15 bg-white px-4 py-3 text-sm font-medium text-[#1C1917] transition-colors hover:bg-[#F1EFEA] cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-[#1B3B2B]" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setDispatchState(null)}
                      className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-[#1C1917]/15 bg-white px-4 py-3 text-sm font-medium text-[#57534E] transition-colors hover:bg-[#F1EFEA] cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="reserve-name"
                        className="block text-xs font-medium text-[#1C1917]"
                      >
                        Guest Name
                      </label>
                      <input
                        id="reserve-name"
                        type="text"
                        autoComplete="name"
                        maxLength={INPUT_LIMITS.nameMax}
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Meera Krishnan"
                        className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#1C1917]/15 bg-white px-3.5 py-2 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#1B3B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/25"
                      />
                      {errors.guestName && (
                        <p className="mt-1 text-xs text-[#991B1B]" role="alert">
                          {errors.guestName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="reserve-phone"
                        className="block text-xs font-medium text-[#1C1917]"
                      >
                        WhatsApp / Phone Number
                      </label>
                      <input
                        id="reserve-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        maxLength={INPUT_LIMITS.phoneMax}
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(sanitizePhoneInput(e.target.value))}
                        placeholder="09963344874"
                        className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#1C1917]/15 bg-white px-3.5 py-2 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#1B3B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/25"
                      />
                      {errors.guestPhone && (
                        <p className="mt-1 text-xs text-[#991B1B]" role="alert">
                          {errors.guestPhone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="reserve-date"
                        className="block text-xs font-medium text-[#1C1917]"
                      >
                        Date
                      </label>
                      <input
                        id="reserve-date"
                        type="date"
                        min={getTodayIsoDate()}
                        max={getMaxReservationIsoDate()}
                        value={dateIso}
                        onChange={(e) => setDateIso(e.target.value)}
                        className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#1C1917]/15 bg-white px-3.5 py-2 text-sm text-[#1C1917] tabular-nums focus:border-[#1B3B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/25"
                      />
                      {errors.dateIso && (
                        <p className="mt-1 text-xs text-[#991B1B]" role="alert">
                          {errors.dateIso}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="reserve-time"
                        className="block text-xs font-medium text-[#1C1917]"
                      >
                        Time Slot
                      </label>
                      <select
                        id="reserve-time"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#1C1917]/15 bg-white px-3.5 py-2 text-sm text-[#1C1917] tabular-nums focus:border-[#1B3B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/25"
                      >
                        {RESERVATION_TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="reserve-guests"
                        className="block text-xs font-medium text-[#1C1917]"
                      >
                        Party Size
                      </label>
                      <select
                        id="reserve-guests"
                        value={partySize}
                        onChange={(e) => setPartySize(Number(e.target.value))}
                        className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#1C1917]/15 bg-white px-3.5 py-2 text-sm text-[#1C1917] tabular-nums focus:border-[#1B3B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/25"
                      >
                        {Array.from({ length: INPUT_LIMITS.maxGuests }, (_, idx) => idx + 1).map(
                          (count) => (
                            <option key={count} value={count}>
                              {count} {count === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ),
                        )}
                      </select>
                      {errors.partySize && (
                        <p className="mt-1 text-xs text-[#991B1B]" role="alert">
                          {errors.partySize}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="reserve-seating"
                      className="block text-xs font-medium text-[#1C1917]"
                    >
                      Preferred Seating
                    </label>
                    <select
                      id="reserve-seating"
                      value={seatingZone}
                      onChange={(e) => setSeatingZone(e.target.value)}
                      className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#1C1917]/15 bg-white px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#1B3B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/25"
                    >
                      {SEATING_ZONES.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="reserve-requests"
                      className="block text-xs font-medium text-[#1C1917]"
                    >
                      Special Requests <span className="text-[#57534E]">(optional)</span>
                    </label>
                    <input
                      id="reserve-requests"
                      type="text"
                      maxLength={INPUT_LIMITS.notesMax}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Quiet corner, baby chair, birthday dessert, Sattvic meal"
                      className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#1C1917]/15 bg-white px-3.5 py-2 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#1B3B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/25"
                    />
                  </div>

                  <p className="text-xs leading-relaxed text-[#57534E]">
                    By continuing, you consent to share your name, phone number, and reservation
                    details with {CAFE_INFO.name} via WhatsApp to process your table request. See
                    our{' '}
                    <a
                      href="/privacy-policy"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('/privacy-policy');
                      }}
                      className="font-medium text-[#1B3B2B] underline underline-offset-2"
                    >
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a
                      href="/terms"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('/terms');
                      }}
                      className="font-medium text-[#1B3B2B] underline underline-offset-2"
                    >
                      Terms
                    </a>
                    .
                  </p>

                  <button
                    type="submit"
                    className="inline-flex min-h-[46px] w-full items-center justify-center rounded-lg bg-[#1B3B2B] px-5 py-3 text-sm font-medium text-[#FAF9F7] transition-colors duration-150 hover:bg-[#142D21] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B] cursor-pointer"
                  >
                    Request Table via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
