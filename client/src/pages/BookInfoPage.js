import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";

const config = require("../config.json");

export default function BookInfoPage() {
  const { isbn } = useParams();

  const [bookData, setBookData] = useState({});

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/book/${isbn}`)
      .then((res) => res.json())
      .then((resJson) => setBookData(...resJson));
    console.log(bookData);
  });

  return (
    <Container>
      <Grid container direction="row">
        <Grid item xs={4}>
          <img
            key={bookData.ISBN}
            src={bookData.ImageL}
            alt={`${bookData.title}`}
            style={{
              marginTop: "40px",
              marginBottom: "40px",
              width: "300px",
              height: "400px",
            }}
          />
        </Grid>
        <Grid item direction="column" xs={8} style={{ marginTop: 40 }}>
          <h1>{bookData.Title}</h1>
          <h2>Author: {bookData.Author}</h2>
          <h3 style={{ margin: 0 }}>
            Published in {bookData.PublicationYear} by {bookData.Publisher}
          </h3>
          <h3 style={{ margin: 0 }}>
            Category:{" "}
            {bookData.Category?.substring(2, bookData.Category.length - 2)}
          </h3>
          <h3 style={{ margin: 0 }}>ISBN: {bookData.ISBN}</h3>
          <h3 style={{ margin: 0 }}>
            Average Rating: {bookData.AverageRating}
          </h3>
          <h3 style={{ margin: 0 }}>Language: {bookData.Language}</h3>
          <p>Summary: {bookData.Summary}</p>
        </Grid>
      </Grid>
      {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key="#">#</TableCell>
              <TableCell key="Title">Title</TableCell>
              <TableCell key="Plays">Plays</TableCell>
              <TableCell key="Duration">Duration</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer> */}
    </Container>
  );
}
