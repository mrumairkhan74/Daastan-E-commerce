"use client";

import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag, Tag } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product, onQuickView, onAddToCart, onWishlistToggle, isInWishlist }) {
  const [showBack, setShowBack] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const badgeColors = {
    NEW: "bg-charcoal text-white",
    LIMITED: "bg-champagne text-charcoal",
    BESTSELLER: "bg-olive text-white",
    "LAST FEW": "bg-cocoa text-white",
  };

  const isJewelry = product.category === 'jewelry';
  const frontImage = isJewelry 
    ? `/images/jewelry/${product.id}.jpg` 
    : (product.images?.front || `/images/shirts/${product.id}-front.jpg`);
  const backImage = isJewelry 
    ? null 
    : (product.images?.back || `/images/shirts/${product.id}-back.jpg`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white border border-warm-beige/20 overflow-hidden transition-all duration-500 hover:shadow-xl"
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-warm-beige/10">
        {/* Front Image */}
        <motion.div
          initial={false}
          animate={{ x: showBack ? "-100%" : 0, opacity: showBack ? 0 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {!imageError ? (
            <img
              src={frontImage}
              alt={`${product.name} - Front`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-warm-beige/20">
              <div 
                className="w-3/4 h-3/4 rounded-none shadow-md" 
                style={{ backgroundColor: product.colorCode || "#E8E0D0" }}
              />
            </div>
          )}
        </motion.div>

        {/* Back Image - only for shirts */}
        {!isJewelry && backImage && (
          <motion.div
            initial={false}
            animate={{ x: showBack ? 0 : "100%", opacity: showBack ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {!imageError ? (
              <img
                src={backImage}
                alt={`${product.name} - Back`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-warm-beige/20">
                <div
                  className="w-3/4 h-3/4 rounded-none shadow-md"
                  style={{ backgroundColor: product.colorCode || "#E8E0D0" }}
                />
              </div>
            )}
          </motion.div>
        )}

        {/* Hover to see back - only for shirts */}
        {!isJewelry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBack(!showBack)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-warm-beige/20 text-charcoal/70 text-xs uppercase tracking-widest font-body rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-charcoal hover:border-charcoal/30"
          >
            {showBack ? "VIEW FRONT" : "VIEW BACK"}
          </motion.button>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badges?.map((badge) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-none ${badgeColors[badge] || "bg-charcoal text-white"}`}
            >
              {badge}
            </motion.span>
          ))}
        </div>

        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); onWishlistToggle(product.id); }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm border border-warm-beige/20 text-charcoal/60 rounded-full hover:bg-white hover:text-charcoal hover:border-charcoal/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} strokeWidth={2} />
        </motion.button>

        {/* Quick View */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
          className="absolute bottom-4 right-3 p-2 bg-white/90 backdrop-blur-sm border border-warm-beige/20 text-charcoal/60 rounded-full hover:bg-white hover:text-charcoal hover:border-charcoal/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <Eye className="w-5 h-5" strokeWidth={2} />
        </motion.button>

        {/* Color indicator */}
        <div className="absolute bottom-3 left-3 flex gap-1">
          <div 
            className="w-3 h-3 rounded-full border border-warm-beige/30 shadow-sm" 
            style={{ backgroundColor: product.colorCode }}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <motion.div
          initial={false}
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <p className="font-display text-lg font-medium text-charcoal tracking-tight leading-snug">
            {product.name}
          </p>
          <p className="font-body text-sm text-charcoal/50 capitalize">{product.color}</p>
        </motion.div>

        <div className="flex items-center gap-3 text-sm text-charcoal/50 font-body border-t border-warm-beige/20 pt-3">
          <span className="flex items-center gap-1">
            <Tag className="w-3 h-3" strokeWidth={2} />
            {product.gsm} • {product.fabric}
          </span>
          <span className="text-charcoal/30">•</span>
          <span>{product.fit}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-medium text-charcoal">
            PKR {product.price.toLocaleString()}
            {product.originalPrice && (
              <span className="font-body text-sm text-charcoal/40 line-through ml-2">
                PKR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="px-4 py-2 bg-charcoal text-white font-body text-xs uppercase tracking-widest hover:bg-charcoal/90 transition-colors rounded-none"
          >
            <ShoppingBag className="w-4 h-4 mr-2 inline-block" strokeWidth={2} />
            ADD TO BAG
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}