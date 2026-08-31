"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, ChevronDown, Loader2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";
import { FILTER_COLORS, SORT_OPTIONS } from "../data/products";

export default function ProductGrid({ 
  products, 
  onQuickView, 
  onAddToCart, 
  onWishlistToggle, 
  wishlist,
  title,
  subtitle,
  showFilters = true,
  className = ""
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.color.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Color filter
    if (selectedColor !== "all") {
      result = result.filter(p => p.id === selectedColor || 
        (p.id && p.id.includes(selectedColor)) ||
        p.color.toLowerCase().includes(selectedColor.replace("-", " "))
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result = [...result].reverse();
        break;
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default:
        // featured - keep original order
        break;
    }

    return result;
  }, [products, searchQuery, selectedColor, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedColor("all");
    setSortBy("featured");
  };

  const hasActiveFilters = searchQuery || selectedColor !== "all" || sortBy !== "featured";

  return (
    <section className={`${className}`} aria-label={title}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="font-body text-sm text-charcoal/50 uppercase tracking-widest block mb-3">
            {subtitle}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal tracking-tight leading-tight">
            {title}
          </h2>
        </motion.div>

        {/* Search & Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/30" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-warm-beige/20 text-charcoal placeholder-charcoal/40 font-body text-sm focus:outline-none focus:border-charcoal/50 focus:ring-1 focus:ring-charcoal/20 transition-all duration-300"
                  aria-label="Search products"
                />
                {searchQuery && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" strokeWidth={2} />
                  </motion.button>
                )}
              </div>

              {/* Filters & Sort */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Color Filter */}
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-4 py-3 bg-white border border-warm-beige/20 text-charcoal font-body text-sm hover:border-charcoal/30 transition-all duration-300"
                    aria-expanded={isFilterOpen}
                    aria-label="Filter by color"
                  >
                    <Filter className="w-4 h-4" strokeWidth={2} />
                    <span>Color</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} strokeWidth={2} />
                  </button>

                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white border border-warm-beige/20 shadow-lg rounded-none py-2 z-50"
                        role="listbox"
                        aria-label="Color options"
                      >
                        {FILTER_COLORS.map((color) => (
                          <button
                            key={color.id}
                            onClick={() => { setSelectedColor(color.id); setIsFilterOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-2 text-left font-body text-sm transition-colors ${
                              selectedColor === color.id ? "bg-charcoal text-white" : "text-charcoal/70 hover:bg-warm-beige/10"
                            }`}
                            role="option"
                            aria-selected={selectedColor === color.id}
                          >
                            <span 
                              className="w-5 h-5 rounded-full border border-warm-beige/30 flex-shrink-0" 
                              style={{ backgroundColor: color.color || "transparent" }}
                            />
                            <span className="capitalize">{color.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-3 pr-10 bg-white border border-warm-beige/20 text-charcoal font-body text-sm hover:border-charcoal/30 focus:outline-none focus:border-charcoal/50 transition-all duration-300 cursor-pointer"
                    aria-label="Sort products"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40 pointer-events-none" strokeWidth={2} />
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-white border border-warm-beige/20 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-none transition-colors ${viewMode === "grid" ? "bg-charcoal text-white" : "text-charcoal/50 hover:text-charcoal"}`}
                    aria-label="Grid view"
                    aria-pressed={viewMode === "grid"}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-none transition-colors ${viewMode === "list" ? "bg-charcoal text-white" : "text-charcoal/50 hover:text-charcoal"}`}
                    aria-label="List view"
                    aria-pressed={viewMode === "list"}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <rect x="3" y="3" width="18" height="5" rx="1" />
                      <rect x="3" y="12" width="18" height="5" rx="1" />
                      <rect x="3" y="21" width="18" height="5" rx="1" />
                    </svg>
                  </button>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="px-4 py-3 border border-charcoal/30 text-charcoal/60 font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300"
                  >
                    Clear
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex items-center justify-between"
        >
          <p className="font-body text-sm text-charcoal/50">
            Showing <span className="font-medium text-charcoal">{filteredProducts.length}</span> of {products.length} products
          </p>
          {hasActiveFilters && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 bg-champagne/20 text-champagne/90 font-body text-xs uppercase tracking-wider rounded-none"
            >
              Filters active
            </motion.span>
          )}
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  onWishlistToggle={onWishlistToggle}
                  isInWishlist={wishlist.includes(product.id)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Search className="w-16 h-16 mx-auto text-charcoal/20 mb-6" strokeWidth={1.5} />
              <h3 className="font-display text-2xl text-charcoal/60 mb-2">No products found</h3>
              <p className="font-body text-charcoal/40 mb-6">Try adjusting your search or filters</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-6 py-3 border border-charcoal/30 text-charcoal font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}