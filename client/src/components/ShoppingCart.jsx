"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";

export default function ShoppingCart({ isOpen, onClose, cart, updateQuantity, removeFromCart, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppOrder = () => {
    const itemsList = cart.map(item => 
      `• ${item.name} (${item.selectedSize || 'N/A'}) x${item.quantity} - PKR ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = encodeURIComponent(
      `🛒 *DASTAN Order*\n\n${itemsList}\n\n*Subtotal: PKR ${subtotal.toLocaleString()}*\n\nLooking forward to my order!`
    );

    window.open(`https://wa.me/923XXXXXXXXX?text=${message}`, '_blank');
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
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-warm-beige/20">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-charcoal" strokeWidth={2} />
                <h2 className="font-display text-xl text-charcoal">Your Bag</h2>
                <span className="px-2 py-0.5 bg-charcoal text-white text-xs font-body rounded-full">
                  {itemCount}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-warm-beige/10 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-charcoal" strokeWidth={2} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-charcoal/20 mb-4" strokeWidth={1.5} />
                  <h3 className="font-display text-xl text-charcoal/60 mb-2">Your bag is empty</h3>
                  <p className="font-body text-sm text-charcoal/40 mb-6">
                    Looks like you haven't added anything yet.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-6 py-3 bg-charcoal text-white font-body text-sm uppercase tracking-wider hover:bg-charcoal/90 transition-colors"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.selectedSize}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 pb-6 border-b border-warm-beige/10 last:border-0"
                      >
                        {/* Product Image */}
                        <div 
                          className="w-24 h-32 rounded-none shadow-md flex-shrink-0" 
                          style={{ backgroundColor: item.colorCode || "#E8E0D0" }}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-xs text-charcoal/30 font-display">DASTAN</span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-display text-base text-charcoal mb-1">{item.name}</h4>
                            <p className="font-body text-xs text-charcoal/50 capitalize mb-2">
                              {item.color} • Size: {item.selectedSize || 'N/A'}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity */}
                            <div className="flex items-center border border-warm-beige/30">
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedSize, Math.max(1, item.quantity - 1))}
                                className="p-1.5 text-charcoal/50 hover:text-charcoal transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" strokeWidth={2} />
                              </button>
                              <span className="w-8 text-center font-body text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedSize, Math.min(item.stockCount, item.quantity + 1))}
                                className="p-1.5 text-charcoal/50 hover:text-charcoal transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" strokeWidth={2} />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="font-display text-base text-charcoal">
                              PKR {(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="flex items-center gap-1 text-xs text-charcoal/40 hover:text-red-500 transition-colors font-body uppercase tracking-wider mt-2"
                          >
                            <Trash2 className="w-3 h-3" strokeWidth={2} />
                            Remove
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-warm-beige/20 bg-white space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-charcoal/60 uppercase tracking-wider">Subtotal</span>
                  <span className="font-display text-2xl text-charcoal">PKR {subtotal.toLocaleString()}</span>
                </div>

                <p className="font-body text-xs text-charcoal/40">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Actions */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCheckout}
                    className="w-full py-4 bg-charcoal text-white font-body text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-charcoal/90 transition-colors"
                  >
                    Checkout
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsAppOrder}
                    className="w-full py-4 bg-green-500 text-white font-body text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                  >
                    Order via WhatsApp
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full py-3 border border-charcoal/20 text-charcoal/60 font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}