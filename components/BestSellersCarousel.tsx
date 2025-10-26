'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types';
import { useCart } from '@/lib/cart-context';
import { ShoppingCart, Star, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

interface BestSellersCarouselProps {
  books: Book[];
}

export default function BestSellersCarousel({ books }: BestSellersCarouselProps) {
  const { addBook } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleAddToCart = (e: React.MouseEvent, book: Book) => {
    e.preventDefault();
    e.stopPropagation();
    addBook(book);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        handleScroll();
      }, 300);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  return (
    <div className="relative group">
      <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-stone-100 via-stone-100/50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-stone-100 via-stone-100/50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}></div>
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {books.map((book, index) => (
          <Link
            key={book.id}
            href={`/libro/${book.id}`}
            className="group/card flex-shrink-0 w-[240px] snap-start"
          >
            <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-stone-200 h-full flex flex-col hover:-translate-y-2 hover:scale-[1.02]">
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-amber-700 text-amber-50 font-black px-3 py-2 rounded-lg text-base shadow-xl flex items-center gap-1 animate-pulse-slow">
                  <TrendingUp className="w-4 h-4" />
                  #{index + 1}
                </div>
                </div>
                {book.originalPrice && (
                <div className="absolute top-2 right-2 z-10 bg-orange-600 text-amber-50 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                  -{Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                </div>
              )}

              <div className="relative w-full h-[280px] overflow-hidden bg-gray-100 dark:bg-zinc-800">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3 flex-1 flex flex-col">
                <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1 min-h-[2.5rem]">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  {book.author}
                </p>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-gray-600">
                    {book.rating} ({book.reviews})
                  </span>
                </div>

                <div className="flex-1"></div>

                <div className="mt-auto">
                  {book.originalPrice && (
                    <span className="text-xs text-gray-500 line-through block">
                      ${book.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-lg font-bold text-amber-800">
                    ${book.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="bg-amber-700 hover:bg-amber-800 disabled:bg-gray-300 disabled:cursor-not-allowed p-2 rounded-full shadow-md transition-all hover:scale-110 disabled:hover:scale-100"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4 text-amber-50" />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="bg-amber-700 hover:bg-amber-800 disabled:bg-gray-300 disabled:cursor-not-allowed p-2 rounded-full shadow-md transition-all hover:scale-110 disabled:hover:scale-100"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-4 h-4 text-amber-50" />
        </button>
      </div>
    </div>
  );
}

