"use client";

import { createContext, useContext, useReducer, useCallback } from "react";

const CartContext = createContext(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, selectedSize, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
        return { ...state, items: newItems };
      }

      return {
        ...state,
        items: [...state.items, { ...product, selectedSize, quantity }],
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.id === action.payload.id && item.selectedSize === action.payload.size)
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, size, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => !(item.id === id && item.selectedSize === size)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id && item.selectedSize === size
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "ADD_TO_WISHLIST": {
      if (state.wishlist.includes(action.payload)) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    }

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((id) => id !== action.payload),
      };

    case "TOGGLE_WISHLIST": {
      const { productId } = action.payload;
      if (state.wishlist.includes(productId)) {
        return {
          ...state,
          wishlist: state.wishlist.filter((id) => id !== productId),
        };
      }
      return { ...state, wishlist: [...state.wishlist, productId] };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    wishlist: [],
  });

  const addToCart = useCallback((product, selectedSize, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, selectedSize, quantity } });
  }, []);

  const removeFromCart = useCallback((id, size) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, size } });
  }, []);

  const updateQuantity = useCallback((id, size, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, size, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const addToWishlist = useCallback((productId) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: productId });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: productId });
  }, []);

  const toggleWishlist = useCallback((productId) => {
    dispatch({ type: "TOGGLE_WISHLIST", payload: { productId } });
  }, []);

  const isInWishlist = useCallback(
    (productId) => state.wishlist.includes(productId),
    [state.wishlist]
  );

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        wishlist: state.wishlist,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}