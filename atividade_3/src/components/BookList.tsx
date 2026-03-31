import { useBooks } from '../context/BooksContext';
import { Card, CardContent, Typography } from '@mui/material';

export default function BookList() {
  const { books } = useBooks();

  return (
    <>
      {books.map((book, idx) => (
        <Card key={`${book.title}-${idx}`} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="body2">
              {book.author} - {book.publisher} ({book.year}) | Disciplina: {book.course} |
              Semestre: {book.semester}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}