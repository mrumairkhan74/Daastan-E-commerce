"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { REVIEWS } from "../data/products";

export default function Reviews() {
  return (
    <section className="py-24 bg-warm-beige/5">
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
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal">
            What They're Saying
          </h2>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 border border-warm-beige/20 shadow-sm relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-warm-beige/40" strokeWidth={1.5} />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-champagne fill-current" : "text-warm-beige/30"}`}
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="font-body text-charcoal/80 leading-relaxed mb-6 italic">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-charcoal/10 flex items-center justify-center">
                  <span className="font-display text-sm text-charcoal">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-charcoal">{review.name}</p>
                  <p className="font-body text-xs text-charcoal/50">{review.location}</p>
                </div>
              </div>

              {/* Verified badge */}
              {review.verified && (
                <span className="absolute bottom-6 right-6 text-xs text-olive font-body uppercase tracking-wider">
                  Verified
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Demo notice */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs text-charcoal/30 font-body mt-12 italic"
        >
          * Demo reviews for illustration purposes. These are not verified customer reviews.
        </motion.p>
      </div>
    </section>
  );
}