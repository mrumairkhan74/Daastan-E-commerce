"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="mb-8">
          <span className="font-display text-9xl font-light text-charcoal/10">404</span>
        </div>
        <h1 className="font-display text-3xl text-charcoal mb-4">Page Not Found</h1>
        <p className="font-body text-neutral-500 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white font-body text-sm uppercase tracking-widest hover:bg-charcoal/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-charcoal text-charcoal font-body text-sm uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all"
          >
            <Search className="w-4 h-4" />
            Browse Products
          </Link>
        </div>
        <p className="mt-10 text-sm text-neutral-400">
          Or <Link to="/" className="text-charcoal hover:underline">go back to the previous page</Link>
        </p>
      </motion.div>
    </div>
  );
}