"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SHIRT_PRODUCTS, JEWELRY_PRODUCTS, BRAND_CONFIG } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function HomePage() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { success } = useToast();

  const handleQuickView = (product) => {
    // Navigate to product page
    window.location.href = `/product/${product.id}`;
  };

  const handleAddToCart = (product) => {
    if (!product.sizes?.[1]) return; // Need size selection
    addToCart(product, product.sizes[1], 1);
    success(`${product.name} added to bag!`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/images/lifestyle/hero.jpg"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
          <motion.div className="max-w-2xl">
            <span className="font-urdu text-4xl md:text-6xl text-charcoal/60 block mb-4">داستان</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-charcoal mb-4">
              DASTAN
            </h1>
            <p className="font-body text-sm text-charcoal/50 uppercase tracking-widest mb-6">by Ahmedullah</p>
            <p className="font-display text-2xl md:text-3xl text-charcoal/80 italic mb-8">
              Every Thread, A Story.
            </p>
            <p className="font-body text-base text-charcoal/60 mb-10 max-w-lg leading-relaxed">
              Born from struggle, shaped by ambition, and written one chapter at a time. 
              DASTAN is a contemporary clothing house built for those who are still becoming.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-white font-body text-sm uppercase tracking-widest hover:bg-charcoal/90 transition-colors"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop?collection=shirts"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-charcoal text-charcoal font-body text-sm uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all"
              >
                View Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-warm-beige/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Oversized Tees", img: "/images/shirts/chapter-1-front.jpg", link: "/shop?category=shirts" },
              { name: "Jewelry", img: "/images/jewelry/naqsh-ring.jpg", link: "/shop?category=jewelry" },
              { name: "New Arrivals", img: "/images/shirts/chapter-2-front.jpg", link: "/shop?sort=newest" },
              { name: "Best Sellers", img: "/images/shirts/chapter-3-front.jpg", link: "/shop?badge=bestseller" },
            ].map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={cat.link} className="group block relative aspect-[3/4] overflow-hidden">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-display text-lg text-white">{cat.name}</p>
                    <p className="text-xs text-white/70 uppercase tracking-wider mt-1">Shop Now</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers - Chapter Shirts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal">The First Chapter</h2>
              <p className="font-body text-charcoal/50 mt-2">7 colours. 7 moods. One story.</p>
            </div>
            <Link to="/shop?collection=shirts" className="hidden md:flex items-center gap-2 text-sm font-body text-charcoal/70 hover:text-charcoal">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SHIRT_PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={handleQuickView}
                onAddToCart={handleAddToCart}
                onWishlistToggle={toggleWishlist}
                isInWishlist={isInWishlist(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-urdu text-3xl block mb-4 text-white/60">قبل از آن کہ ایک میراث ہوتا</span>
            <h2 className="font-display text-3xl md:text-5xl mb-6">
              "Before there was a legacy,<br /><span className="italic">there was a beginning.</span>"
            </h2>
            <p className="font-body text-white/60 mb-8 max-w-2xl mx-auto">
              For the ones still becoming. For the ones building quietly. 
              For every person whose struggle is part of the story.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-body text-sm uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all"
            >
              Discover the Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Jewelry Collection */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal">DASTAN Jewelry</h2>
              <p className="font-body text-charcoal/50 mt-2">Small objects. Lasting impressions.</p>
            </div>
            <Link to="/shop?category=jewelry" className="hidden md:flex items-center gap-2 text-sm font-body text-charcoal/70 hover:text-charcoal">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {JEWELRY_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={handleQuickView}
                onAddToCart={handleAddToCart}
                onWishlistToggle={toggleWishlist}
                isInWishlist={isInWishlist(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-warm-beige/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "📦", title: "Free Shipping", desc: "On orders over PKR 5,000" },
              { icon: "🔄", title: "Easy Returns", desc: "14-day return policy" },
              { icon: "💳", title: "Cash on Delivery", desc: "Pay when you receive" },
              { icon: "✨", title: "Premium Quality", desc: "200 GSM cotton" },
            ].map((badge, i) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-3xl mb-3 block">{badge.icon}</span>
                <h3 className="font-body text-sm font-medium text-charcoal uppercase tracking-wider">{badge.title}</h3>
                <p className="font-body text-xs text-charcoal/50 mt-1">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl mb-4">Join the Story</h2>
          <p className="font-body text-white/60 mb-8">Be the first to know about new drops and exclusive offers.</p>
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); success("Welcome to the story!"); }}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 font-body text-sm focus:outline-none focus:border-white/40"
            />
            <button type="submit" className="px-6 py-3 bg-white text-charcoal font-body text-sm uppercase tracking-wider hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}