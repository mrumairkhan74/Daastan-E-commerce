"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, Grid, List, ChevronDown, ChevronUp } from "lucide-react";
import { SHIRT_PRODUCTS, JEWELRY_PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const FILTER_COLORS = [
  { id: "ivory", label: "Ivory", color: "#FFFFF0" },
  { id: "black", label: "Black", color: "#1A1A1A" },
  { id: "grey", label: "Grey", color: "#8A8A8A" },
  { id: "navy", label: "Navy Blue", color: "#1B2A4A" },
  { id: "pink", label: "Baby Pink", color: "#F4C2C2" },
  { id: "olive", label: "Olive", color: "#6B8E5C" },
  { id: "cocoa", label: "Cocoa", color: "#5D4E37" },
];

const PRICE_RANGES = [
  { id: "all", label: "All Prices", min: 0, max: Infinity },
  { id: "0-1500", label: "Under Rs. 1,500", min: 0, max: 1500 },
  { id: "1500-3000", label: "Rs. 1,500 - 3,000", min: 1500, max: 3000 },
  { id: "3000+", label: "Rs. 3,000+", min: 3000, max: Infinity },
];

const SIZES = ["S", "M", "L", "XL", "XXL"];

const COLLECTIONS = [
  { id: "all", label: "All Collections" },
  { id: "first-chapter", label: "First Chapter" },
  { id: "dastan-jewelry", label: "DASTAN Jewelry" },
];

const BADGES = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "bestseller", label: "Best Seller" },
  { id: "limited", label: "Limited" },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    color: true,
    size: true,
    collection: false,
    badge: false,
  });

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const category = searchParams.get("category") || "all";
  const collection = searchParams.get("collection") || "all";
  const badge = searchParams.get("badge") || "all";
  const sort = searchParams.get("sort") || "featured";
  const colorFilter = searchParams.get("color") || "all";
  const priceRange = searchParams.get("price") || "all";
  const sizeFilter = searchParams.get("size") || "all";

  const allProducts = [...SHIRT_PRODUCTS, ...JEWELRY_PRODUCTS];

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (collection !== "all") {
      result = result.filter((p) => p.collection === collection);
    }

    if (badge !== "all") {
      const badgeMap = { new: "NEW", bestseller: "BESTSELLER", limited: "LIMITED" };
      result = result.filter((p) => p.badges?.includes(badgeMap[badge]));
    }

    if (colorFilter !== "all") {
      result = result.filter(
        (p) => p.color?.toLowerCase().includes(colorFilter) || p.colorCode === colorFilter
      );
    }

    if (priceRange !== "all") {
      const range = PRICE_RANGES.find((r) => r.id === priceRange);
      if (range) {
        result = result.filter((p) => p.price >= range.min && p.price < range.max);
      }
    }

    if (sizeFilter !== "all" && category === "shirts") {
      result = result.filter((p) => p.sizes?.includes(sizeFilter));
    }

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
  }, [category, collection, badge, colorFilter, priceRange, sizeFilter, sort]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
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

  const hasActiveFilters =
    category !== "all" ||
    collection !== "all" ||
    badge !== "all" ||
    colorFilter !== "all" ||
    priceRange !== "all" ||
    sizeFilter !== "all";

  const activeFilterCount = [
    category !== "all",
    collection !== "all",
    badge !== "all",
    colorFilter !== "all",
    priceRange !== "all",
    sizeFilter !== "all",
  ].filter(Boolean).length;

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-neutral-200 pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left py-2"
      >
        <span className="font-body text-sm font-medium text-charcoal uppercase tracking-wider">
          {title}
        </span>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-4 h-4 text-neutral-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        )}
      </button>
      <AnimatePresence>
        {expandedSections[sectionKey] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const FilterPanel = () => (
    <div className="space-y-4">
      <FilterSection title="Categories" sectionKey="category">
        <div className="space-y-1">
          {["all", "shirts", "jewelry"].map((cat) => (
            <button
              key={cat}
              onClick={() => updateFilter("category", cat)}
              className={`block w-full text-left py-1.5 px-2 text-sm rounded transition-colors ${
                category === cat
                  ? "bg-charcoal text-white"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {cat === "all" ? "All Products" : cat === "shirts" ? "Oversized Tees" : "Jewelry"}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price" sectionKey="price">
        <div className="space-y-1">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              onClick={() => updateFilter("price", range.id)}
              className={`block w-full text-left py-1.5 px-2 text-sm rounded transition-colors ${
                priceRange === range.id
                  ? "bg-charcoal text-white"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Colors" sectionKey="color">
        <div className="flex flex-wrap gap-2">
          {FILTER_COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => updateFilter("color", color.id)}
              className={`w-9 h-9 rounded-full border-2 transition-all ${
                colorFilter === color.id
                  ? "border-charcoal scale-110 shadow-md"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: color.color }}
              title={color.label}
            />
          ))}
        </div>
      </FilterSection>

      {category === "shirts" && (
        <FilterSection title="Size" sectionKey="size">
          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => updateFilter("size", size)}
                className={`w-10 h-10 text-sm font-medium border transition-colors ${
                  sizeFilter === size
                    ? "bg-charcoal text-white border-charcoal"
                    : "border-neutral-300 hover:border-charcoal"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      <FilterSection title="Collection" sectionKey="collection">
        <div className="space-y-1">
          {COLLECTIONS.map((col) => (
            <button
              key={col.id}
              onClick={() => updateFilter("collection", col.id)}
              className={`block w-full text-left py-1.5 px-2 text-sm rounded transition-colors ${
                collection === col.id
                  ? "bg-charcoal text-white"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Availability" sectionKey="badge">
        <div className="space-y-1">
          {BADGES.map((b) => (
            <button
              key={b.id}
              onClick={() => updateFilter("badge", b.id)}
              className={`block w-full text-left py-1.5 px-2 text-sm rounded transition-colors ${
                badge === b.id
                  ? "bg-charcoal text-white"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="bg-warm-beige/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl text-charcoal"
          >
            {category === "shirts"
              ? "Oversized Tees"
              : category === "jewelry"
              ? "Jewelry"
              : "Shop All"}
          </motion.h1>
          <p className="font-body text-charcoal/50 mt-2">
            {filteredProducts.length} products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <FilterPanel />

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

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 text-sm font-body px-3 py-2 border border-neutral-300"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>

              {hasActiveFilters && (
                <div className="hidden md:flex items-center gap-2 flex-wrap">
                  {category !== "all" && (
                    <span className="text-xs bg-neutral-100 px-2 py-1 rounded flex items-center gap-1">
                      {category}
                      <button onClick={() => updateFilter("category", "all")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {collection !== "all" && (
                    <span className="text-xs bg-neutral-100 px-2 py-1 rounded flex items-center gap-1">
                      {COLLECTIONS.find((c) => c.id === collection)?.label}
                      <button onClick={() => updateFilter("collection", "all")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {badge !== "all" && (
                    <span className="text-xs bg-neutral-100 px-2 py-1 rounded flex items-center gap-1">
                      {BADGES.find((b) => b.id === badge)?.label}
                      <button onClick={() => updateFilter("badge", "all")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {colorFilter !== "all" && (
                    <span className="text-xs bg-neutral-100 px-2 py-1 rounded flex items-center gap-1">
                      {FILTER_COLORS.find((c) => c.id === colorFilter)?.label}
                      <button onClick={() => updateFilter("color", "all")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {priceRange !== "all" && (
                    <span className="text-xs bg-neutral-100 px-2 py-1 rounded flex items-center gap-1">
                      {PRICE_RANGES.find((r) => r.id === priceRange)?.label}
                      <button onClick={() => updateFilter("price", "all")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 ml-auto">
                <select
                  value={sort}
                  onChange={(e) => updateFilter("sort", e.target.value)}
                  className="px-3 py-2 border border-neutral-300 font-body text-sm focus:outline-none focus:border-charcoal"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                <div className="hidden md:flex items-center gap-1 border border-neutral-300">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-neutral-100" : ""}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-neutral-100" : ""}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden overflow-hidden mb-6"
                >
                  <div className="border border-neutral-200 p-4">
                    <FilterPanel />
                    <button
                      onClick={() => setShowFilters(false)}
                      className="mt-4 w-full py-2 bg-charcoal text-white text-sm"
                    >
                      Show {filteredProducts.length} Results
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="font-display text-xl text-charcoal/60 mb-2">No products found</h3>
                <p className="font-body text-sm text-charcoal/40 mb-4">
                  Try adjusting your filters
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm underline text-charcoal/60 hover:text-charcoal"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard
                      product={product}
                      onQuickView={(p) => (window.location.href = `/product/${p.id}`)}
                      onAddToCart={(p) => {
                        const size = p.sizes?.[1] || p.sizes?.[0];
                        if (size) addToCart(p, size, 1);
                      }}
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
