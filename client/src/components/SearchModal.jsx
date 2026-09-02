"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { SHIRT_PRODUCTS, JEWELRY_PRODUCTS } from "../data/products";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const allProducts = [...SHIRT_PRODUCTS, ...JEWELRY_PRODUCTS];
    const searchTerm = query.toLowerCase();

    const filtered = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.color?.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-2xl mx-4 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-neutral-200">
          <Search className="w-5 h-5 text-neutral-400 ml-5" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-5 text-lg outline-none placeholder:text-neutral-400"
          />
          <button
            onClick={onClose}
            className="p-4 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="px-5 py-3 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </div>
            <div className="border-t border-neutral-100">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center justify-between px-5 py-4 hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm tracking-wide">
                      {product.name}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {product.color || product.material} · Rs. {product.price.toLocaleString()}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-600 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="px-5 py-12 text-center text-neutral-500">
            <p>No products found for "{query}"</p>
            <p className="text-sm mt-2">Try searching for "Chapter", "Ring", "Chain", or "Shirt"</p>
          </div>
        )}

        {!query.trim() && (
          <div className="px-5 py-8">
            <div className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-3">
              Popular Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {["Chapter I", "Chapter III", "Ring", "Chain", "Pearl", "Oversized"].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 text-sm border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
