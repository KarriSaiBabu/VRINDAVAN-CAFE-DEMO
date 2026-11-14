import { useState, type FormEvent } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import { CAFE_INFO } from '../data/cafeConfig';
import {
  buildSafeWhatsAppUrl,
  formatInr,
  formatWhatsAppOrderMessage,
  INPUT_LIMITS,
  isValidPhone,
  sanitizePhoneInput,
  sanitizeText,
  type OrderPricingSummary,
} from '../utils/security';

interface OrderPanelProps {
  summary: OrderPricingSummary;
  fulfillment: 'delivery' | 'pickup';
  onFulfillmentChange: (next: 'delivery' | 'pickup') => void;
  onUpdateQuantity: (itemId: string, nextQty: number) => void;
  onClearCart: () => void;
  idPrefix?: string;
}

interface OrderFormErrors {
  customerName?: string;
  customerPhone?: string;
  address?: string;
  cart?: string;
}

export function OrderPanel({
  summary,
  fulfillment,
  onFulfillmentChange,
  onUpdateQuantity,
  onClearCart,
  idPrefix = 'desktop',
}: OrderPanelProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<OrderFormErrors>({});
  const [dispatchState, setDispatchState] = useState<{
    message: string;
    whatsappUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: OrderFormErrors = {};

    if (summary.items.length === 0) {
      nextErrors.cart = 'Select at least one dish or beverage from the menu.';
    }

    const cleanName = sanitizeText(customerName, INPUT_LIMITS.nameMax);
    if (cleanName.length < 2) {
      nextErrors.customerName = 'Enter your full name (at least 2 characters).';
    }

    if (!isValidPhone(customerPhone)) {
      nextErrors.customerPhone = 'Enter a valid 7–15 digit phone or WhatsApp number.';
    }

    const cleanAddress = sanitizeText(address, INPUT_LIMITS.addressMax);
    if (fulfillment === 'delivery' && cleanAddress.length < 8) {
      nextErrors.address = 'Enter your complete street address and nearby landmark.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const formattedMessage = formatWhatsAppOrderMessage({
      customerName: cleanName,
      customerPhone,
      fulfillment,
      address: cleanAddress,
      notes,
      summary,
    });

    const whatsappUrl = buildSafeWhatsAppUrl(formattedMessage);
    setDispatchState({ message: formattedMessage, whatsappUrl });
    setCopied(false);
  };

  const handleCopyMessage = async () => {
    if (!dispatchState) return;
    try {
      await navigator.clipboard.writeText(dispatchState.message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API may be restricted in non-HTTPS contexts; button remains safe
    }
  };

  if (dispatchState) {
    return (
      <div className="rounded-xl border border-[#1B3B2B]/25 bg-[#FAF9F7] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#1B3B2B]">Ready to Send via WhatsApp</p>
            <h3 className="mt-1 font-display text-2xl font-medium text-[#1C1917]">
              Confirm your food order
            </h3>
          </div>
          <span className="font-mono text-sm font-semibold text-[#1B3B2B] tabular-nums">
            {formatInr(summary.totalInr)}
          </span>
        </div>

        <p className="mt-2 text-sm text-[#57534E]">
          Tap below to open WhatsApp with your itemized food list and delivery details pre-filled
          for the cafe owner ({CAFE_INFO.displayPhone}).
        </p>

        <pre className="mt-4 max-h-60 overflow-y-auto rounded-lg border border-[#1C1917]/10 bg-[#F1EFEA] p-3.5 font-sans text-xs leading-relaxed whitespace-pre-wrap text-[#1C1917]">
          {dispatchState.message}
        </pre>

        <div className="mt-5 flex flex-col gap-3">
          <a
            href={dispatchState.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#1B3B2B] px-5 py-3 text-sm font-medium text-[#FAF9F7] transition-colors hover:bg-[#142D21] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
          >
            <span>Open WhatsApp &amp; Send Order</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopyMessage}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#1C1917]/15 bg-[#FAF9F7] px-3 py-2 text-xs font-medium text-[#1C1917] transition-colors hover:bg-[#F1EFEA] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#1B3B2B]" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy Message</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setDispatchState(null)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#1C1917]/15 bg-[#FAF9F7] px-3 py-2 text-xs font-medium text-[#57534E] transition-colors hover:bg-[#F1EFEA] hover:text-[#1C1917] cursor-pointer"
            >
              Edit Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#1C1917]/10 bg-[#FAF9F7] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-[#1C1917]/10 pb-4">
        <div className="flex items-center gap-2.5">
          <ShoppingBag className="h-5 w-5 text-[#1B3B2B]" aria-hidden="true" />
          <h3 className="font-display text-xl font-medium text-[#1C1917]">Your Order</h3>
        </div>
        {summary.items.length > 0 && (
          <button
            type="button"
            onClick={onClearCart}
            className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-medium text-[#57534E] transition-colors hover:text-[#991B1B] cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Selected food items */}
      {summary.items.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm font-medium text-[#1C1917]">No items selected yet</p>
          <p className="mt-1 text-xs text-[#57534E]">
            Add chai, coffee, or plates from the menu to build your WhatsApp order.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[#1C1917]/8 border-b border-[#1C1917]/10">
          {summary.items.map(({ item, quantity, lineTotalInr }) => (
            <div key={item.id} className="flex items-center justify-between gap-3 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#1C1917]">{item.name}</p>
                <p className="mt-0.5 font-mono text-xs text-[#57534E] tabular-nums">
                  {formatInr(item.priceInr)} each
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="inline-flex items-center rounded-lg border border-[#1C1917]/15 bg-[#F1EFEA]">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                    className="flex h-9 w-9 items-center justify-center text-[#1C1917] transition-colors hover:bg-[#E5E1D8] rounded-l-lg cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <span className="w-7 text-center font-mono text-xs font-semibold text-[#1C1917] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center text-[#1C1917] transition-colors hover:bg-[#E5E1D8] rounded-r-lg cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>

                <span className="w-16 text-right font-mono text-sm font-medium text-[#1C1917] tabular-nums">
                  {formatInr(lineTotalInr)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Totals */}
      {summary.items.length > 0 && (
        <div className="space-y-2 border-b border-[#1C1917]/10 py-4 text-sm">
          <div className="flex justify-between text-[#57534E]">
            <span>Subtotal</span>
            <span className="font-mono tabular-nums">{formatInr(summary.subtotalInr)}</span>
          </div>
          {fulfillment === 'delivery' && (
            <div className="flex justify-between text-[#57534E]">
              <span>
                Delivery (free over {formatInr(CAFE_INFO.freeDeliveryThresholdInr)})
              </span>
              <span className="font-mono tabular-nums">
                {summary.deliveryFeeInr === 0 ? 'Free' : formatInr(summary.deliveryFeeInr)}
              </span>
            </div>
          )}
          <div className="flex justify-between pt-1 text-base font-semibold text-[#1C1917]">
            <span>Total</span>
            <span className="font-mono tabular-nums">{formatInr(summary.totalInr)}</span>
          </div>
        </div>
      )}

      {/* Order Form */}
      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <div>
          <span className="block text-xs font-medium text-[#57534E]">Order Type</span>
          <div className="mt-1.5 grid grid-cols-2 gap-1 rounded-lg bg-[#F1EFEA] p-1">
            <button
              type="button"
              onClick={() => onFulfillmentChange('delivery')}
              className={`min-h-[40px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                fulfillment === 'delivery'
                  ? 'bg-[#FAF9F7] text-[#1C1917] shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              Home Delivery
            </button>
            <button
              type="button"
              onClick={() => onFulfillmentChange('pickup')}
              className={`min-h-[40px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                fulfillment === 'pickup'
                  ? 'bg-[#FAF9F7] text-[#1C1917] shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              Cafe Pickup
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-order-name`}
            className="block text-xs font-medium text-[#1C1917]"
          >
            Full Name
          </label>
          <input
            id={`${idPrefix}-order-name`}
            type="text"
            autoComplete="name"
            maxLength={INPUT_LIMITS.nameMax}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Aarav Sharma"
            className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#1C1917]/15 bg-white px-3.5 py-2 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#1B3B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/25"
          />
          {errors.customerName && (
            <p className="mt-1 text-xs text-[#991B1B]" role="alert">
              {errors.customerName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-order-phone`}
            className="block text-xs font-medium text-[#1C1917]"
          >
            Phone / WhatsApp Number
          </label>
          <input
            id={`${idPrefix}-order-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={INPUT_LIMITS.phoneMax}
            value={customerPhone}
            onChange={(e) => setCustomerPhone(sanitizePhoneInput(e.target.value))}
            placeholder="09963344874"
            className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#1C1917]/15 bg-white px-3.5 py-2 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#1B3B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/25"
          />
          {errors.customerPhone && (
            <p className="mt-1 text-xs text-[#991B1B]" role="alert">
              {errors.customerPhone}
            </p>
          )}
        </div>

        {fulfillment === 'delivery' ? (
          <div>
            <label
              htmlFor={`${idPrefix}-order-address`}
              className="block text-xs font-medium text-[#1C1917]"
            >
              Delivery Address &amp; Landmark
            </label>
            <textarea
              id={`${idPrefix}-order-address`}
              rows={2}
              autoComplete="street-address"
              maxLength={INPUT_LIMITS.addressMax}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House/Flat No., Street, and nearest landmark in Simhachalam / Visakhapatnam"
              className="mt-1.5 w-full rounded-lg border border-[#1C1917]/15 bg-white px-3.5 py-2.5 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#1B3B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/25"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-[#991B1B]" role="alert">
                {errors.address}
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-[#1C1917]/10 bg-[#F1EFEA] p-3 text-xs text-[#57534E]">
            <p className="font-medium text-[#1C1917]">Pickup Counter</p>
            <p className="mt-0.5">
              {CAFE_INFO.addressLine1}, {CAFE_INFO.addressLine2}
            </p>
          </div>
        )}

        <div>
          <label
            htmlFor={`${idPrefix}-order-notes`}
            className="block text-xs font-medium text-[#1C1917]"
          >
            Cooking or Delivery Notes <span className="text-[#57534E]">(optional)</span>
          </label>
          <input
            id={`${idPrefix}-order-notes`}
            type="text"
            maxLength={INPUT_LIMITS.notesMax}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Less sugar, no onion/garlic, ring bell at gate"
            className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#1C1917]/15 bg-white px-3.5 py-2 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#1B3B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/25"
          />
        </div>

        {errors.cart && (
          <p className="text-xs font-medium text-[#991B1B]" role="alert">
            {errors.cart}
          </p>
        )}

        <button
          type="submit"
          className="inline-flex min-h-[46px] w-full items-center justify-center rounded-lg bg-[#1B3B2B] px-5 py-3 text-sm font-medium text-[#FAF9F7] transition-colors duration-150 hover:bg-[#142D21] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B] cursor-pointer"
        >
          Send Order via WhatsApp
        </button>
      </form>
    </div>
  );
}
