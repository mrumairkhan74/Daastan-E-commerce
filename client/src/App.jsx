"use client";

import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <RecentlyViewedProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="account" element={<AccountPage />} />
              </Route>
            </Routes>
          </CartProvider>
        </RecentlyViewedProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;