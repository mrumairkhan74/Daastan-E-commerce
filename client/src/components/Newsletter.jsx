"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setSubmitted(true);
    setEmail("");
    setError("");
  };

  return (
    <section className="py-24 bg-charcoal text-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light">
            Join the Story
          </h2>
          <p className="font-body text-white/60 text-lg">
            Be the first to enter the next chapter.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/40 font-body text-sm focus:outline-none focus:border-white/40 transition-colors"
                  />
                  {error && (
                    <p className="absolute -bottom-6 left-0 text-xs text-red-400 font-body">{error}</p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-4 bg-white text-charcoal font-body text-sm uppercase tracking-widest hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Join DASTAN</span>
                  <Send className="w-4 h-4" strokeWidth={2} />
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-4"
            >
              <Check className="w-5 h-5 text-green-400" strokeWidth={2} />
              <p className="font-body text-lg text-white/80">Welcome to the story.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}