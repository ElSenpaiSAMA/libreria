import { Book } from '@/types';

interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  isbn?: string[];
  cover_i?: number;
  subject?: string[];
  publisher?: string[];
  number_of_pages_median?: number;
  language?: string[];
  ratings_average?: number;
  ratings_count?: number;
  first_sentence?: string[];
}

interface OpenLibraryResponse {
  docs: OpenLibraryBook[];
  numFound: number;
}

function convertOpenLibraryBook(olBook: OpenLibraryBook): Book {
  const isbn = olBook.isbn?.[0] || '';
  const basePrice = Math.random() * 25 + 10;
  const hasDiscount = Math.random() > 0.6;
  const price = hasDiscount ? basePrice * 0.85 : basePrice;
  const originalPrice = hasDiscount ? basePrice : undefined;
  const category = mapOpenLibrarySubject(olBook.subject?.[0] || 'Fiction');
  const coverImage = olBook.cover_i 
    ? `https://covers.openlibrary.org/b/id/${olBook.cover_i}-L.jpg`
    : 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop';
  const description = olBook.first_sentence?.[0] || 
    `Una fascinante obra de ${category.toLowerCase()} que te atrapará desde la primera página.`;

  return {
    id: olBook.key.replace('/works/', ''),
    title: olBook.title,
    author: olBook.author_name?.[0] || 'Autor Desconocido',
    price: Number(price.toFixed(2)),
    originalPrice: originalPrice ? Number(originalPrice.toFixed(2)) : undefined,
    description: description,
    category: category,
    coverImage: coverImage,
    isbn: isbn,
    pages: olBook.number_of_pages_median || 0,
    language: olBook.language?.includes('spa') ? 'Español' : 'Inglés',
    publisher: olBook.publisher?.[0] || 'Editorial Desconocida',
    publishDate: olBook.first_publish_year ? `${olBook.first_publish_year}-01-01` : '2020-01-01',
    rating: olBook.ratings_average || (Math.random() * 1.5 + 3.5),
    reviews: olBook.ratings_count || Math.floor(Math.random() * 5000 + 100),
    inStock: true,
  };
}

function mapOpenLibrarySubject(subject: string): string {
  const subjectLower = subject.toLowerCase();
  
  if (subjectLower.includes('young adult') || subjectLower.includes('juvenile')) return 'Juvenil';
  if (subjectLower.includes('fantasy') || subjectLower.includes('fantasia')) return 'Ficción';
  if (subjectLower.includes('romance') || subjectLower.includes('love')) return 'Ficción';
  if (subjectLower.includes('science fiction') || subjectLower.includes('sci-fi')) return 'Ciencia';
  if (subjectLower.includes('mystery') || subjectLower.includes('thriller')) return 'Ficción';
  if (subjectLower.includes('adventure')) return 'Ficción';
  if (subjectLower.includes('horror')) return 'Ficción';
  if (subjectLower.includes('history')) return 'Historia';
  if (subjectLower.includes('biography')) return 'Biografía';
  if (subjectLower.includes('children')) return 'Infantil';
  
  return 'Ficción';
}

function removeDuplicates(books: Book[]): Book[] {
  const seen = new Set<string>();
  return books.filter(book => {
    if (seen.has(book.id)) {
      return false;
    }
    seen.add(book.id);
    return true;
  });
}

export async function fetchBooks(query: string = '', limit: number = 40): Promise<Book[]> {
  try {
    if (!query) query = 'fantasy';
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener libros de Open Library API');
    const data: OpenLibraryResponse = await response.json();
    if (!data.docs || data.docs.length === 0) return [];
    const booksWithCovers = data.docs.filter(book => book.cover_i && book.title);
    const books = booksWithCovers.map(convertOpenLibraryBook);
    return removeDuplicates(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

export async function searchBooks(searchTerm: string): Promise<Book[]> {
  return fetchBooks(searchTerm, 40);
}

export async function fetchBooksByCategory(category: string): Promise<Book[]> {
  const categoryQueries: { [key: string]: string } = {
    'Ficción': 'fiction',
    'No Ficción': 'nonfiction',
    'Ciencia': 'science fiction',
    'Tecnología': 'technology',
    'Historia': 'history',
    'Biografía': 'biography',
    'Autoayuda': 'self help',
    'Infantil': 'children',
    'Juvenil': 'young adult',
  };

  const query = categoryQueries[category] || 'fiction';
  return fetchBooks(query, 40);
}

export async function fetchFeaturedBooks(): Promise<Book[]> {
  return fetchBooks('fantasy', 10);
}

export async function fetchNewBooks(): Promise<Book[]> {
  const queries = ['fantasy', 'romance', 'adventure', 'young adult'];
  const results = await Promise.all(queries.map(query => fetchBooks(query, 10)));
  const allBooks = results.flat();
  return removeDuplicates(allBooks).slice(0, 40);
}

export async function fetchBookById(id: string): Promise<Book | null> {
  try {
    const url = `https://openlibrary.org/works/${id}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener el libro');
    const data = await response.json();
    const bookData: OpenLibraryBook = {
      key: data.key,
      title: data.title,
      author_name: data.authors?.map((a: any) => a.author?.name || 'Unknown') || [],
      first_publish_year: data.first_publish_date ? parseInt(data.first_publish_date) : undefined,
      cover_i: data.covers?.[0],
      subject: data.subjects || [],
      first_sentence: data.description ? [typeof data.description === 'string' ? data.description : data.description.value] : [],
    };
    
    return convertOpenLibraryBook(bookData);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    return null;
  }
}

