import { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useToast } from "../context/ToastContext";

export default function Toaster() {
  const { toasts, remove } = useToast();

  useEffect(() => {
    const timers = toasts.map((t) =>
      setTimeout(() => remove(t.id), Math.max(1000, t.delay || 3000))
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, remove]);

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1080 }}>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          bg={t.variant}
          onClose={() => remove(t.id)}
          className="shadow-lg border-0 rounded-4 overflow-hidden"
          style={{ minWidth: 420 }}
        >
          {t.title && (
            <Toast.Header closeButton={false} className="fw-semibold">
              <strong className="me-auto" style={{ fontSize: "1rem" }}>{t.title}</strong>
            </Toast.Header>
          )}
          <Toast.Body
            className={(t.variant === "warning" ? "text-dark" : "text-white") + " py-3 px-3"}
            style={{ fontSize: "1rem" }}
          >
            {t.message}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}
