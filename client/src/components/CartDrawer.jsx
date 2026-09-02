"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { items, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = cartTotal > 5000 ? 0 : 250;

  const handleWhatsAppOrder = () => {
    const itemsList = items.map(item => 
      `• ${item.name} (${item.selectedSize || 'N/A'}) x${item.quantity} - PKR ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = encodeURIComponent(
      `🛒 *DASTAN Order*\n\n${itemsList}\n\n*Subtotal: PKR ${cartTotal.toLocaleString()}*\n*Shipping: PKR ${shipping}\n*Total: PKR ${(cartTotal + shipping).toLocaleString()}*\n\nLooking forward to my order!`
    );

    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${message}`, '_blank');
  };

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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-warm-beige/20">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-display text-xl">Shopping Bag</h2>
                <span className="px-2 py-0.5 bg-charcoal text-white text-xs rounded-full">
                  {cartCount}
                </span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-warm-beige/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-charcoal/20 mb-4" />
                  <h3 className="font-display text-xl text-charcoal/60 mb-2">Your bag is empty</h3>
                  <p className="font-body text-sm text-charcoal/40 mb-6">
                    Add items to start shopping
                  </p>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="px-6 py-3 bg-charcoal text-white text-sm uppercase tracking-wider hover:bg-charcoal/90 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 pb-6 border-b border-warm-beige/10 last:border-0">
                      <Link to={`/product/${item.id}`} onClick={onClose}>
                        <div 
                          className="w-20 h-24 rounded-none shadow-md flex-shrink-0" 
                          style={{ backgroundColor: item.colorCode || "#E8E0D0" }}
                        />
                      </Link>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <Link 
                            to={`/product/${item.id}`} 
                            onClick={onClose}
                            className="font-display text-sm text-charcoal hover:text-charcoal/70 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="font-body text-xs text-charcoal/50 mt-1">
                            {item.color} • Size: {item.selectedSize || 'N/A'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-warm-beige/30">
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                              className="p-1.5 text-charcoal/50 hover:text-charcoal"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-body text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                              className="p-1.5 text-charcoal/50 hover:text-charcoal"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-display text-sm">
                            PKR {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="flex items-center gap-1 text-xs text-charcoal/40 hover:text-red-500 transition-colors mt-2"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-warm-beige/20 bg-white space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-charcoal/60 uppercase tracking-wider">Subtotal</span>
                  <span className="font-display text-xl">PKR {cartTotal.toLocaleString()}</span>
                </div>
                <p className="font-body text-xs text-charcoal/40">
                  Shipping calculated at checkout
                </p>

                <div className="space-y-2">
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="block w-full py-4 bg-charcoal text-white text-center font-body text-sm uppercase tracking-widest hover:bg-charcoal/90 transition-colors"
                  >
                    Checkout
                  </Link>
                  
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-4 bg-green-500 text-white font-body text-sm uppercase tracking-widest hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order via WhatsApp
                  </button>

                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="block w-full py-3 border border-charcoal/20 text-charcoal/60 text-center font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white transition-all"
                  >
                    View Full Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}