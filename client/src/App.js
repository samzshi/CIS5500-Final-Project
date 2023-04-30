import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { indigo, amber } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

import NavBar from "./components/NavBar";
import BooksPage from "./pages/BooksPage";
import BookInfoPage from "./pages/BookInfoPage";
import AuthorsPage from "./pages/AuthorsPage";


// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme
export const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});

// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
