"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    const hasSeen = localStorage.getItem("dastan_newsletter_shown");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("dastan_newsletter_shown", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast("Welcome to the DASTAN story! Check your inbox.", "success");
    setEmail("");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

      <div className="relative w-full max-w-lg bg-white shadow-2xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-neutral-500" />
        </button>

        <div className="p-8 md:p-12 text-center">
          <span className="text-xs tracking-[0.3em] text-neutral-400 uppercase">Stay Connected</span>
          <h2 className="text-3xl font-display mt-2 mb-3">Join the DASTAN Story</h2>
          <p className="text-neutral-500 mb-6 max-w-sm mx-auto">
            Be the first to know about new chapters, exclusive offers, and behind-the-scenes stories.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 border border-neutral-300 focus:border-charcoal focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-charcoal text-white font-medium hover:bg-charcoal/90 transition-colors"
            >
              Subscribe
            </button>
          </form>

          <p className="text-xs text-neutral-400 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
