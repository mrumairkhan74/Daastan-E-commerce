"use client";

import { motion } from "framer-motion";
import { Check, Truck, RefreshCw, CreditCard, Sparkles } from "lucide-react";
import { TRUST_BADGES } from "../data/products";

const icons = {
  fabric: Sparkles,
  check: Check,
  exchange: RefreshCw,
  cod: CreditCard,
  batch: Truck,
};

export default function TrustSection() {
  return (
    <section className="py-20 bg-warm-beige/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl text-charcoal font-light">
            Why DASTAN?
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {TRUST_BADGES.map((badge, index) => {
            const Icon = icons[badge.icon] || Check;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md border border-warm-beige/20">
                  <Icon className="w-7 h-7 text-charcoal" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-body text-xs md:text-sm font-medium text-charcoal uppercase tracking-wider mb-1">
                    {badge.title}
                  </h3>
                  <p className="font-body text-xs text-charcoal/50">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}