'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, Book } from '@/types';
import { addToCart, removeFromCart, updateQuantity, getItemCount } from './cart-utils';

interface CartContextType {
  cart: Cart;
  addBook: (book: Book) => void;
  removeBook: (bookId: string) => void;
  updateBookQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'bookstore-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addBook = (book: Book) => {
    setCart(prevCart => addToCart(prevCart, book));
  };

  const removeBook = (bookId: string) => {
    setCart(prevCart => removeFromCart(prevCart, bookId));
  };

  const updateBookQuantity = (bookId: string, quantity: number) => {
    setCart(prevCart => updateQuantity(prevCart, bookId, quantity));
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  const itemCount = getItemCount(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        addBook,
        removeBook,
        updateBookQuantity,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}

