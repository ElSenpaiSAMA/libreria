import { Cart, CartItem, Book } from '@/types';

export function addToCart(cart: Cart, book: Book): Cart {
  const existingItem = cart.items.find(item => item.book.id === book.id);
  
  if (existingItem) {
    const updatedItems = cart.items.map(item =>
      item.book.id === book.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    return {
      items: updatedItems,
      total: calculateTotal(updatedItems),
    };
  }
  
  const newItems = [...cart.items, { book, quantity: 1 }];
  return {
    items: newItems,
    total: calculateTotal(newItems),
  };
}

export function removeFromCart(cart: Cart, bookId: string): Cart {
  const updatedItems = cart.items.filter(item => item.book.id !== bookId);
  return {
    items: updatedItems,
    total: calculateTotal(updatedItems),
  };
}

export function updateQuantity(cart: Cart, bookId: string, quantity: number): Cart {
  if (quantity <= 0) {
    return removeFromCart(cart, bookId);
  }
  
  const updatedItems = cart.items.map(item =>
    item.book.id === bookId ? { ...item, quantity } : item
  );
  
  return {
    items: updatedItems,
    total: calculateTotal(updatedItems),
  };
}

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.book.price * item.quantity, 0);
}

export function getItemCount(cart: Cart): number {
  return cart.items.reduce((count, item) => count + item.quantity, 0);
}

