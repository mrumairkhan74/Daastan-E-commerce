"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
  return (
    <section className="relative py-32 bg-charcoal text-white overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0Z' fill='none' stroke='%23ffffff' strokeWidth='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "100px 100px"
      }} />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Main Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          {/* Urdu text */}
          <span className="font-urdu text-4xl md:text-6xl lg:text-7xl font-light text-white/80 block leading-relaxed">
            قبل از آن که ایک میراث ہوتا، ایک شروعات ہوتی
          </span>

          {/* English translation */}
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white leading-relaxed tracking-wide">
            "Before there was a legacy,<br />
            <span className="italic">there was a beginning."</span>
          </p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-px h-20 bg-white/20 mx-auto"
          />

          {/* Secondary text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-4 font-body text-white/60 text-lg"
          >
            <p>For the ones still becoming.</p>
            <p>For the ones building quietly.</p>
            <p>For every person whose struggle is part of the story.</p>
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
            className="pt-12"
          >
            <span className="font-display text-xl tracking-widest text-white/40">
              DASTAN — داستان
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}