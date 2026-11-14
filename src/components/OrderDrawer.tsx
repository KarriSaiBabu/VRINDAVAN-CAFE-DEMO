import { useEffect } from 'react';
import { X } from 'lucide-react';
import { type OrderPricingSummary } from '../utils/security';
import { OrderPanel } from './OrderPanel';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  summary: OrderPricingSummary;
  fulfillment: 'delivery' | 'pickup';
  onFulfillmentChange: (next: 'delivery' | 'pickup') => void;
  onUpdateQuantity: (itemId: string, nextQty: number) => void;
  onClearCart: () => void;
  onNavigate: (path: string) => void;
}

export function OrderDrawer({
  isOpen,
  onClose,
  summary,
  fulfillment,
  onFulfillmentChange,
  onUpdateQuantity,
  onClearCart,
  onNavigate,
}: OrderDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Food Order Drawer"
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-[#FAF9F7] p-4 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="font-display text-lg font-medium text-[#1C1917]">
            Food Order Checkout
          </span>
          <button
            type="button"
            aria-label="Close order drawer"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#1C1917]/12 text-[#1C1917] transition-colors hover:bg-[#F1EFEA] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <OrderPanel
          summary={summary}
          fulfillment={fulfillment}
          onFulfillmentChange={onFulfillmentChange}
          onUpdateQuantity={onUpdateQuantity}
          onClearCart={onClearCart}
          onNavigate={(path) => {
            onClose();
            onNavigate(path);
          }}
          idPrefix="drawer"
        />

        {summary.items.length === 0 && (
          <a
            href="#menu"
            onClick={onClose}
            className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#1C1917]/15 bg-[#F1EFEA] px-4 py-2.5 text-sm font-medium text-[#1C1917] transition-colors hover:bg-[#E7E4DC]"
          >
            Browse Menu Items
          </a>
        )}
      </div>
    </div>
  );
}
