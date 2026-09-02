"use client";

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "../context/ToastContext";

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const { success } = useToast();
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    success("Welcome to the story!");
    setEmail("");
  };

  return (
    <footer className="bg-charcoal text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <h3 className="font-display text-2xl text-white mb-1">DASTAN</h3>
              <span className="font-urdu text-xl text-white/60">داستان</span>
            </div>
            <p className="font-display text-sm italic text-white/60 mb-4">Every Thread, A Story.</p>
            <p className="font-body text-xs text-white/40 mb-6">by Ahmedullah</p>
            
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-white placeholder-white/40 font-body text-sm focus:outline-none focus:border-white/40"
              />
              <button type="submit" className="px-3 py-2 bg-white text-charcoal hover:bg-white/90 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-white/40 mb-4">Shop</h4>
            <ul className="space-y-3">
              {["All Products", "Oversized Tees", "Jewelry", "New Arrivals", "Best Sellers"].map((item) => (
                <li key={item}>
                  <Link to={`/shop?category=${item.toLowerCase().replace(" ", "-")}`} className="font-body text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-white/40 mb-4">Help</h4>
            <ul className="space-y-3">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "Shipping Info", href: "/contact#shipping" },
                { label: "Size Guide", href: "/contact#size-guide" },
                { label: "Returns & Exchange", href: "/contact#returns" },
                { label: "FAQ", href: "/contact#faq" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="font-body text-sm text-white/70 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-white/40 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-white/40 mt-0.5" />
                <a href="mailto:dastanbyahmedullah@gmail.com" className="font-body text-sm text-white/70 hover:text-white transition-colors">
                  dastanbyahmedullah@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-white/40 mt-0.5" />
                <a href="https://wa.me/923XXXXXXXXX" className="font-body text-sm text-white/70 hover:text-white transition-colors">
                  WhatsApp available
                </a>
              </li>
              <li className="flex items-start gap-2">
                <InstagramIcon className="w-4 h-4 text-white/40 mt-0.5" />
                <a href="https://instagram.com/dastanbyahmedullah" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/70 hover:text-white transition-colors">
                  @dastanbyahmedullah
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white/40 mt-0.5" />
                <span className="font-body text-sm text-white/70">
                  Pakistan
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-body text-xs text-white/40">
              © {currentYear} DASTAN. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://instagram.com/dastanbyahmedullah" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-6 font-body text-xs text-white/40">
              <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Urdu tagline */}
      <div className="border-t border-white/10 py-6">
        <p className="text-center font-urdu text-xl text-white/20">
          داستان — every thread, a story
        </p>
      </div>
    </footer>
  );
}