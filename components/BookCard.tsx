'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types';
import { useCart } from '@/lib/cart-context';
import { ShoppingCart, Star } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addBook } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addBook(book);
  };

  return (
    <Link 
      href={`/libro/${book.id}`}
      className="group flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-200"
      style={{ height: '580px' }}
    >
      
      <div className="relative w-full h-[320px] flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className="object-cover"
        />
        
        {book.originalPrice && (
          <div className="absolute top-2 right-2 bg-orange-600 text-amber-50 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
            -{Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
          </div>
        )}
      </div>

      
      <div className="flex flex-col p-4 h-[260px]">
        <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1 h-[40px]">
          {book.title}
        </h3>
        <p className="text-xs text-gray-600 mb-2 truncate">
          {book.author}
        </p>

        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(book.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({book.reviews})
          </span>
        </div>

        
        <div className="flex-1"></div>

        
        <div className="mb-3">
          {book.originalPrice && (
            <span className="text-xs text-gray-500 line-through block">
              ${book.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-xl font-bold text-amber-800">
            ${book.price.toFixed(2)}
          </span>
        </div>

        
        <button
          onClick={handleAddToCart}
          className="w-full bg-amber-700 hover:bg-amber-800 text-amber-50 py-2.5 rounded-md transition-all font-medium text-sm flex items-center justify-center gap-2 hover:shadow-lg"
        >
          <ShoppingCart className="w-4 h-4" />
          Añadir al carrito
        </button>
      </div>
    </Link>
  );
}

