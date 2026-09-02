"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, AlertCircle, Info } from "lucide-react";

const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message) => addToast(message, "success"), [addToast]);
  const error = useCallback((message) => addToast(message, "error"), [addToast]);
  const info = useCallback((message) => addToast(message, "info"), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, success, error, info }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-24 right-4 z-[100] space-y-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toast({ toast, onClose }) {
  const icons = {
    success: <Check className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const colors = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-charcoal text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-none shadow-lg ${colors[toast.type] || colors.info}`}
    >
      {icons[toast.type]}
      <p className="font-body text-sm flex-1">{toast.message}</p>
      <button onClick={onClose} className="hover:opacity-70 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}