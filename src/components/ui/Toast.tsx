// Tailwind custom colors required in tailwind.config.js:
// colors: { lapis: '#1a3a5c', gold: '#d4a843', pomegranate: '#a83232', ivory: '#faf6f0', charcoal: '#1a1a2e' }

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ToastVariant = 'success' | 'info' | 'error';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  addToast: (message: string, variant?: ToastVariant) => void;
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Individual Toast                                                   */
/* ------------------------------------------------------------------ */

const variantStyles: Record<ToastVariant, string> = {
  success: 'bg-emerald-600 text-white',
  info: 'bg-[#1a3a5c] text-white',
  error: 'bg-[#a83232] text-white',
};

const variantIcons: Record<ToastVariant, string> = {
  success: '✓',
  info: 'ℹ',
  error: '✕',
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const [exiting, setExiting] = React.useState(false);

  React.useEffect(() => {
    const autoClose = setTimeout(() => {
      setExiting(true);
    }, 2600);
    return () => clearTimeout(autoClose);
  }, []);

  React.useEffect(() => {
    if (exiting) {
      const remove = setTimeout(() => onDismiss(toast.id), 400);
      return () => clearTimeout(remove);
    }
  }, [exiting, onDismiss, toast.id]);

  return (
    <div
      className={`
        flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl
        min-w-[280px] max-w-[380px]
        ${variantStyles[toast.variant]}
        transition-all duration-400 ease-out
        ${exiting ? 'translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100'}
        animate-[slideInRight_0.4s_ease-out]
      `}
      role="alert"
    >
      <span className="text-lg font-bold flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
        {variantIcons[toast.variant]}
      </span>
      <p className="text-sm font-medium leading-snug flex-1">{toast.message}</p>
      <button
        onClick={() => setExiting(true)}
        className="ml-2 text-white/70 hover:text-white transition-colors flex-shrink-0 text-lg"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, variant: ToastVariant = 'info') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, message, variant }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast container — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onDismiss={removeToast} />
          </div>
        ))}
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(120%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
