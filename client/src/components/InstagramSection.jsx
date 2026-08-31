"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BRAND_CONFIG } from "../data/products";

export default function InstagramSection() {
  const mockPosts = [
    { id: 1, color: "bg-warm-beige/40" },
    { id: 2, color: "bg-cream/60" },
    { id: 3, color: "bg-champagne/30" },
    { id: 4, color: "bg-warm-beige/30" },
    { id: 5, color: "bg-cream/40" },
    { id: 6, color: "bg-champagne/20" },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="font-body text-sm text-charcoal/50 uppercase tracking-widest block mb-3">
            Follow Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal">
            Follow the Story
          </h2>
          <a
            href={BRAND_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-charcoal/60 hover:text-charcoal transition-colors font-body text-sm"
          >
            <Instagram className="w-4 h-4" strokeWidth={2} />
            <span>{BRAND_CONFIG.instagram}</span>
          </a>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`aspect-square ${post.color} relative group overflow-hidden flex items-center justify-center`}
            >
              {/* Placeholder content */}
              <div className="text-center">
                <Instagram className="w-8 h-8 text-charcoal/20 mb-2" strokeWidth={1.5} />
                <p className="font-body text-xs text-charcoal/30">DASTAN</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={2} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.a
            href={BRAND_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-charcoal text-charcoal font-body text-sm uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all duration-300"
          >
            <span>Follow Us on Instagram</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}