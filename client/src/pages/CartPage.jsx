"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { BRAND_CONFIG } from "../data/products";

export default function CartPage() {
  const { items, cartTotal, updateQuantity, removeFromCart } = useCart();
  const { success } = useToast();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = cartTotal > 5000 ? 0 : 250;
  const total = cartTotal + shipping;

  const handleWhatsAppOrder = () => {
    const itemsList = items.map(item => 
      `• ${item.name} (${item.selectedSize || 'N/A'}) x${item.quantity} - PKR ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = encodeURIComponent(
      `🛒 *DASTAN Order*\n\n${itemsList}\n\n*Subtotal: PKR ${cartTotal.toLocaleString()}*\n*Shipping: PKR ${shipping}\n*Total: PKR ${total.toLocaleString()}*\n\nPlease confirm my order. Thank you!`
    );

    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${message}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-charcoal/20 mx-auto mb-6" />
          <h1 className="font-display text-3xl text-charcoal mb-4">Your Bag is Empty</h1>
          <p className="font-body text-charcoal/50 mb-8">Looks like you haven't added anything yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-white font-body text-sm uppercase tracking-widest hover:bg-charcoal/90 transition-colors"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl md:text-4xl text-charcoal mb-8"
      >
        Shopping Bag ({cartCount})
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div
              key={`${item.id}-${item.selectedSize}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex gap-6 p-6 bg-white border border-warm-beige/20"
            >
              <Link to={`/product/${item.id}`}>
                <div 
                  className="w-24 h-32 rounded-none shadow-md flex-shrink-0" 
                  style={{ backgroundColor: item.colorCode || "#E8E0D0" }}
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <Link to={`/product/${item.id}`} className="font-display text-lg text-charcoal hover:text-charcoal/70">
                      {item.name}
                    </Link>
                    <p className="font-body text-sm text-charcoal/50 mt-1">
                      {item.color} • Size: {item.selectedSize}
                    </p>
                  </div>
                  <p className="font-display text-lg">
                    PKR {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-warm-beige/30">
                    <button
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      className="p-2 text-charcoal/50 hover:text-charcoal"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-body">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      className="p-2 text-charcoal/50 hover:text-charcoal"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(item.id, item.selectedSize);
                      success("Item removed from bag");
                    }}
                    className="flex items-center gap-1 text-sm text-charcoal/40 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-warm-beige/5 p-6 space-y-6">
            <h2 className="font-display text-xl">Order Summary</h2>

            <div className="space-y-4 font-body text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal/60">Subtotal</span>
                <span className="text-charcoal">PKR {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Shipping</span>
                <span className="text-charcoal">
                  {shipping === 0 ? "FREE" : `PKR ${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-charcoal/50">
                  Add PKR {(5000 - cartTotal).toLocaleString()} more for free shipping
                </p>
              )}
              <div className="border-t border-warm-beige/30 pt-4 flex justify-between font-medium">
                <span>Total</span>
                <span className="font-display text-xl">PKR {total.toLocaleString()}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full py-4 bg-charcoal text-white text-center font-body text-sm uppercase tracking-widest hover:bg-charcoal/90 transition-colors"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-4 bg-green-500 text-white font-body text-sm uppercase tracking-widest hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Order via WhatsApp
            </button>

            <Link
              to="/shop"
              className="block w-full py-3 border border-charcoal/20 text-charcoal/60 text-center font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}