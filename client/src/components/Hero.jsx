"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { BRAND_CONFIG } from "../data/products";

export default function Hero({ onShopClick, onStoryClick }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Background atmospheric elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm-beige/5 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-champagne/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-champagne/10 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%231A1A1A' fillOpacity='0.03'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "60px 60px"
      }} />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Urdu Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mb-6"
          >
            <span className="font-urdu text-5xl md:text-7xl lg:text-8xl font-light text-charcoal/90 tracking-wide leading-tight block">
              داستان
            </span>
          </motion.div>

          {/* English Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
            className="mb-4"
          >
            <span className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-charcoal tracking-widest leading-tight block">
              DASTAN
            </span>
          </motion.div>

          {/* Founder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            className="mb-8"
          >
            <span className="font-body text-lg md:text-xl text-charcoal/50 tracking-widest uppercase block">
              by Ahmedullah
            </span>
          </motion.div>

          {/* Main Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.65 }}
            className="mb-10"
          >
            <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-charcoal/80 leading-relaxed tracking-normal">
              Every Thread, A Story.
            </p>
          </motion.div>

          {/* Brand Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
            className="mb-16 max-w-2xl mx-auto"
          >
            <p className="font-body text-base md:text-lg text-charcoal/60 leading-relaxed tracking-normal">
              Born from struggle, shaped by ambition, and written one chapter at a time.
              <br />
              DASTAN is a contemporary clothing house built for those who are still becoming.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.95 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onShopClick}
              className="group relative px-10 py-4 bg-charcoal text-white font-body text-sm uppercase tracking-widest rounded-none overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                SHOP THE FIRST CHAPTER
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </span>
              <motion.div
                className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 group-hover:origin-right transition-transform duration-300"
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStoryClick}
              className="relative px-10 py-4 border border-charcoal/30 text-charcoal font-body text-sm uppercase tracking-widest rounded-none bg-transparent hover:bg-charcoal hover:text-white transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                OUR STORY
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </span>
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-20 flex flex-col items-center gap-3 text-charcoal/40"
          >
            <p className="text-xs uppercase tracking-widest font-body">Scroll to begin</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-charcoal/40 to-transparent"
            />
          </motion.div>
        </div>
      </div>

      {/* Product showcase hint at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-4 bg-white/80 backdrop-blur-sm border border-warm-beige/20 rounded-none shadow-lg"
      >
        <div className="w-20 h-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-ivory to-cream rounded-t-[4px] shadow-inner border border-warm-beige/20" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-charcoal/20 rounded-b-[4px]" />
        </div>
        <div className="text-left">
          <p className="font-display text-sm text-charcoal/80">DASTAN Oversized Shirt</p>
          <p className="font-body text-xs text-charcoal/50">200 GSM • 100% Cotton</p>
        </div>
      </motion.div>
    </section>
  );
}