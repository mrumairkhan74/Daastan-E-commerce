"use client";

import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";
import SizeGuideModal from "./SizeGuideModal";
import { useState } from "react";

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation
        onCartClick={() => setCartOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
        onSizeGuideClick={() => setSizeGuideOpen(true)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}