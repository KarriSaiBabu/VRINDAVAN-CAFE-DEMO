import { CAFE_INFO, MENU_ITEMS, type MenuItem } from '../data/cafeConfig';

export const INPUT_LIMITS = Object.freeze({
  nameMax: 80,
  phoneMax: 18,
  addressMax: 240,
  notesMax: 300,
  maxItemQuantity: 25,
  maxGuests: 20,
});

/**
 * Strips control chars, zero-width / bidirectional override characters, and HTML angle brackets
 * to neutralize XSS, log spoofing, and WhatsApp link formatting abuse.
 */
export function sanitizeText(raw: string, maxLength: number): string {
  const cleaned = raw
    // Remove ASCII control chars except normal newline/tab, then collapse newlines to spaces
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    // Remove Unicode zero-width and bidirectional text override chars
    .replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/g, '')
    // Strip angle brackets & backticks
    .replace(/[<>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned.slice(0, maxLength);
}

/**
 * Validates and normalizes phone numbers to digits-only or readable +E.164 format.
 */
export function sanitizePhoneInput(raw: string): string {
  return raw.replace(/[^\d+\-\s()]/g, '').slice(0, INPUT_LIMITS.phoneMax);
}

export function extractPhoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function isValidPhone(phone: string): boolean {
  const digits = extractPhoneDigits(phone);
  return digits.length >= 7 && digits.length <= 15;
}

export function isValidDateRange(dateIso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIso)) return false;
  const parsed = new Date(`${dateIso}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 90);

  return parsed >= today && parsed <= maxDate;
}

export function getTodayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getMaxReservationIsoDate(): string {
  const future = new Date();
  future.setDate(future.getDate() + 90);
  const year = future.getFullYear();
  const month = String(future.getMonth() + 1).padStart(2, '0');
  const day = String(future.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface VerifiedLineItem {
  readonly item: MenuItem;
  readonly quantity: number;
  readonly lineTotalInr: number;
}

export interface OrderPricingSummary {
  readonly items: readonly VerifiedLineItem[];
  readonly subtotalInr: number;
  readonly deliveryFeeInr: number;
  readonly totalInr: number;
  readonly totalCount: number;
}

/**
 * Computes canonical prices strictly from the immutable MENU_ITEMS catalog.
 * Ignores unknown IDs and clamps quantities safely.
 */
export function calculateVerifiedOrder(
  cart: Record<string, number>,
  fulfillment: 'delivery' | 'pickup',
): OrderPricingSummary {
  const menuMap = new Map<string, MenuItem>(MENU_ITEMS.map((item) => [item.id, item]));
  const items: VerifiedLineItem[] = [];
  let subtotalInr = 0;
  let totalCount = 0;

  for (const [itemId, rawQty] of Object.entries(cart)) {
    const menuItem = menuMap.get(itemId);
    if (!menuItem) continue;
    const qty = Math.floor(Number(rawQty));
    if (!Number.isFinite(qty) || qty <= 0) continue;

    const clampedQty = Math.min(qty, INPUT_LIMITS.maxItemQuantity);
    const lineTotalInr = menuItem.priceInr * clampedQty;
    subtotalInr += lineTotalInr;
    totalCount += clampedQty;
    items.push({
      item: menuItem,
      quantity: clampedQty,
      lineTotalInr,
    });
  }

  const deliveryFeeInr =
    fulfillment === 'delivery' &&
    items.length > 0 &&
    subtotalInr < CAFE_INFO.freeDeliveryThresholdInr
      ? CAFE_INFO.deliveryFeeInr
      : 0;

  return {
    items,
    subtotalInr,
    deliveryFeeInr,
    totalInr: subtotalInr + deliveryFeeInr,
    totalCount,
  };
}

/**
 * Strictly constructs an https://wa.me/ link with validated owner digits
 * and length-bounded UTF-8 encoded message payload.
 */
export function buildSafeWhatsAppUrl(message: string): string {
  const ownerDigits = extractPhoneDigits(CAFE_INFO.ownerWhatsApp);
  if (ownerDigits.length < 7 || ownerDigits.length > 15) {
    throw new Error('Invalid cafe owner WhatsApp number configuration.');
  }

  const safeBody = message.slice(0, 3200);
  const encoded = encodeURIComponent(safeBody);
  const url = `https://wa.me/${ownerDigits}?text=${encoded}`;
  return url;
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export interface OrderSubmissionInput {
  customerName: string;
  customerPhone: string;
  fulfillment: 'delivery' | 'pickup';
  address: string;
  notes: string;
  summary: OrderPricingSummary;
}

export function formatWhatsAppOrderMessage(input: OrderSubmissionInput): string {
  const name = sanitizeText(input.customerName, INPUT_LIMITS.nameMax);
  const phone = sanitizeText(input.customerPhone, INPUT_LIMITS.phoneMax);
  const address = sanitizeText(input.address, INPUT_LIMITS.addressMax);
  const notes = sanitizeText(input.notes, INPUT_LIMITS.notesMax);

  const lines: string[] = [
    `*New Food Order — ${CAFE_INFO.name}*`,
    '',
    `*Order Type:* ${input.fulfillment === 'delivery' ? 'Home Delivery' : 'Cafe Pickup'}`,
    `*Customer:* ${name}`,
    `*Phone:* ${phone}`,
  ];

  if (input.fulfillment === 'delivery') {
    lines.push(`*Delivery Address:* ${address}`);
  } else {
    lines.push(`*Pickup Location:* ${CAFE_INFO.addressLine1}`);
  }

  lines.push('', '*Items Ordered:*');
  for (const line of input.summary.items) {
    lines.push(
      `- ${line.quantity} x ${line.item.name} (${formatInr(line.item.priceInr)}) = ${formatInr(line.lineTotalInr)}`,
    );
  }

  lines.push('');
  lines.push(`Subtotal: ${formatInr(input.summary.subtotalInr)}`);
  if (input.fulfillment === 'delivery') {
    lines.push(
      `Delivery Fee: ${input.summary.deliveryFeeInr === 0 ? 'Free' : formatInr(input.summary.deliveryFeeInr)}`,
    );
  }
  lines.push(`*Total Payable:* ${formatInr(input.summary.totalInr)}`);

  if (notes) {
    lines.push('', `*Special Notes:* ${notes}`);
  }

  return lines.join('\n');
}

export interface ReservationSubmissionInput {
  guestName: string;
  guestPhone: string;
  dateIso: string;
  timeSlot: string;
  partySize: number;
  seatingZone: string;
  specialRequests: string;
}

export function formatWhatsAppReservationMessage(input: ReservationSubmissionInput): string {
  const name = sanitizeText(input.guestName, INPUT_LIMITS.nameMax);
  const phone = sanitizeText(input.guestPhone, INPUT_LIMITS.phoneMax);
  const zone = sanitizeText(input.seatingZone, 60);
  const requests = sanitizeText(input.specialRequests, INPUT_LIMITS.notesMax);
  const safeGuests = Math.max(1, Math.min(INPUT_LIMITS.maxGuests, Math.floor(input.partySize)));

  const lines: string[] = [
    `*Table Reservation Request — ${CAFE_INFO.name}*`,
    '',
    `*Guest Name:* ${name}`,
    `*Phone:* ${phone}`,
    `*Date:* ${input.dateIso}`,
    `*Time:* ${input.timeSlot}`,
    `*Party Size:* ${safeGuests} ${safeGuests === 1 ? 'Guest' : 'Guests'}`,
    `*Preferred Seating:* ${zone}`,
  ];

  if (requests) {
    lines.push(`*Special Requests:* ${requests}`);
  }

  lines.push('', 'Please confirm availability at your convenience.');
  return lines.join('\n');
}
