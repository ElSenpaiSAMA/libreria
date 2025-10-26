export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  coverImage: string;
  isbn: string;
  pages: number;
  language: string;
  publisher: string;
  publishDate: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export type Category = 
  | 'Ficción'
  | 'No Ficción'
  | 'Ciencia'
  | 'Tecnología'
  | 'Historia'
  | 'Biografía'
  | 'Autoayuda'
  | 'Infantil'
  | 'Todos';

