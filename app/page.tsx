'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BookGrid from '@/components/BookGrid';
import BestSellersCarousel from '@/components/BestSellersCarousel';
import { Sparkles, BookOpen, Zap, Shield, TrendingUp, ArrowRight, Crown, Flame } from 'lucide-react';
import { fetchNewBooks, fetchFeaturedBooks, searchBooks } from '@/lib/open-library-api';
import type { Book } from '@/types';

export default function Home() {
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [bestSellers, setBestSellers] = useState<Book[]>([]);
  const [percyJacksonId, setPercyJacksonId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        const [newBooksData, bestSellersData, percySearchResult] = await Promise.all([
          fetchNewBooks(),
          fetchFeaturedBooks(),
          searchBooks('Percy Jackson lightning thief'),
        ]);
        setNewBooks(newBooksData.slice(0, 8));
        setBestSellers(bestSellersData.slice(0, 10));
        
        if (percySearchResult && percySearchResult.length > 0) {
          setPercyJacksonId(percySearchResult[0].id);
        }
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 relative overflow-hidden">

      <section className="relative text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/hero-banners/hero-banner-principal.jpg)',
          }}
        />
        
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" style={{ perspective: '2000px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up" style={{ transform: 'translateZ(50px)' }}>
              <div className="inline-flex items-center gap-2 bg-amber-100/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-amber-200/30" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3), inset 0 -1px 3px rgba(255,255,255,0.1)' }}>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span className="text-sm font-medium text-amber-50">Nuevos lanzamientos cada semana</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.4), -1px -1px 2px rgba(255,255,255,0.1)' }}>
                Tu biblioteca favorita <span className="text-amber-200">sin límites</span>
          </h1>
              <p className="text-xl mb-8 text-white/95 leading-relaxed" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                Descubre mundos increíbles con nuestra selección de libros. Envío gratis para miembros.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/coleccion"
                  className="bg-amber-100 text-amber-900 px-8 py-4 rounded-xl font-bold hover:bg-amber-50 transition-all duration-300 hover:scale-110 inline-flex items-center justify-center gap-2"
                  style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.3), inset 0 -2px 5px rgba(0,0,0,0.2)', transform: 'translateZ(20px)' }}
                >
                  Explorar Catálogo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/#novedades"
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 hover:scale-110 inline-flex items-center justify-center gap-2"
                  style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.3), inset 0 -2px 5px rgba(255,255,255,0.1)', transform: 'translateZ(20px)' }}
                >
                  <Flame className="w-5 h-5" />
                  Ver Novedades
                </Link>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="bg-amber-50/20 backdrop-blur-md rounded-2xl p-6 hover:bg-amber-50/30 transition-all duration-300 border border-white/20 hover:scale-105" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 -2px 10px rgba(255,255,255,0.1)' }}>
                <BookOpen className="w-8 h-8 mb-3 text-amber-200" />
                <div className="text-4xl font-bold mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>1000+</div>
                <div className="text-sm text-amber-50">Libros disponibles</div>
              </div>
              <div className="bg-amber-50/20 backdrop-blur-md rounded-2xl p-6 hover:bg-amber-50/30 transition-all duration-300 border border-white/20 hover:scale-105" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 -2px 10px rgba(255,255,255,0.1)' }}>
                <Zap className="w-8 h-8 mb-3 text-yellow-200" />
                <div className="text-4xl font-bold mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>24h</div>
                <div className="text-sm text-amber-50">Envío rápido</div>
              </div>
              <div className="bg-amber-50/20 backdrop-blur-md rounded-2xl p-6 hover:bg-amber-50/30 transition-all duration-300 border border-white/20 hover:scale-105" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 -2px 10px rgba(255,255,255,0.1)' }}>
                <Shield className="w-8 h-8 mb-3 text-green-200" />
                <div className="text-4xl font-bold mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>100%</div>
                <div className="text-sm text-amber-50">Pago seguro</div>
              </div>
              <div className="bg-amber-50/20 backdrop-blur-md rounded-2xl p-6 hover:bg-amber-50/30 transition-all duration-300 border border-white/20 hover:scale-105" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 -2px 10px rgba(255,255,255,0.1)' }}>
                <Crown className="w-8 h-8 mb-3 text-orange-200" />
                <div className="text-4xl font-bold mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>VIP</div>
                <div className="text-sm text-amber-50">Envío gratis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col border border-stone-200" style={{ height: '400px' }}>
            <div className="relative h-48 flex-shrink-0">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/cards-inicio/card1.jpg)'
                }}
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 h-14">
                Compra online, recoge en librería
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">
                Disponible en 24-48 horas en tu librería más cercana
              </p>
              <button className="w-full bg-amber-700 hover:bg-amber-800 text-amber-50 py-2.5 rounded-md font-medium transition-all hover:shadow-lg">
                VER MÁS
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col border border-stone-200" style={{ height: '400px' }}>
            <div className="relative h-48 flex-shrink-0">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/cards-inicio/card2.jpg)'
                }}
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 h-14">
                Libros firmados por tu autor favorito
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">
                Ediciones exclusivas con dedicatoria del autor
              </p>
              <button className="w-full bg-stone-700 hover:bg-stone-800 text-amber-50 py-2.5 rounded-md font-medium transition-all hover:shadow-lg">
                LIBROS FIRMADOS
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col border border-stone-200" style={{ height: '400px' }}>
            <div className="relative h-48 flex-shrink-0">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/cards-inicio/card3.jpg)'
                }}
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 h-14">
                Hazte Socio en un minuto y gratis
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">
                Disfruta de descuentos exclusivos y envío gratis
              </p>
              <button className="w-full bg-orange-700 hover:bg-orange-800 text-amber-50 py-2.5 rounded-md font-medium transition-all hover:shadow-lg">
                HACERME SOCIO
              </button>
            </div>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-amber-700" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Los más vendidos
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                Los libros favoritos de nuestros lectores este mes
              </p>
            </div>
            <Link 
              href="/mas-vendidos" 
              className="text-amber-800 hover:text-amber-900 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              Ver más
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-700"></div>
            </div>
          ) : (
            <BestSellersCarousel books={bestSellers} />
          )}
        </section>

        <section className="mb-16 bg-gradient-to-r from-stone-100 to-stone-200 rounded-2xl shadow-lg border border-stone-300" style={{ overflow: 'visible' }}>
          <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Percy Jackson y el Ladrón del Rayo
              </h2>
              <p className="text-lg text-gray-700 mb-2">
                Una aventura épica llena de <em className="text-amber-800">mitología griega</em>, <em className="text-amber-800">acción trepidante</em> y <em className="text-amber-800">humor inteligente</em>. Perfecto para jóvenes lectores y amantes de la fantasía.
              </p>
              <p className="text-md text-gray-600 mb-4">
                Percy descubre que es hijo de Poseidón y debe evitar una guerra entre los dioses del Olimpo. ¿Podrá recuperar el rayo robado de Zeus?
              </p>
              <div className="mt-6">
                <Link
                  href={percyJacksonId ? `/libro/${percyJacksonId}` : '#'}
                  className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-md"
                >
                  {percyJacksonId ? 'VER LIBRO' : 'Buscando...'}
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center" style={{ perspective: '1500px' }}>
              <div className="relative w-64 h-80 group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-400 rounded-lg transform rotate-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-2xl"></div>
                <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-4 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]" style={{ transformStyle: 'preserve-3d' }}>
                  <img
                    src="/libros/percy jackson.jpg"
                    alt="Percy Jackson y el Ladrón del Rayo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="novedades" className="mb-16 relative scroll-mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-orange-700" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Novedades
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                Los últimos lanzamientos que no puedes perderte
              </p>
            </div>
            <Link
              href="/novedades"
              className="text-amber-800 hover:text-amber-900 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              Ver más
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-700"></div>
            </div>
          ) : (
            <BookGrid books={newBooks} />
          )}
        </section>
      </main>

      <section className="bg-stone-600 py-12 md:py-16 mt-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="bg-white/10 p-4 rounded-lg flex-shrink-0">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Recibe nuestras novedades en libros en tu email
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-5 py-3.5 bg-white rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-600 shadow-lg"
                />
                  <button className="bg-stone-700 hover:bg-stone-800 text-amber-50 px-10 py-3.5 rounded-md font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
                  SUSCRIBIRME
                </button>
              </div>
            </div>
        </div>
        </div>
      </section>
    </div>
  );
}
