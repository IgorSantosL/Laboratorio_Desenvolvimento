import { useMemo, useState } from 'react';
import { useBooks } from '../context/BooksContext';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

export default function CourseFilter() {
  const { books } = useBooks();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const courses = useMemo(
    () => [...new Set(books.map((book) => book.course))].sort((a, b) => a.localeCompare(b)),
    [books]
  );

  const semesters = useMemo(
    () => [...new Set(books.map((book) => book.semester))].sort((a, b) => a - b),
    [books]
  );

  const filteredBooks = books.filter((book) => {
    const matchesCourse = selectedCourse === '' || book.course === selectedCourse;
    const matchesSemester =
      selectedSemester === '' || book.semester === Number(selectedSemester);

    return matchesCourse && matchesSemester;
  });

  const handleCourseChange = (event: SelectChangeEvent) => {
    setSelectedCourse(event.target.value);
  };

  const handleSemesterChange = (event: SelectChangeEvent) => {
    setSelectedSemester(event.target.value);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Filtrar livros
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          marginBottom: 3,
        }}
      >
        <FormControl sx={{ minWidth: 280 }}>
          <InputLabel id="course-label">Disciplina</InputLabel>
          <Select
            labelId="course-label"
            value={selectedCourse}
            label="Disciplina"
            onChange={handleCourseChange}
          >
            <MenuItem value="">Todas</MenuItem>
            {courses.map((course) => (
              <MenuItem key={course} value={course}>
                {course}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="semester-label">Semestre</InputLabel>
          <Select
            labelId="semester-label"
            value={selectedSemester}
            label="Semestre"
            onChange={handleSemesterChange}
          >
            <MenuItem value="">Todos</MenuItem>
            {semesters.map((semester) => (
              <MenuItem key={semester} value={String(semester)}>
                {semester}º semestre
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {filteredBooks.length} livro(s) encontrado(s)
      </Typography>

      {filteredBooks.length > 0 ? (
        filteredBooks.map((book, idx) => (
          <Card key={`${book.title}-${idx}`} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography variant="body2">
                <strong>Autor:</strong> {book.author}
              </Typography>
              <Typography variant="body2">
                <strong>Editora:</strong> {book.publisher}
              </Typography>
              <Typography variant="body2">
                <strong>Ano:</strong> {book.year}
              </Typography>
              <Typography variant="body2">
                <strong>Disciplina:</strong> {book.course}
              </Typography>
              <Typography variant="body2">
                <strong>Semestre:</strong> {book.semester}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">
          Nenhum livro encontrado para os filtros selecionados.
        </Typography>
      )}
    </>
  );
}