"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "ecommerce_cart_v1";
const FAV_STORAGE_KEY = "ecommerce_favorites_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Cart localStorage read error:", error);
      return [];
    }
  });
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const storedFavs = window.localStorage.getItem(FAV_STORAGE_KEY);
      return storedFavs ? JSON.parse(storedFavs) : [];
    } catch (error) {
      console.error("Cart localStorage read error:", error);
      return [];
    }
  });

  // Dəyişiklikləri LocalStorage-da saxla
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      window.localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Cart localStorage write error:", error);
    }
  }, [items, favorites]);

  const addToCart = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const toggleFavorite = useCallback((product) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const isFavorite = useCallback(
    (productId) => favorites.some((item) => item.id === productId),
    [favorites]
  );

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const cartTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      favorites,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleFavorite,
      isFavorite,
      cartCount,
      cartTotal,
    }),
    [
      items,
      favorites,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleFavorite,
      isFavorite,
      cartCount,
      cartTotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}


