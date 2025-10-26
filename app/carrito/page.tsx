'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart, removeBook, updateBookQuantity } = useCart();

  const handleIncrement = (bookId: string, currentQuantity: number) => {
    updateBookQuantity(bookId, currentQuantity + 1);
  };

  const handleDecrement = (bookId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateBookQuantity(bookId, currentQuantity - 1);
    }
  };

  const handleRemove = (bookId: string) => {
    removeBook(bookId);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-stone-300 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              ¡Descubre nuestra colección y encuentra tu próxima lectura!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Ir al catálogo
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continuar comprando
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">
            Carrito de Compras
          </h1>
          <p className="text-gray-600 mt-2">
            {cart.items.length} {cart.items.length === 1 ? 'artículo' : 'artículos'} en tu carrito
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map(item => (
              <div
                key={item.book.id}
                className="bg-white rounded-xl shadow-md p-6 flex gap-6 border border-stone-200"
              >
                <Link href={`/libro/${item.book.id}`} className="flex-shrink-0">
                  <div className="relative w-24 h-36 rounded-lg overflow-hidden bg-stone-100">
                    <Image
                      src={item.book.coverImage}
                      alt={item.book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                <div className="flex-1">
                  <Link
                    href={`/libro/${item.book.id}`}
                    className="block hover:text-amber-700 transition-colors"
                  >
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {item.book.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-2">
                    {item.book.author}
                  </p>
                  <span className="inline-block bg-stone-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {item.book.category}
                  </span>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => handleRemove(item.book.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                    aria-label="Eliminar del carrito"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="text-right">
                    {item.book.originalPrice && (
                      <span className="text-xs text-gray-500 line-through block">
                        ${item.book.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-xl font-bold text-amber-800">
                      ${item.book.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
                    <button
                      onClick={() => handleDecrement(item.book.id, item.quantity)}
                      className="p-1 hover:bg-stone-200 rounded transition-colors"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(item.book.id, item.quantity)}
                      className="p-1 hover:bg-stone-200 rounded transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 border border-stone-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-stone-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="text-green-600 font-semibold">
                    GRATIS
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>IVA (21%)</span>
                  <span>${(cart.total * 0.21).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-xl font-bold text-gray-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-amber-800">
                  ${(cart.total * 1.21).toFixed(2)}
                </span>
              </div>

              <button className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-4 rounded-xl transition-colors mb-4">
                Proceder al Pago
              </button>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Envío gratuito en todos los pedidos
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Devoluciones gratuitas hasta 30 días
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Pago seguro garantizado
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

