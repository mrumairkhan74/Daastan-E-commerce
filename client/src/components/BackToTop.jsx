"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-charcoal text-white rounded-full shadow-lg flex items-center justify-center hover:bg-charcoal/90 transition-all hover:scale-110"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
