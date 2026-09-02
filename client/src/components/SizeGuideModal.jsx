"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler } from "lucide-react";

export default function SizeGuideModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white z-50 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-warm-beige/20">
              <div className="flex items-center gap-3">
                <Ruler className="w-5 h-5" />
                <h2 className="font-display text-xl">Size Guide</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-warm-beige/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <h3 className="font-display text-lg mb-4">Oversized T-Shirts</h3>
              <table className="w-full text-sm mb-8">
                <thead className="bg-warm-beige/10">
                  <tr>
                    <th className="p-3 text-left font-medium">Size</th>
                    <th className="p-3 text-left font-medium">Chest</th>
                    <th className="p-3 text-left font-medium">Length</th>
                    <th className="p-3 text-left font-medium">Shoulder</th>
                    <th className="p-3 text-left font-medium">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-beige/10">
                  <tr><td className="p-3">S</td><td className="p-3">36-38"</td><td className="p-3">28"</td><td className="p-3">18"</td><td className="p-3">24"</td></tr>
                  <tr><td className="p-3">M</td><td className="p-3">38-40"</td><td className="p-3">29"</td><td className="p-3">19"</td><td className="p-3">25"</td></tr>
                  <tr><td className="p-3">L</td><td className="p-3">40-42"</td><td className="p-3">30"</td><td className="p-3">20"</td><td className="p-3">26"</td></tr>
                  <tr><td className="p-3">XL</td><td className="p-3">42-44"</td><td className="p-3">31"</td><td className="p-3">21"</td><td className="p-3">27"</td></tr>
                  <tr><td className="p-3">XXL</td><td className="p-3">44-46"</td><td className="p-3">32"</td><td className="p-3">22"</td><td className="p-3">28"</td></tr>
                </tbody>
              </table>

              <h3 className="font-display text-lg mb-4">How to Measure</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-charcoal/70">
                <div>
                  <p className="font-medium text-charcoal mb-2">Chest</p>
                  <p>Measure around the fullest part of your chest, keeping the tape horizontal.</p>
                </div>
                <div>
                  <p className="font-medium text-charcoal mb-2">Length</p>
                  <p>Measure from the highest point of the shoulder to the bottom hem.</p>
                </div>
                <div>
                  <p className="font-medium text-charcoal mb-2">Shoulder</p>
                  <p>Measure from one shoulder seam to the other across the back.</p>
                </div>
                <div>
                  <p className="font-medium text-charcoal mb-2">Sleeve</p>
                  <p>Measure from the shoulder seam to the end of the sleeve.</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-warm-beige/10">
                <p className="text-sm text-charcoal/70">
                  <strong className="text-charcoal">Tip:</strong> Our shirts have an oversized fit. If you prefer a more fitted look, consider sizing down.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}