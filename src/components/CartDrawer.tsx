// Tailwind custom colors required in tailwind.config.js:
// colors: { lapis: '#1a3a5c', gold: '#d4a843', pomegranate: '#a83232', ivory: '#faf6f0', charcoal: '#1a1a2e' }

import React, { useEffect, useMemo } from 'react';
import { useCart } from '../context/CartContext';

/* ------------------------------------------------------------------ */
/*  Square Checkout placeholder                                        */
/* ------------------------------------------------------------------ */

// Note: In production, you would call your backend here to create a Square Checkout link
// and then redirect the user to that URL.

async function handleSquareCheckout(
  items: { name: string; price: number; quantity: number }[]
) {
  try {
    // Simulate a network request to your backend to generate a Square Checkout URL
    console.log('Requesting Square Checkout URL for items:', items);
    
    alert(
      'Demo Mode: Square Checkout API integration. In production, this would redirect to a secure Square-hosted payment page.'
    );
    
    // Simulate a successful redirect and redirect to success page
    window.location.href = `${window.location.origin}?success=true`;
  } catch (err) {
    console.error('Square error:', err);
    alert('Checkout failed. Please try again.');
  }
}

/* ------------------------------------------------------------------ */
/*  Cart Drawer                                                        */
/* ------------------------------------------------------------------ */

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    total,
    itemCount,
    pickupTime,
    setPickupTime,
    isCartOpen,
    closeCart,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm
          transition-opacity duration-400
          ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 z-[70] h-full
          w-full max-w-md
          bg-white shadow-2xl shadow-black/20
          flex flex-col
          transition-transform duration-500 ease-out
          ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a3a5c]/10">
          <div className="flex items-center gap-3">
            <h2 className="font-['Playfair_Display',serif] text-2xl font-bold text-[#1a1a2e]">
              Your Order
            </h2>
            {itemCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#1a3a5c] text-white text-xs font-semibold">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-10 h-10 rounded-xl bg-[#faf6f0] flex items-center justify-center text-[#1a1a2e]/60 hover:text-[#a83232] hover:bg-[#a83232]/10 transition-all duration-300"
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-[#faf6f0] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#d4a843]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <p className="font-['Playfair_Display',serif] text-xl font-semibold text-[#1a1a2e] mb-2">
                Your cart is empty
              </p>
              <p className="text-[#1a1a2e]/50 text-sm">
                Explore our menu and add some delicious Uzbek dishes!
              </p>
              <button
                onClick={closeCart}
                className="mt-6 px-6 py-2.5 rounded-xl bg-[#1a3a5c] text-white text-sm font-semibold hover:bg-[#d4a843] hover:text-[#1a1a2e] transition-all duration-300"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="px-6 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-[#faf6f0]/60 border border-[#1a3a5c]/5 transition-all duration-300 hover:bg-[#faf6f0]"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-[#1a1a2e] truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#1a1a2e]/30 hover:text-[#a83232] transition-colors flex-shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-1 bg-white rounded-lg border border-[#1a3a5c]/10">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-[#1a1a2e]/60 hover:text-[#a83232] transition-colors text-lg"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm font-semibold text-[#1a1a2e]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-[#1a1a2e]/60 hover:text-[#1a3a5c] transition-colors text-lg"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Item total */}
                      <span className="text-sm font-bold text-[#1a3a5c]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-[#a83232]/60 hover:text-[#a83232] transition-colors py-2 underline underline-offset-2"
              >
                Clear entire cart
              </button>
            </div>
          )}
        </div>

        {/* Footer — totals & checkout */}
        {items.length > 0 && (
          <div className="border-t border-[#1a3a5c]/10 px-6 py-5 bg-[#faf6f0]/40 space-y-4">
            {/* Pickup time selector */}
            <div>
              <label className="block text-xs font-semibold text-[#1a1a2e]/70 uppercase tracking-wider mb-1.5">
                Pickup Time
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                min="10:00"
                max="20:00"
                className="w-full px-4 py-2.5 rounded-xl border border-[#1a3a5c]/15 bg-white text-sm text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#d4a843]/40 focus:border-[#d4a843] transition-all"
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-[#1a3a5c]/10" />

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#1a1a2e]/70">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#1a1a2e]/70">
                <span>Tax (10.25%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#1a1a2e] pt-1 border-t border-[#1a3a5c]/10">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Pickup notice */}
            <div className="flex items-center gap-2 text-xs text-[#1a3a5c]/60">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Pickup only — 405 NE 45th St, Seattle, WA 98105</span>
            </div>

            {/* Checkout button */}
            <button
              onClick={() =>
                handleSquareCheckout(
                  items.map((i) => ({
                    name: i.name,
                    price: i.price,
                    quantity: i.quantity,
                  }))
                )
              }
              className="
                w-full py-3.5 rounded-xl
                bg-[#d4a843] text-[#1a1a2e]
                font-bold text-sm uppercase tracking-wider
                shadow-lg shadow-[#d4a843]/20
                transition-all duration-300
                hover:shadow-xl hover:shadow-[#d4a843]/30 hover:brightness-110
                active:scale-[0.98]
              "
            >
              Checkout with Square
            </button>
            <p className="text-center text-[10px] text-[#1a1a2e]/30 tracking-wide">
              Demo Mode — Square Sandbox
            </p>
          </div>
        )}
      </div>
    </>
  );
}
