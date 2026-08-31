"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LOOKBOOK_SECTIONS } from "../data/products";

const LOOKBOOK_IMAGES = {
  daylight: [
    "/images/lookbook/daylight-1.jpg",
    "/images/lookbook/daylight-2.jpg",
    "/images/lookbook/daylight-3.jpg",
  ],
  "after-dark": [
    "/images/lookbook/after-dark-1.jpg",
    "/images/lookbook/after-dark-2.jpg",
    "/images/lookbook/after-dark-3.jpg",
  ],
  archive: [
    "/images/lookbook/archive-1.jpg",
    "/images/lookbook/archive-2.jpg",
    "/images/lookbook/archive-3.jpg",
    "/images/lookbook/archive-4.jpg",
  ],
  "new-chapter": [
    "/images/lookbook/new-chapter.jpg",
  ],
};

export default function Lookbook({ onLookbookClick }) {
  return (
    <section id="lookbook" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-body text-sm text-charcoal/50 uppercase tracking-widest block mb-3">
            Editorial
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal">
            The DASTAN Edit
          </h2>
        </motion.div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {LOOKBOOK_SECTIONS.map((section, index) => {
            const images = LOOKBOOK_IMAGES[section.id] || [];
            const firstImage = images[0];
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={onLookbookClick}
                className={`group relative cursor-pointer overflow-hidden ${
                  index === 0 || index === 3 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                {/* Background Image */}
                {firstImage ? (
                  <img
                    src={firstImage}
                    alt={section.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-warm-beige/40 to-cream/60" />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-700" />
                
                {/* Content */}
                <div className="relative h-64 md:h-80 lg:h-96 flex flex-col items-center justify-end pb-8 px-6 text-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="relative z-10">
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-white mb-1">
                      {section.title}
                    </h3>
                    <p className="font-body text-xs md:text-sm text-white/70 mb-4">
                      {section.subtitle}
                    </p>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 text-white/60 group-hover:text-white font-body text-xs uppercase tracking-widest transition-colors duration-300"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLookbookClick}
            className="group px-8 py-4 border-2 border-charcoal text-charcoal font-body text-sm uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all duration-300"
          >
            View Full Lookbook
            <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}