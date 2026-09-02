"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, Grid, List } from "lucide-react";
import { SHIRT_PRODUCTS, JEWELRY_PRODUCTS, FILTER_COLORS } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { success } = useToast();

  const category = searchParams.get("category") || "all";
  const collection = searchParams.get("collection");
  const badge = searchParams.get("badge");
  const sort = searchParams.get("sort") || "featured";
  const colorFilter = searchParams.get("color") || "all";
  const search = searchParams.get("search") || "";

  const allProducts = [...SHIRT_PRODUCTS, ...JEWELRY_PRODUCTS];

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Category filter
    if (category === "shirts") result = result.filter(p => p.category === "shirts");
    if (category === "jewelry") result = result.filter(p => p.category === "jewelry");

    // Collection filter
    if (collection === "first-chapter") result = result.filter(p => p.collection === "first-chapter");

    // Badge filter
    if (badge === "bestseller") result = result.filter(p => p.badges?.includes("BESTSELLER"));
    if (badge === "new") result = result.filter(p => p.badges?.includes("NEW"));
    if (badge === "limited") result = result.filter(p => p.badges?.includes("LIMITED"));

    // Color filter
    if (colorFilter !== "all") {
      result = result.filter(p => 
        p.id === colorFilter || p.color.toLowerCase().includes(colorFilter.replace("-", " "))
      );
    }

    // Search filter
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.color.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sort) {
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
        break;
    }

    return result;
  }, [category, collection, badge, colorFilter, sort, search]);

  const handleQuickView = (product) => {
    window.location.href = `/product/${product.id}`;
  };

  const handleAddToCart = (product) => {
    const size = product.sizes?.[1] || product.sizes?.[0];
    if (!size) return;
    addToCart(product, size, 1);
    success(`${product.name} added to bag!`);
  };

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all" || value === "featured" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = category !== "all" || collection || badge || colorFilter !== "all" || search || sort !== "featured";

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-warm-beige/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl text-charcoal"
          >
            {category === "shirts" ? "Oversized Tees" : 
             category === "jewelry" ? "Jewelry" : 
             "Shop All"}
          </motion.h1>
          <p className="font-body text-charcoal/50 mt-2">
            {filteredProducts.length} products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="font-body text-sm font-medium text-charcoal uppercase tracking-wider mb-4">Categories</h3>
                <div className="space-y-2">
                  {["all", "shirts", "jewelry"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => updateFilter("category", cat)}
                      className={`block w-full text-left py-2 font-body text-sm capitalize ${
                        category === cat ? "text-charcoal font-medium" : "text-charcoal/60 hover:text-charcoal"
                      }`}
                    >
                      {cat === "all" ? "All Products" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-body text-sm font-medium text-charcoal uppercase tracking-wider mb-4">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {FILTER_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => updateFilter("color", color.id)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        colorFilter === color.id ? "border-charcoal scale-110" : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.color || "#E8E0D0" }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-body text-sm font-medium text-charcoal uppercase tracking-wider mb-4">Sort By</h3>
                <select
                  value={sort}
                  onChange={(e) => updateFilter("sort", e.target.value)}
                  className="w-full px-3 py-2 border border-warm-beige/30 font-body text-sm focus:outline-none focus:border-charcoal"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-charcoal/50 hover:text-charcoal underline"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-body"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <select
              value={sort}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="px-3 py-2 border border-warm-beige/30 font-body text-sm"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low</option>
              <option value="price-high">Price: High</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="font-display text-xl text-charcoal/60 mb-2">No products found</h3>
                <p className="font-body text-sm text-charcoal/40 mb-4">Try adjusting your filters</p>
                <button onClick={clearFilters} className="text-sm underline text-charcoal/60 hover:text-charcoal">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-2 md:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard
                      product={product}
                      onQuickView={handleQuickView}
                      onAddToCart={handleAddToCart}
                      onWishlistToggle={toggleWishlist}
                      isInWishlist={isInWishlist(product.id)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}