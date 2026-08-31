"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function OurStory({ onStoryClick }) {
  return (
    <section id="our-story" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-beige/10 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img
              src="/images/lifestyle/hero-2.jpg"
              alt="DASTAN Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
            <div className="absolute inset-0 flex items-end p-8">
              <div className="text-white">
                <span className="font-urdu text-4xl block mb-2">داستان</span>
                <p className="font-display text-lg italic opacity-80">Every Thread, A Story</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="font-body text-sm text-charcoal/50 uppercase tracking-widest block mb-4">
                Our Story
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
                A Young House.<br />
                <span className="italic">An Old Soul.</span>
              </h2>
            </div>

            <div className="space-y-6 font-body text-charcoal/70 leading-relaxed">
              <p>
                DASTAN began with a simple thought: clothing can hold a memory. It can remember the season in which you bought it, the person you became while wearing it, and the places you carried it.
              </p>
              <p>
                Built by Ahmedullah, DASTAN is a young clothing house with an old soul — inspired by Urdu, heritage, quiet confidence and the resilience of anyone building something from the ground up.
              </p>
              <p className="font-display text-xl italic text-charcoal/80">
                We are not here to rush the story.<br />
                We are here to write it, one chapter at a time.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStoryClick}
              className="group flex items-center gap-4 text-charcoal font-body text-sm uppercase tracking-widest"
            >
              <span className="pb-1 border-b border-charcoal group-hover:border-charcoal/50 transition-colors">
                Read the Full Story
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" strokeWidth={2} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}