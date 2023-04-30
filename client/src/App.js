import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { indigo, amber } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

import NavBar from "./components/NavBar";
import BooksPage from "./pages/BooksPage";
import BookInfoPage from "./pages/BookInfoPage";
import BookRatingByLocation from "./pages/Geography";
import BooksSearchPage from "./pages/BooksSearchPage";

export const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/book/:isbn" element={<BookInfoPage />} />
          <Route path="/search/:title" element={<BooksPage />} />
          <Route path="/popularAuthors" element={<AuthorsPage />} />
          <Route path="/mostPopularAuthorSearched" element={<AuthorsPage />} />
          <Route path="/bookratingbylocation" element={<BookRatingByLocation />} />
          <Route path="/filter" element={<BooksSearchPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
