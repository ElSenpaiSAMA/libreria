'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchBookById, fetchBooks } from '@/lib/open-library-api';
import { useCart } from '@/lib/cart-context';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Star, 
  Package, 
  Truck, 
  Shield,
  BookOpen,
  Calendar,
  Languages,
  FileText
} from 'lucide-react';
import BookGrid from '@/components/BookGrid';
import type { Book } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { addBook, cart } = useCart();

  useEffect(() => {
    async function loadBook() {
      try {
        setLoading(true);
        const bookData = await fetchBookById(id);
        setBook(bookData);
        
        if (bookData) {
          const related = await fetchBooks(bookData.category, 4);
          setRelatedBooks(related.filter(b => b.id !== id));
        }
      } catch (error) {
        console.error('Error loading book:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-700"></div>
          <p className="text-gray-600">Cargando libro...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Libro no encontrado
          </h1>
          <Link
            href="/"
            className="text-amber-700 hover:text-amber-800 flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const isInCart = cart.items.some(item => item.book.id === book.id);

  return (
    <div className="min-h-screen bg-stone-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-stone-200">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-stone-100 shadow-2xl">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
              {book.originalPrice && (
                <div className="absolute top-4 right-4 bg-orange-600 text-white font-bold px-4 py-2 rounded-lg text-lg">
                  {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="mb-2">
                <span className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {book.category}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {book.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-4">
                por <span className="font-semibold">{book.author}</span>
              </p>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(book.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-900">
                  {book.rating}
                </span>
                <span className="text-gray-500">
                  ({book.reviews} reseñas)
                </span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {book.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-stone-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span className="text-gray-600">
                    {book.pages} páginas
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Languages className="w-4 h-4 text-amber-700" />
                  <span className="text-gray-600">
                    {book.language}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-amber-700" />
                  <span className="text-gray-600">
                    {new Date(book.publishDate).getFullYear()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span className="text-gray-600">
                    {book.isbn}
                  </span>
                </div>
              </div>

              <div className="mt-auto">
                <div className="mb-4">
                  {book.originalPrice && (
                    <span className="text-lg text-gray-500 line-through block mb-1">
                      ${book.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-amber-800">
                    ${book.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => addBook(book)}
                  disabled={!book.inStock}
                  className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                    book.inStock
                      ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-lg hover:shadow-xl'
                      : 'bg-stone-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isInCart ? 'Añadir otra unidad' : 'Añadir al carrito'}
                </button>

                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="text-center">
                    <Package className="w-6 h-6 text-amber-700 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Empaque seguro</p>
                  </div>
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-amber-700 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Envío rápido</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-amber-700 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Compra segura</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedBooks.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Libros similares
            </h2>
            <BookGrid books={relatedBooks} />
          </section>
        )}
      </main>
    </div>
  );
}

