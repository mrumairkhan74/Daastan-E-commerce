"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { SHIRT_PRODUCTS, JEWELRY_PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, toggleWishlist } = useCart();
  const { success } = useToast();

  const allProducts = [...SHIRT_PRODUCTS, ...JEWELRY_PRODUCTS];
  const wishlistProducts = allProducts.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-20 h-20 text-charcoal/20 mx-auto mb-6" />
          <h1 className="font-display text-3xl text-charcoal mb-4">Your Wishlist is Empty</h1>
          <p className="font-body text-charcoal/50 mb-8">Save items you love for later.</p>
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
        My Wishlist ({wishlistProducts.length})
      </motion.h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white border border-warm-beige/20 overflow-hidden"
          >
            <div className="relative aspect-[3/4] bg-warm-beige/10">
              <img
                src={product.category === "jewelry" 
                  ? `/images/jewelry/${product.id}.jpg` 
                  : `/images/shirts/${product.id}-front.jpg`
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-charcoal/60 hover:text-red-500 transition-colors"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>

              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    const size = product.sizes?.[1] || product.sizes?.[0];
                    if (size) {
                      addToCart(product, size, 1);
                      success(`${product.name} added to bag!`);
                    }
                  }}
                  className="w-full py-3 bg-charcoal text-white font-body text-xs uppercase tracking-widest hover:bg-charcoal/90 transition-colors"
                >
                  Add to Bag
                </button>
              </div>
            </div>

            <div className="p-4">
              <Link to={`/product/${product.id}`} className="font-display text-sm text-charcoal hover:text-charcoal/70">
                {product.name}
              </Link>
              <p className="font-body text-xs text-charcoal/50 mt-1">{product.color}</p>
              <p className="font-display text-base mt-2">PKR {product.price.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}