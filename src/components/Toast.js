import { useEffect, useState } from "react";

export function Toast({ message, duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div aria-live="polite" aria-atomic="true" className="toast-container">
      <div className="toast show">
        <div className="toast-header">
          <strong className="me-auto">Notificação</strong>
          <small>Agora</small>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}