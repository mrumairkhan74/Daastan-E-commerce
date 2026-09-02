"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { SHIRT_PRODUCTS, JEWELRY_PRODUCTS } from "../data/products";

const RecentlyViewedContext = createContext();

export function RecentlyViewedProvider({ children }) {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("dastan_recently_viewed");
    if (saved) {
      setRecentlyViewed(JSON.parse(saved));
    }
  }, []);

  const addToRecentlyViewed = (productId) => {
    const allProducts = [...SHIRT_PRODUCTS, ...JEWELRY_PRODUCTS];
    const product = allProducts.find((p) => p.id === productId);
    if (!product) return;

    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== productId);
      const updated = [product, ...filtered].slice(0, 8);
      localStorage.setItem("dastan_recently_viewed", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);
