"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { BRAND_CONFIG, FOOTER_LINKS } from "../data/products";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-charcoal text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-3xl text-white mb-1">DASTAN</h3>
              <span className="font-urdu text-2xl text-white/60">داستان</span>
            </div>
            <p className="font-display text-lg italic text-white/60">by Ahmedullah</p>
            <p className="font-body text-sm text-white/50 leading-relaxed">
              Every Thread, A Story.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-body text-sm uppercase tracking-widest text-white/40 mb-6">Shop</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-body text-sm uppercase tracking-widest text-white/40 mb-6">Support</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-sm uppercase tracking-widest text-white/40 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-white/40 mt-1 flex-shrink-0" strokeWidth={2} />
                <a
                  href={`mailto:${BRAND_CONFIG.email}`}
                  className="font-body text-sm text-white/70 hover:text-white transition-colors"
                >
                  {BRAND_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-white/40 mt-1 flex-shrink-0" strokeWidth={2} />
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/70 hover:text-white transition-colors"
                >
                  WhatsApp available
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Instagram className="w-4 h-4 text-white/40 mt-1 flex-shrink-0" strokeWidth={2} />
                <a
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/70 hover:text-white transition-colors"
                >
                  {BRAND_CONFIG.instagram}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/40 mt-1 flex-shrink-0" strokeWidth={2} />
                <span className="font-body text-sm text-white/70">
                  Pakistan
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-xs text-white/40">
            © {currentYear} DASTAN. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Urdu tagline */}
      <div className="border-t border-white/10 py-8">
        <p className="text-center font-urdu text-2xl text-white/20">
          داستان — every thread, a story
        </p>
      </div>
    </footer>
  );
}