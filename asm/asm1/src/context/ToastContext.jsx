import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

let idSeq = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((toast) => {
    const id = idSeq++;
    const { message, title, variant = "success", delay = 3000 } = toast || {};
    setToasts((prev) => [
      ...prev,
      { id, message: String(message || ""), title: title || undefined, variant, delay },
    ]);
    return id;
  }, []);

  const api = useMemo(() => ({
    show,
    remove,
    success: (message, opts) => show({ message, variant: "success", ...(opts || {}) }),
    error: (message, opts) => show({ message, variant: "danger", ...(opts || {}) }),
    info: (message, opts) => show({ message, variant: "info", ...(opts || {}) }),
    warning: (message, opts) => show({ message, variant: "warning", ...(opts || {}) }),
  }), [show, remove]);

  return (
    <ToastContext.Provider value={{ toasts, ...api }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
