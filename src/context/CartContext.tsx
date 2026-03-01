'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductConfiguration, Cart, CartItem, CartContextType } from '@/types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'cart';

export const CartProvider = ({ children }: CartProviderProps) => {
  const router = useRouter();
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Convert date strings back to Date objects
        parsedCart.items = parsedCart.items.map((item: CartItem) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        }));
        setCart(parsedCart);
      } catch (error) {
        console.error('Error loading cart:', error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.items.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  // Calculate cart totals
  const calculateTotals = (items: CartItem[]) => ({
    total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  });

  const addToCart = (product: Product, configuration: ProductConfiguration) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      configuration,
      quantity: 1,
      addedAt: new Date(),
    };

    const updatedItems = [...cart.items, newItem];
    const { total, itemCount } = calculateTotals(updatedItems);

    setCart({ items: updatedItems, total, itemCount });
    router.push('/cart');
  };

  const removeFromCart = (itemId: string) => {
    const updatedItems = cart.items.filter((item) => item.id !== itemId);
    const { total, itemCount } = calculateTotals(updatedItems);

    setCart({ items: updatedItems, total, itemCount });

    if (updatedItems.length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedItems = cart.items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    const { total, itemCount } = calculateTotals(updatedItems);

    setCart({ items: updatedItems, total, itemCount });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0, itemCount: 0 });
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
