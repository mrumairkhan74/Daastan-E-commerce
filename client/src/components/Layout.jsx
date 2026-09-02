"use client";

import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";
import SizeGuideModal from "./SizeGuideModal";
import BackToTop from "./BackToTop";
import AuthModal from "./AuthModal";
import NewsletterPopup from "./NewsletterPopup";
import { useState } from "react";

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuth = (mode = "login") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation
        onCartClick={() => setCartOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
        onSizeGuideClick={() => setSizeGuideOpen(true)}
        onAuthClick={openAuth}
      />

      <main className="flex-1">
        <Outlet context={{ openAuth }} />
      </main>

      <Footer />

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />
      <NewsletterPopup />
      <BackToTop />
    </div>
  );
}