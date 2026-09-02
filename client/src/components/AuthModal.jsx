"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { login, register } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    setMode(initialMode);
    setFormData({ name: "", email: "", password: "" });
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    try {
      if (mode === "login") {
        login(formData.email, formData.password);
        showToast("Welcome back!", "success");
      } else {
        register(formData.name, formData.email, formData.password);
        showToast("Account created successfully!", "success");
      }
      onClose();
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setFormData({ name: "", email: "", password: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-neutral-500" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-display mb-1">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-neutral-500 text-sm mb-6">
            {mode === "login"
              ? "Sign in to continue shopping"
              : "Join the DASTAN story"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-charcoal focus:outline-none transition-colors"
                  placeholder="Ahmedullah"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 focus:border-charcoal focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-charcoal focus:outline-none transition-colors pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <button type="button" className="text-sm text-charcoal/70 hover:text-charcoal">
                Forgot password?
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-charcoal text-white font-medium hover:bg-charcoal/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-neutral-500">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => switchMode("register")}
                  className="text-charcoal font-medium hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => switchMode("login")}
                  className="text-charcoal font-medium hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
