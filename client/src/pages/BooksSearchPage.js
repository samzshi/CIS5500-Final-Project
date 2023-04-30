import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Slider,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { formatDuration } from "../helpers/formatter";
import { NavLink } from "react-router-dom";
const config = require("../config.json");

export default function BooksSearchPage() {
  const [pageSize, setPageSize] = useState(10);
  const [books, setBooks] = useState([]);
  const [isbn, setISBN] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [catagory, setCatagory] = useState("");
  const [publicationYear, setPublicationYear] = useState([1376, 2050]);
  const [numOfRating, setNumOfRating] = useState([0, 2502]);
  const [avgRating, setAvgRating] = useState([0, 10]);

  // useEffect(() => {
  //   fetch(`http://${config.server_host}:${config.server_port}/search_songs`)
  //     .then((res) => res.json())
  //     .then((resJson) => {
  //       const songsWithId = resJson.map((song) => ({
  //         id: song.song_id,
  //         ...song,
  //       }));
  //       setBooks(songsWithId);
  //     });
  // }, []);

  const search = () => {
    fetch(
      `http://${config.server_host}:${config.server_port}/searchBooks?title=${title}&author=${author}&category=${catagory}&publicationYearStart=${publicationYear[0]}&publicationYearEnd=${publicationYear[1]}&numOfRatingStart=${numOfRating[0]}&numOfRatingEnd=${numOfRating[1]}&avgRatingStart=${avgRating[0]}&avgRatingEnd=${avgRating[1]}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        const booksWithId = resJson.map((book) => ({
          id: book.ISBN,
          ...book,
        }));
        setBooks(booksWithId);
      });
  };

  const columns = [
    {
      field: "Title",
      headerName: "Title",
      width: 300,
      renderCell: (params) => (
        <NavLink to={`/book/${params.row.ISBN}`}>{params.value}</NavLink>
      ),
    },
    { field: "Author", headerName: "Author", width: 200 },
    { field: "Category", headerName: "Catagory", width: 200 },
    { field: "PublicationYear", headerName: "Publication Year", width: 200 },
    { field: "Num_Of_Rating", headerName: "Number of Ratings", width: 200 },
    { field: "Avg_Rating", headerName: "Average Rating", width: 200 },
  ];

  return (
    <Container>
      {/* {selectedSongId && (
        <SongCard
          songId={selectedSongId}
          handleClose={() => setSelectedSongId(null)}
        />
      )} */}
      <h2>Search Books</h2>
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Catagory"
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={4}>
          <p>Publication Year</p>
          <Slider
            value={publicationYear}
            min={1376}
            max={2050}
            step={10}
            onChange={(e, newValue) => setPublicationYear(newValue)}
            valueLabelDisplay="auto"
            // valueLabelFormat={(value) => <div>{formatDuration(value)}</div>}
          />
        </Grid>
        <Grid item xs={4}>
          <p>Number of Ratings</p>
          <Slider
            value={numOfRating}
            min={0}
            max={2502}
            step={10}
            onChange={(e, newValue) => setNumOfRating(newValue)}
            valueLabelDisplay="auto"
            // valueLabelFormat={(value) => <div>{value / 1000000}</div>}
          />
        </Grid>
        <Grid item xs={4}>
          <p>Average Rating</p>
          <Slider
            value={avgRating}
            min={0}
            max={10}
            step={1}
            onChange={(e, newValue) => setAvgRating(newValue)}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
      <Button
        onClick={() => search()}
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: 30,
          border: "1px solid",
          borderColor: "#000000",
        }}
      >
        Search
      </Button>
      <h2>Results</h2>
      <DataGrid
        rows={books}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
    </Container>
  );
}
