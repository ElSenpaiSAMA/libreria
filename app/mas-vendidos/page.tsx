'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BookGrid from '@/components/BookGrid';
import CategoryFilter from '@/components/CategoryFilter';
import { TrendingUp, SlidersHorizontal, Search as SearchIcon } from 'lucide-react';
import { fetchFeaturedBooks, searchBooks, fetchBooksByCategory } from '@/lib/open-library-api';
import type { Book } from '@/types';

export default function MasVendidosPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        let booksData: Book[] = [];
        
        if (searchQuery) {
          booksData = await searchBooks(searchQuery);
        } else if (selectedCategory && selectedCategory !== 'Todos') {
          booksData = await fetchBooksByCategory(selectedCategory);
        } else {
          booksData = await fetchFeaturedBooks();
        }
        
        setBooks(booksData);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [selectedCategory, searchQuery]);

  const filteredBooks = books;

  return (
    <div className="min-h-screen bg-stone-100">
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/hero-banners/hero-banner-mas-vendidos.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60" />
        
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <TrendingUp className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
                Los Más Vendidos
              </h1>
              <p className="text-xl md:text-2xl text-amber-100 mt-3 drop-shadow-md">
                Los libros favoritos de nuestros lectores - {filteredBooks.length} títulos
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 bg-white rounded-xl p-6 shadow-md border border-stone-200">
          <div className="flex items-center gap-2 mb-3">
            <SearchIcon className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg font-semibold text-gray-900">
              Buscar en los más vendidos
            </h2>
          </div>
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-stone-100 text-gray-900 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          {searchQuery && (
            <p className="text-sm text-gray-600 mt-2">
              Buscando: <span className="font-semibold">"{searchQuery}"</span>
            </p>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Filtrar por categoría
            </h2>
          </div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedCategory === 'Todos' ? 'Todos los Más Vendidos' : `Más Vendidos en ${selectedCategory}`}
          </h3>
          <p className="text-gray-600">
            {loading ? 'Cargando...' : `${filteredBooks.length} ${filteredBooks.length === 1 ? 'libro encontrado' : 'libros encontrados'}`}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-700"></div>
          </div>
        ) : (
          <BookGrid
            books={filteredBooks}
            emptyMessage={
              searchQuery
                ? `No se encontraron más vendidos que coincidan con "${searchQuery}"`
                : "No hay más vendidos en esta categoría"
            }
          />
        )}
      </main>
    </div>
  );
}

