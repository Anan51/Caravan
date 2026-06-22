// Tailwind custom colors required in tailwind.config.js:
// colors: { lapis: '#1a3a5c', gold: '#d4a843', pomegranate: '#a83232', ivory: '#faf6f0', charcoal: '#1a1a2e' }

import React, { useCallback, useEffect, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

interface CookiePreferences {
  essential: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const CONSENT_KEY = 'caravan_cookie_consent';

const DEFAULT_PREFS: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: '',
};

/* ------------------------------------------------------------------ */
/*  Public helper — check consent                                      */
/* ------------------------------------------------------------------ */

export function hasConsent(category: keyof Omit<CookiePreferences, 'timestamp'>): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return category === 'essential';
    const prefs: CookiePreferences = JSON.parse(raw);
    return prefs[category] ?? false;
  } catch {
    return category === 'essential';
  }
}

/* ------------------------------------------------------------------ */
/*  Toggle Switch                                                      */
/* ------------------------------------------------------------------ */

function Toggle({
  enabled,
  disabled,
  onChange,
  label,
  description,
}: {
  enabled: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-[#1a3a5c]/10 last:border-0">
      <div>
        <p className="font-semibold text-[#1a1a2e] text-sm">{label}</p>
        <p className="text-[#1a1a2e]/50 text-xs mt-1 leading-relaxed">
          {description}
        </p>
      </div>
      <button
        onClick={() => !disabled && onChange(!enabled)}
        disabled={disabled}
        className={`
          relative flex-shrink-0 w-12 h-6 rounded-full transition-colors duration-300
          ${enabled ? 'bg-[#1a3a5c]' : 'bg-[#1a1a2e]/15'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        `}
        role="switch"
        aria-checked={enabled}
        aria-label={label}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm
            transition-transform duration-300
            ${enabled ? 'translate-x-6' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Customize Modal                                                    */
/* ------------------------------------------------------------------ */

function CustomizeModal({
  prefs,
  onSave,
  onClose,
}: {
  prefs: CookiePreferences;
  onSave: (p: CookiePreferences) => void;
  onClose: () => void;
}) {
  const [local, setLocal] = useState<CookiePreferences>(prefs);

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-[scaleIn_0.3s_ease-out]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-[#1a1a2e]">
            Cookie Preferences
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#faf6f0] flex items-center justify-center text-[#1a1a2e]/50 hover:text-[#a83232] transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="text-[#1a1a2e]/60 text-sm mb-6 leading-relaxed">
          Choose which cookies you'd like to allow. Essential cookies are
          required for the site to function and cannot be disabled.
        </p>

        <div>
          <Toggle
            label="Essential Cookies"
            description="Required for cart functionality, session management, and basic site features."
            enabled={true}
            disabled={true}
            onChange={() => {}}
          />
          <Toggle
            label="Analytics Cookies"
            description="Help us understand how visitors interact with our website to improve the experience."
            enabled={local.analytics}
            onChange={(v) => setLocal((p) => ({ ...p, analytics: v }))}
          />
          <Toggle
            label="Marketing Cookies"
            description="Used for social media integration and personalized content."
            enabled={local.marketing}
            onChange={(v) => setLocal((p) => ({ ...p, marketing: v }))}
          />
        </div>

        <button
          onClick={() => onSave(local)}
          className="
            w-full mt-6 py-3 rounded-xl
            bg-[#1a3a5c] text-white font-semibold text-sm tracking-wider
            transition-all duration-300
            hover:bg-[#d4a843] hover:text-[#1a1a2e]
            active:scale-[0.98]
          "
        >
          Save Preferences
        </button>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.92); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cookie Consent Banner                                              */
/* ------------------------------------------------------------------ */

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  /* Check if consent already stored */
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Small delay for page load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  /* Listen for "open-cookie-settings" event from footer */
  useEffect(() => {
    const handler = () => setShowCustomize(true);
    window.addEventListener('open-cookie-settings', handler);
    return () => window.removeEventListener('open-cookie-settings', handler);
  }, []);

  const savePrefs = useCallback((prefs: CookiePreferences) => {
    const withTimestamp = { ...prefs, essential: true, timestamp: new Date().toISOString() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(withTimestamp));
    setVisible(false);
    setShowCustomize(false);
  }, []);

  const acceptAll = () =>
    savePrefs({ essential: true, analytics: true, marketing: true, timestamp: '' });

  const rejectAll = () =>
    savePrefs({ essential: true, analytics: false, marketing: false, timestamp: '' });

  return (
    <>
      {/* Banner */}
      {visible && (
        <div
          className={`
            fixed bottom-0 inset-x-0 z-[9990]
            animate-[slideUp_0.5s_ease-out]
          `}
        >
          <div className="max-w-5xl mx-auto p-4">
            <div className="bg-[#1a1a2e]/90 backdrop-blur-xl rounded-2xl border border-[#d4a843]/15 shadow-2xl shadow-black/20 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#d4a843]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-white font-semibold text-sm">Cookie Notice</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    We use cookies to enhance your experience and enable online ordering.
                  </p>
                </div>

                {/* Buttons — equal prominence */}
                <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                  <button
                    onClick={acceptAll}
                    className="
                      flex-1 sm:flex-initial px-5 py-2.5 rounded-xl
                      bg-[#d4a843] text-[#1a1a2e]
                      font-semibold text-xs uppercase tracking-wider
                      transition-all duration-300
                      hover:brightness-110 active:scale-95
                    "
                  >
                    Accept All
                  </button>
                  <button
                    onClick={rejectAll}
                    className="
                      flex-1 sm:flex-initial px-5 py-2.5 rounded-xl
                      bg-white/10 text-white
                      font-semibold text-xs uppercase tracking-wider
                      border border-white/15
                      transition-all duration-300
                      hover:bg-white/20 active:scale-95
                    "
                  >
                    Reject All
                  </button>
                  <button
                    onClick={() => setShowCustomize(true)}
                    className="
                      flex-1 sm:flex-initial px-5 py-2.5 rounded-xl
                      bg-white/10 text-white
                      font-semibold text-xs uppercase tracking-wider
                      border border-white/15
                      transition-all duration-300
                      hover:bg-white/20 active:scale-95
                    "
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customize modal */}
      {showCustomize && (
        <CustomizeModal
          prefs={(() => {
            try {
              const raw = localStorage.getItem(CONSENT_KEY);
              return raw ? JSON.parse(raw) : DEFAULT_PREFS;
            } catch {
              return DEFAULT_PREFS;
            }
          })()}
          onSave={savePrefs}
          onClose={() => setShowCustomize(false)}
        />
      )}

      {/* Keyframe */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}
