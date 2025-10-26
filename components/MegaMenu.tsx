'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = {
  'Ficción': {
    sections: [
      {
        title: 'Literatura',
        links: ['Contemporánea', 'Narrativa fantástica', 'Novela de ciencia ficción', 'Novela de terror', 'Novela histórica', 'Novela negra', 'Novela romántica', 'Clásicos literarios']
      },
      {
        title: 'Géneros',
        links: ['Thriller y suspense', 'Misterio', 'Aventuras', 'Histórica', 'Romance', 'Drama', 'Poesía', 'Teatro']
      },
      {
        title: 'Por región',
        links: ['Literatura española', 'Literatura latinoamericana', 'Literatura anglosajona', 'Literatura asiática']
      },
      {
        title: 'Especiales',
        links: ['Premios literarios', 'Bestsellers', 'Autores emergentes', 'Ediciones ilustradas']
      }
    ]
  },
  'No Ficción': {
    sections: [
      {
        title: 'Humanidades',
        links: ['Autoayuda y espiritualidad', 'Ciencias humanas', 'Economía y empresa', 'Psicología y pedagogía', 'Filosofía', 'Sociología', 'Política']
      },
      {
        title: 'Ciencia y tecnología',
        links: ['Ciencias naturales', 'Divulgación científica', 'Medicina', 'Salud y dietas', 'Informática', 'Ingeniería']
      },
      {
        title: 'Historia',
        links: ['Historia de España', 'Historia universal', 'Biografías', 'Memorias', 'Historia del arte', 'Arqueología']
      },
      {
        title: 'Desarrollo personal',
        links: ['Motivación', 'Coaching', 'Productividad', 'Liderazgo', 'Mindfulness', 'Finanzas personales']
      }
    ]
  },
  'Infantil': {
    sections: [
      {
        title: 'Por edad',
        links: ['0-2 años', '3-5 años', '6-8 años', '9-11 años', '12+ años']
      },
      {
        title: 'Categorías',
        links: ['Cuentos ilustrados', 'Libros de actividades', 'Libros educativos', 'Fantasía y magia', 'Pop-up y desplegables', 'Primeros lectores']
      },
      {
        title: 'Temas',
        links: ['Animales', 'Emociones', 'Naturaleza', 'Valores', 'Aventuras', 'Humor']
      },
      {
        title: 'Colecciones populares',
        links: ['Disney', 'Superheroes', 'Princesas', 'Dinosaurios', 'Enciclopedias']
      }
    ]
  },
  'Juvenil': {
    sections: [
      {
        title: 'Géneros',
        links: ['Fantasía y magia', 'Romance y amor', 'Misterio y terror', 'Ciencia ficción', 'Aventuras', 'Paranormal', 'Histórica']
      },
      {
        title: 'Temas',
        links: ['Coming of age', 'Distopías', 'Realismo social', 'LGBTQ+', 'Amistad', 'Familia']
      },
      {
        title: 'Sagas populares',
        links: ['Fantasía épica', 'Romance contemporáneo', 'Urban fantasy', 'New adult']
      }
    ]
  },
  'Ciencia': {
    sections: [
      {
        title: 'Ciencias exactas',
        links: ['Divulgación científica', 'Ciencias naturales', 'Matemáticas', 'Física', 'Química', 'Astronomía', 'Biología']
      },
      {
        title: 'Ciencias de la salud',
        links: ['Medicina', 'Salud y dietas', 'Nutrición', 'Psicología', 'Farmacia', 'Veterinaria']
      },
      {
        title: 'Tecnología',
        links: ['Informática', 'Programación', 'Inteligencia artificial', 'Robótica', 'Ciencia de datos']
      }
    ]
  },
  'Arte y Cultura': {
    sections: [
      {
        title: 'Artes visuales',
        links: ['Pintura', 'Escultura', 'Fotografía', 'Diseño gráfico', 'Arquitectura', 'Cine', 'Moda']
      },
      {
        title: 'Artes escénicas',
        links: ['Teatro', 'Danza', 'Música', 'Opera', 'Performance']
      },
      {
        title: 'Cultura general',
        links: ['Historia del arte', 'Crítica de arte', 'Museos', 'Exposiciones', 'Patrimonio cultural']
      },
      {
        title: 'Gastronomía',
        links: ['Cocina española', 'Cocina internacional', 'Repostería', 'Vinos', 'Cocina saludable']
      }
    ]
  },
  'Cómics y Manga': {
    sections: [
      {
        title: 'Cómics',
        links: ['Superhéroes', 'Marvel', 'DC Comics', 'Cómic europeo', 'Novela gráfica', 'Humor gráfico', 'Cómic español']
      },
      {
        title: 'Manga',
        links: ['Shonen', 'Shojo', 'Seinen', 'Josei', 'Kodomo', 'Isekai', 'Romance']
      },
      {
        title: 'Géneros',
        links: ['Acción', 'Aventuras', 'Fantasía', 'Ciencia ficción', 'Terror', 'Deportes', 'Slice of life']
      }
    ]
  },
  'Libros de Texto': {
    sections: [
      {
        title: 'Educación primaria',
        links: ['Matemáticas', 'Lengua', 'Ciencias naturales', 'Ciencias sociales', 'Inglés', 'Educación física']
      },
      {
        title: 'Educación secundaria',
        links: ['Matemáticas', 'Lengua y literatura', 'Física y química', 'Biología', 'Historia', 'Geografía', 'Filosofía']
      },
      {
        title: 'Bachillerato',
        links: ['Ciencias', 'Humanidades', 'Idiomas', 'Selectividad']
      },
      {
        title: 'Universidad',
        links: ['Ingeniería', 'Medicina', 'Derecho', 'Economía', 'Arquitectura', 'Informática']
      }
    ]
  }
};

interface MegaMenuProps {
  category: string;
  isOpen: boolean;
}

export default function MegaMenu({ category, isOpen }: MegaMenuProps) {
  if (!isOpen || !categories[category as keyof typeof categories]) {
    return null;
  }

  const categoryData = categories[category as keyof typeof categories];

  return (
    <div key={category} className="absolute left-0 right-0 top-full bg-stone-100 shadow-xl z-50 animate-fade-in-down">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categoryData.sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={`/coleccion?categoria=${encodeURIComponent(link)}`}
                      className="text-sm text-gray-600 hover:text-amber-700 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

