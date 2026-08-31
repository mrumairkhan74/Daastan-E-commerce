"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { NAVIGATION_LINKS, BRAND_CONFIG } from "../data/products";

export default function Navigation({ cartCount, onSearchClick, onWishlistClick, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileLinkClick = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Announcement Bar */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-charcoal text-white py-2 text-center text-sm letter-wide overflow-hidden"
      >
        <span className="font-display">Free shipping on orders over PKR 5,000 • Cash on Delivery available across Pakistan</span>
      </motion.div>

      {/* Main Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-warm-beige/20" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4" aria-label="Main navigation">
          <div className="flex items-center justify-between gap-8">
            {/* Left - Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <a href="#home" className="flex flex-col items-start" aria-label="DASTAN Home">
                <span className="font-display text-2xl font-medium text-charcoal tracking-tight leading-none">
                  DASTAN
                </span>
                <span className="font-urdu text-sm text-charcoal/60 -mt-1 leading-none">
                  داستان
                </span>
                <span className="text-xs text-charcoal/40 tracking-widest uppercase font-body">
                  by Ahmedullah
                </span>
              </a>
            </motion.div>

            {/* Center - Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:flex items-center gap-10 flex-1 justify-center"
              role="navigation"
              aria-label="Main menu"
            >
              {NAVIGATION_LINKS.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={handleMobileLinkClick}
                  className="relative text-sm font-medium text-charcoal/80 hover:text-charcoal transition-colors duration-300 uppercase tracking-wider after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-charcoal after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>

            {/* Right - Icons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-6 flex-shrink-0"
            >
              <button
                onClick={onSearchClick}
                className="relative p-2 text-charcoal/60 hover:text-charcoal transition-colors duration-300 rounded-full hover:bg-warm-beige/10"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={2} />
              </button>

              <button
                onClick={onWishlistClick}
                className="relative p-2 text-charcoal/60 hover:text-charcoal transition-colors duration-300 rounded-full hover:bg-warm-beige/10"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" strokeWidth={2} />
              </button>

              <button
                onClick={onCartClick}
                className="relative p-2 text-charcoal/60 hover:text-charcoal transition-colors duration-300 rounded-full hover:bg-warm-beige/10"
                aria-label={`Shopping bag, ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={2} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-charcoal text-white text-xs font-medium rounded-full flex items-center justify-center"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-charcoal hover:text-charcoal/60 transition-colors rounded-full hover:bg-warm-beige/10"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden border-t border-warm-beige/20 pt-6 mt-6"
              >
                <div className="flex flex-col gap-4">
                  {NAVIGATION_LINKS.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={handleMobileLinkClick}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="text-lg font-medium text-charcoal/80 hover:text-charcoal transition-colors duration-300 uppercase tracking-wider py-2 border-b border-warm-beige/10"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
}