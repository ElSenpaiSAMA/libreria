import { Book } from '@/types';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  emptyMessage?: string;
}

export default function BookGrid({ books, emptyMessage = 'No se encontraron libros' }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

