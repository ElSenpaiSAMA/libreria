import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src="/logo.png" 
                alt="Mundo del Libro" 
                width={30} 
                height={30}
                className="object-contain"
              />
              <h3 className="text-xl font-bold text-white">Mundo Libros</h3>
            </div>
            <p className="text-sm mb-4">
              Tu librería online de confianza. Descubre miles de títulos y recíbelos en la comodidad de tu hogar.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@mundo-libros.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Barcelona, España</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-amber-400 transition-colors">Inicio</a>
              </li>
              <li>
                <a href="/coleccion" className="hover:text-amber-400 transition-colors">Colección</a>
              </li>
              <li>
                <a href="/novedades" className="hover:text-amber-400 transition-colors">Novedades</a>
              </li>
              <li>
                <a href="/carrito" className="hover:text-amber-400 transition-colors">Carrito</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Información</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Sobre nosotros</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Política de privacidad</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Términos y condiciones</a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">Envíos y devoluciones</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2025 Mundo Libros. Todos los derechos reservados a Matias Speroni.</p>
        </div>
      </div>
    </footer>
  );
}

