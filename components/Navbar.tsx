'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { ShoppingCart, Search, User, LogOut } from 'lucide-react';
import MegaMenu from './MegaMenu';
import AuthModal from './AuthModal';

const mainCategories = [
  { name: 'Destacados', href: '/' },
  { name: 'Ficción', hasMenu: true },
  { name: 'No Ficción', hasMenu: true },
  { name: 'Infantil', hasMenu: true },
  { name: 'Juvenil', hasMenu: true },
  { name: 'Ciencia', hasMenu: true },
  { name: 'Arte y Cultura', hasMenu: true },
  { name: 'Cómics y Manga', hasMenu: true },
  { name: 'Libros de Texto', hasMenu: true },
  { name: 'Novedades', href: '/novedades' },
  { name: 'Ofertas', href: '/coleccion' },
  { name: 'Más Vendidos', href: '/mas-vendidos' },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/coleccion?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleMouseEnter = (categoryName: string, hasMenu: boolean) => {
    if (hasMenu) {
      setActiveMenu(categoryName);
    } else {
      setActiveMenu(null);
    }
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-stone-200">
      <div className="border-b border-stone-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-8">
              <Image 
                src="/logo.png" 
                alt="Mundo del Libro" 
                width={40} 
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                Mundo del Libro
              </span>
            </Link>

            <div className="flex-1 max-w-3xl mr-1">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Busca por autor, título, género, ISBN"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-stone-100 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 text-base border border-stone-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-stone-200 rounded transition-colors"
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5 text-amber-700" />
                </button>
              </form>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="hidden md:flex items-center gap-2 text-gray-700">
                  <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    <User className="w-5 h-5 text-amber-700" />
                    <span className="font-medium text-sm">{user.displayName || 'Usuario'}</span>
                  </div>
                  <button
                    onClick={() => logOut()}
                    className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors"
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="hidden md:flex items-center gap-2 text-gray-700 hover:text-amber-700 transition-colors text-base"
                >
                  <User className="w-7 h-7" />
                  <span className="font-medium">Mi Cuenta</span>
                </button>
              )}

              <Link 
                href="/carrito"
                className="relative flex items-center gap-2 text-gray-700 hover:text-amber-700 transition-colors"
              >
                <ShoppingCart className="w-8 h-8" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div 
        style={{ backgroundColor: '#fcf0e3' }}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start gap-1 overflow-x-auto">
            {mainCategories.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category.name, category.hasMenu || false)}
              >
                {category.href ? (
                  <Link
                    href={category.href}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50 transition-all whitespace-nowrap rounded-lg"
                  >
                    {category.name}
                  </Link>
                ) : (
                  <button
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50 transition-all whitespace-nowrap rounded-lg"
                  >
                    {category.name}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <MegaMenu category={activeMenu || ''} isOpen={activeMenu !== null} />
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </nav>
  );
}

