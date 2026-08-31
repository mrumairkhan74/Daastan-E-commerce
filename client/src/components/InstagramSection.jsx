"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BRAND_CONFIG } from "../data/products";

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const instagramPosts = [
  { id: 1, img: "/images/lookbook/daylight-1.jpg", alt: "DASTAN fashion editorial" },
  { id: 2, img: "/images/lookbook/archive-1.jpg", alt: "DASTAN collection" },
  { id: 3, img: "/images/lookbook/after-dark-1.jpg", alt: "DASTAN style" },
  { id: 4, img: "/images/lookbook/new-chapter.jpg", alt: "DASTAN new arrival" },
  { id: 5, img: "/images/lookbook/daylight-2.jpg", alt: "DASTAN outfit" },
  { id: 6, img: "/images/lookbook/archive-2.jpg", alt: "DASTAN lookbook" },
];

export default function InstagramSection() {
  return (
    <section className="py-24 bg-warm-beige/5">
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
            <InstagramIcon className="w-4 h-4" />
            <span>{BRAND_CONFIG.instagram}</span>
          </a>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
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
              className="aspect-square relative group overflow-hidden"
            >
              <img
                src={post.img}
                alt={post.alt}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-300 flex items-center justify-center">
                <InstagramIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
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