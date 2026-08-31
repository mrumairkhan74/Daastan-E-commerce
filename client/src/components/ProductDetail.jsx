"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Minus, Plus, ShoppingBag, Ruler, Truck, RefreshCw, Shield } from "lucide-react";
import { useState } from "react";

export default function ProductDetail({ product, isOpen, onClose, onAddToCart, isInWishlist, onWishlistToggle }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showBack, setShowBack] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    onAddToCart({ ...product, selectedSize, quantity });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleClose = () => {
    setSelectedSize(null);
    setQuantity(1);
    setShowBack(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-white z-50 overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm border border-warm-beige/20 rounded-full hover:bg-white hover:border-charcoal/30 transition-all duration-300"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-charcoal" strokeWidth={2} />
            </button>

            {/* Left - Product Gallery */}
            <motion.div
              className="md:w-1/2 bg-warm-beige/5 overflow-hidden relative"
              onClick={() => setShowBack(!showBack)}
            >
              <div className="aspect-square md:aspect-auto md:h-full flex items-center justify-center p-8 cursor-pointer">
                <motion.div
                  animate={{ x: showBack ? "-100%" : 0, opacity: showBack ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center p-8"
                >
                  <div className="relative w-3/4 h-3/4 max-w-[400px] max-h-[500px]">
                    <div 
                      className="absolute inset-0 rounded-t-[8px] shadow-[0_8px_40px_-8px_rgba(0,0,0,0.2)]" 
                      style={{ backgroundColor: product.colorCode }}
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-3 bg-charcoal/20 rounded-b-[4px]" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ x: showBack ? 0 : "100%", opacity: showBack ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center p-8"
                >
                  <div className="relative w-3/4 h-3/4 max-w-[400px] max-h-[500px]">
                    <div 
                      className="absolute inset-0 rounded-t-[8px] shadow-[0_8px_40px_-8px_rgba(0,0,0,0.2)]" 
                      style={{ backgroundColor: product.colorCode }}
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-3 bg-charcoal/20 rounded-b-[4px]" />
                  </div>
                </motion.div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowBack(false); }}
                  className={`w-3 h-3 rounded-full transition-all ${!showBack ? "bg-charcoal scale-125" : "bg-charcoal/30"}`}
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setShowBack(true); }}
                  className={`w-3 h-3 rounded-full transition-all ${showBack ? "bg-charcoal scale-125" : "bg-charcoal/30"}`}
                />
              </div>

              <p className="absolute bottom-4 right-4 text-xs text-charcoal/40 font-body uppercase tracking-wider">
                Click to flip
              </p>
            </motion.div>

            {/* Right - Product Info */}
            <div className="md:w-1/2 overflow-y-auto">
              <div className="p-8 md:p-12 space-y-6">
                {/* Badges */}
                <div className="flex gap-2">
                  {product.badges?.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-charcoal text-white rounded-none"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Title & Price */}
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal mb-2">
                    {product.name}
                  </h2>
                  <p className="font-body text-sm text-charcoal/50 capitalize mb-4">{product.color}</p>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-3xl text-charcoal">
                      PKR {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="font-body text-lg text-charcoal/40 line-through">
                        PKR {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-charcoal/70 leading-relaxed">
                  {product.description}
                </p>

                {/* Color */}
                <div className="space-y-3">
                  <p className="font-body text-sm text-charcoal/50 uppercase tracking-wider">
                    Color: <span className="text-charcoal font-medium">{product.color}</span>
                  </p>
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-lg" 
                    style={{ backgroundColor: product.colorCode }}
                  />
                </div>

                {/* Size Selection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-body text-sm text-charcoal/50 uppercase tracking-wider">
                      Size: {selectedSize && <span className="text-charcoal font-medium">{selectedSize}</span>}
                    </p>
                    <button
                      onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                      className="flex items-center gap-1 text-xs text-charcoal/50 hover:text-charcoal transition-colors font-body uppercase tracking-wider"
                    >
                      <Ruler className="w-3 h-3" strokeWidth={2} />
                      Size Guide
                    </button>
                  </div>

                  {sizeGuideOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <table className="w-full text-sm font-body border border-warm-beige/20">
                        <thead className="bg-warm-beige/10">
                          <tr>
                            <th className="p-2 text-left font-medium">Size</th>
                            <th className="p-2 text-left font-medium">Chest</th>
                            <th className="p-2 text-left font-medium">Length</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-warm-beige/10">
                          <tr><td className="p-2">S</td><td className="p-2">36-38"</td><td className="p-2">28"</td></tr>
                          <tr><td className="p-2">M</td><td className="p-2">38-40"</td><td className="p-2">29"</td></tr>
                          <tr><td className="p-2">L</td><td className="p-2">40-42"</td><td className="p-2">30"</td></tr>
                          <tr><td className="p-2">XL</td><td className="p-2">42-44"</td><td className="p-2">31"</td></tr>
                          <tr><td className="p-2">XXL</td><td className="p-2">44-46"</td><td className="p-2">32"</td></tr>
                        </tbody>
                      </table>
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    {product.sizes?.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 border-2 font-body text-sm uppercase tracking-wider transition-all duration-300 ${
                          selectedSize === size
                            ? "border-charcoal bg-charcoal text-white"
                            : "border-warm-beige/30 text-charcoal hover:border-charcoal/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {!selectedSize && (
                    <p className="text-xs text-red-500 font-body">Please select a size</p>
                  )}
                </div>

                {/* Quantity */}
                <div className="space-y-3">
                  <p className="font-body text-sm text-charcoal/50 uppercase tracking-wider">Quantity</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-warm-beige/30">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 text-charcoal/50 hover:text-charcoal hover:bg-warm-beige/5 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" strokeWidth={2} />
                      </button>
                      <span className="w-12 text-center font-body text-charcoal">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                        className="p-3 text-charcoal/50 hover:text-charcoal hover:bg-warm-beige/5 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                    <span className="text-sm text-charcoal/40 font-body">
                      {product.stockCount} in stock
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className={`flex-1 py-4 font-body text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                      selectedSize
                        ? "bg-charcoal text-white hover:bg-charcoal/90"
                        : "bg-charcoal/30 text-white/50 cursor-not-allowed"
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Shield className="w-4 h-4" strokeWidth={2} />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" strokeWidth={2} />
                        Add to Bag
                      </>
                    )}
                  </motion.button>

                  <button
                    onClick={() => onWishlistToggle(product.id)}
                    className={`p-4 border-2 transition-all duration-300 ${
                      isInWishlist
                        ? "border-charcoal bg-charcoal text-white"
                        : "border-warm-beige/30 text-charcoal hover:border-charcoal"
                    }`}
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} strokeWidth={2} />
                  </button>
                </div>

                {/* Product Details */}
                <div className="space-y-4 pt-6 border-t border-warm-beige/20">
                  <div className="grid grid-cols-2 gap-4 text-sm font-body">
                    <div>
                      <p className="text-charcoal/50 uppercase tracking-wider text-xs mb-1">Fabric</p>
                      <p className="text-charcoal">{product.fabric}</p>
                    </div>
                    <div>
                      <p className="text-charcoal/50 uppercase tracking-wider text-xs mb-1">GSM</p>
                      <p className="text-charcoal">{product.gsm}</p>
                    </div>
                    <div>
                      <p className="text-charcoal/50 uppercase tracking-wider text-xs mb-1">Fit</p>
                      <p className="text-charcoal">{product.fit}</p>
                    </div>
                    <div>
                      <p className="text-charcoal/50 uppercase tracking-wider text-xs mb-1">Stock</p>
                      <p className="text-charcoal">{product.stockCount} units</p>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3 text-sm font-body text-charcoal/70">
                      <Truck className="w-4 h-4" strokeWidth={2} />
                      <span>3-5 business days delivery</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-body text-charcoal/70">
                      <RefreshCw className="w-4 h-4" strokeWidth={2} />
                      <span>Easy 14-day exchange policy</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-body text-charcoal/70">
                      <Shield className="w-4 h-4" strokeWidth={2} />
                      <span>Cash on Delivery available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}