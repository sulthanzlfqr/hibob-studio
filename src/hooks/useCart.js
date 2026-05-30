import { useState, useEffect, useCallback, useMemo } from "react";
import { getProductById } from "../data/products";

const CART_KEY = "hibob_cart_v1";

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState(readStorage);

  // Persist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((productId) => {
    const product = getProductById(productId);
    if (!product) return;
    setItems((prev) => {
      if (prev.find((i) => i.productId === productId)) return prev;
      return [
        ...prev,
        {
          productId,
          quantity: 1,
          unitPrice: product.priceIDR,
          subtotal: product.priceIDR,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotal = useCallback(() => {
    return items.reduce((sum, i) => sum + i.subtotal, 0);
  }, [items]);

  const getItemCount = useCallback(() => items.length, [items]);

  const isInCart = useCallback(
    (productId) => items.some((i) => i.productId === productId),
    [items]
  );

  // Cart items enriched with full product data for rendering
  const enrichedItems = useMemo(() => {
    return items
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter(Boolean);
  }, [items]);

  return {
    items,
    enrichedItems,
    addItem,
    removeItem,
    clearCart,
    getTotal,
    getItemCount,
    isInCart,
  };
}
