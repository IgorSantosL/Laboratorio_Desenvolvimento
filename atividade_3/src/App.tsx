import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { AppBar, Button, Container, Toolbar } from '@mui/material';
import { BooksProvider } from './context/BooksContext';
import Home from './pages/Home';
import Course from './pages/Course';

export default function App() {
  return (
    <BooksProvider>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={RouterLink} to="/">
              Início
            </Button>
            <Button color="inherit" component={RouterLink} to="/cursos">
              Filtrar por Disciplina/Semestre
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cursos" element={<Course />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </BooksProvider>
  );
}