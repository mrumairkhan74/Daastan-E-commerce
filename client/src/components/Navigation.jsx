"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { NAVIGATION_LINKS, BRAND_CONFIG } from "../data/products";

export default function Navigation({ onCartClick, onSearchClick, onSizeGuideClick, onAuthClick }) {
  const { cartCount, wishlist } = useCart();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleMouseEnter = (label) => setActiveDropdown(label);
  const handleMouseLeave = () => setActiveDropdown(null);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-charcoal text-white py-2.5 text-center text-xs md:text-sm">
        <p className="font-body tracking-wide">
          🎉 FREE SHIPPING on orders over PKR 5,000 | Use code <span className="font-semibold">DASTAN10</span> for 10% off
        </p>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-start -mt-1">
              <span className="font-display text-xl md:text-2xl font-medium text-charcoal tracking-tight leading-none">
                DASTAN
              </span>
              <span className="font-urdu text-xs text-charcoal/50 -mt-0.5">داستان</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAVIGATION_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={link.href.replace("#", "") || "/"}
                    className="flex items-center gap-1 py-2 text-sm font-body font-medium text-charcoal/80 hover:text-charcoal transition-colors"
                  >
                    {link.label}
                    {link.submenu && <ChevronDown className="w-3 h-3" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.submenu && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-48 bg-white shadow-lg border border-warm-beige/20 py-2"
                      >
                        {link.submenu.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="block px-4 py-2 text-sm text-charcoal/70 hover:text-charcoal hover:bg-warm-beige/5 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={onSearchClick}
                className="p-2 text-charcoal/60 hover:text-charcoal transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/wishlist"
                className="p-2 text-charcoal/60 hover:text-charcoal transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-charcoal text-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={onCartClick}
                className="p-2 text-charcoal/60 hover:text-charcoal transition-colors relative"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-charcoal text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {user ? (
                <Link
                  to="/account"
                  className="hidden md:flex p-2 text-charcoal/60 hover:text-charcoal transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </Link>
              ) : (
                <button
                  onClick={() => onAuthClick("login")}
                  className="hidden md:flex p-2 text-charcoal/60 hover:text-charcoal transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-charcoal"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-warm-beige/20 bg-white"
            >
              <div className="px-4 py-6 space-y-1">
                {NAVIGATION_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href.replace("#", "") || "/"}
                    className="block py-3 text-base font-body font-medium text-charcoal/80 hover:text-charcoal border-b border-warm-beige/10"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="block py-3 text-base font-body font-medium text-charcoal/80 hover:text-charcoal border-b border-warm-beige/10"
                >
                  Contact
                </Link>
                {user ? (
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-base font-body font-medium text-charcoal/80 hover:text-charcoal border-b border-warm-beige/10"
                  >
                    My Account
                  </Link>
                ) : (
                  <button
                    onClick={() => { onAuthClick("login"); setMobileMenuOpen(false); }}
                    className="block py-3 text-base font-body font-medium text-charcoal/80 hover:text-charcoal w-full text-left border-b border-warm-beige/10"
                  >
                    My Account
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}