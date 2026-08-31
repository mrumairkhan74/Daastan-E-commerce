"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ALL_PRODUCTS } from "../data/products";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = ALL_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.color.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      (p.description && p.description.toLowerCase().includes(searchTerm)) ||
      (p.material && p.material.toLowerCase().includes(searchTerm)) ||
      (p.style && p.style.toLowerCase().includes(searchTerm))
    );
    setResults(filtered);
  }, [query]);

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  const handleResultClick = () => {
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl mx-4 shadow-2xl"
          >
            {/* Search Input */}
            <div className="flex items-center border-b border-warm-beige/20">
              <Search className="w-6 h-6 text-charcoal/30 ml-6 flex-shrink-0" strokeWidth={2} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 px-4 py-6 font-body text-lg text-charcoal placeholder-charcoal/30 focus:outline-none"
              />
              <button
                onClick={handleClose}
                className="p-4 text-charcoal/40 hover:text-charcoal transition-colors"
                aria-label="Close search"
              >
                <X className="w-6 h-6" strokeWidth={2} />
              </button>
            </div>

            {/* Results */}
            {query && (
              <div className="max-h-96 overflow-y-auto">
                {results.length > 0 ? (
                  <div className="p-4">
                    <p className="font-body text-xs text-charcoal/50 uppercase tracking-wider mb-4 px-2">
                      {results.length} result{results.length !== 1 ? "s" : ""} found
                    </p>
                    <div className="space-y-2">
                      {results.map((product) => (
                        <motion.a
                          key={product.id}
                          href={`#${product.category === 'shirts' ? 'shop' : 'jewelry'}`}
                          onClick={handleResultClick}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-4 p-3 hover:bg-warm-beige/10 transition-colors group"
                        >
                          <div 
                            className="w-12 h-16 rounded-none shadow-sm flex-shrink-0" 
                            style={{ backgroundColor: product.colorCode || "#E8E0D0" }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-sm text-charcoal group-hover:text-charcoal/70 transition-colors truncate">
                              {product.name}
                            </p>
                            <p className="font-body text-xs text-charcoal/50 truncate">
                              {product.color} • PKR {product.price.toLocaleString()}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-charcoal/30 group-hover:text-charcoal group-hover:translate-x-1 transition-all" strokeWidth={2} />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Search className="w-12 h-12 text-charcoal/20 mx-auto mb-4" strokeWidth={1.5} />
                    <p className="font-display text-lg text-charcoal/60 mb-2">No results found</p>
                    <p className="font-body text-sm text-charcoal/40">
                      Try searching for "black", "navy", "jewelry", or "ring"
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Popular Searches */}
            {!query && (
              <div className="p-6">
                <p className="font-body text-xs text-charcoal/50 uppercase tracking-wider mb-4">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {["black", "navy", "ivory", "jewelry", "ring", "chain", "oversized"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-warm-beige/10 hover:bg-warm-beige/20 text-charcoal/70 hover:text-charcoal font-body text-sm transition-colors rounded-none capitalize"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            {!query && (
              <div className="p-6 border-t border-warm-beige/20">
                <p className="font-body text-xs text-charcoal/50 uppercase tracking-wider mb-4">
                  Quick Links
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#shop" onClick={handleClose} className="font-body text-sm text-charcoal/70 hover:text-charcoal transition-colors">
                    Shop All
                  </a>
                  <a href="#jewelry" onClick={handleClose} className="font-body text-sm text-charcoal/70 hover:text-charcoal transition-colors">
                    Jewelry
                  </a>
                  <a href="#our-story" onClick={handleClose} className="font-body text-sm text-charcoal/70 hover:text-charcoal transition-colors">
                    Our Story
                  </a>
                  <a href="#lookbook" onClick={handleClose} className="font-body text-sm text-charcoal/70 hover:text-charcoal transition-colors">
                    Lookbook
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}