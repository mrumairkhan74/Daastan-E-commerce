"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import SearchModal from "./components/SearchModal";
import OurStory from "./components/OurStory";
import Manifesto from "./components/Manifesto";
import TrustSection from "./components/TrustSection";
import Lookbook from "./components/Lookbook";
import Reviews from "./components/Reviews";
import InstagramSection from "./components/InstagramSection";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { SHIRT_PRODUCTS, JEWELRY_PRODUCTS } from "./data/products";

function App() {
  // Cart state
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // Product detail modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetailOpen, setProductDetailOpen] = useState(false);

  // Search modal
  const [searchOpen, setSearchOpen] = useState(false);

  // Checkout modal
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Handlers
  const handleAddToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + (product.quantity || 1),
        };
        return newCart;
      }

      return [...prevCart, { ...product, quantity: product.quantity || 1 }];
    });
    setProductDetailOpen(false);
    setCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((productId, size, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, []);

  const handleRemoveFromCart = useCallback((productId, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.selectedSize === size))
    );
  }, []);

  const handleQuickView = useCallback((product) => {
    setSelectedProduct(product);
    setProductDetailOpen(true);
  }, []);

  const handleWishlistToggle = useCallback((productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const handleCheckout = useCallback(() => {
    setCartOpen(false);
    setCheckoutOpen(true);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation
        cartCount={cartCount}
        onSearchClick={() => setSearchOpen(true)}
        onWishlistClick={() => {}}
        onCartClick={() => setCartOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onShopClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
          onStoryClick={() => document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" })}
        />

        {/* First Chapter Collection */}
        <ProductGrid
          products={SHIRT_PRODUCTS}
          onQuickView={handleQuickView}
          onAddToCart={handleAddToCart}
          onWishlistToggle={handleWishlistToggle}
          wishlist={wishlist}
          title="THE FIRST CHAPTER"
          subtitle="Seven colours. Seven moods. One story."
          showFilters={true}
          id="shop"
        />

        {/* Our Story */}
        <OurStory
          onStoryClick={() => document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" })}
        />

        {/* Manifesto */}
        <Manifesto />

        {/* Lookbook */}
        <Lookbook
          onLookbookClick={() => document.getElementById("lookbook")?.scrollIntoView({ behavior: "smooth" })}
        />

        {/* Jewelry Collection */}
        <ProductGrid
          products={JEWELRY_PRODUCTS}
          onQuickView={handleQuickView}
          onAddToCart={handleAddToCart}
          onWishlistToggle={handleWishlistToggle}
          wishlist={wishlist}
          title="DASTAN JEWELRY"
          subtitle="Small objects. Lasting impressions."
          showFilters={false}
          id="jewelry"
        />

        {/* Trust Section */}
        <TrustSection />

        {/* Reviews */}
        <Reviews />

        {/* Instagram */}
        <InstagramSection />

        {/* Newsletter */}
        <Newsletter />

        {/* Footer */}
        <Footer />
      </main>

      {/* Modals */}
      <ProductDetail
        product={selectedProduct}
        isOpen={productDetailOpen}
        onClose={() => setProductDetailOpen(false)}
        onAddToCart={handleAddToCart}
        isInWishlist={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onWishlistToggle={handleWishlistToggle}
      />

      <ShoppingCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQuantity={handleUpdateQuantity}
        removeFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}

export default App;