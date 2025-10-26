'use client';

const categories = [
  'Todos',
  'Ficción',
  'No Ficción',
  'Ciencia',
  'Tecnología',
  'Historia',
  'Biografía',
  'Autoayuda',
  'Infantil',
  'Juvenil'
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4" id="categorias">
        Categorías
      </h2>
      <div className="flex flex-wrap gap-3">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category
                ? 'bg-amber-700 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

