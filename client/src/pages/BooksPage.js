import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";

const config = require("../config.json");

export default function BooksPage() {
  const { title } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    title == null
      ? fetch(`http://${config.server_host}:${config.server_port}/books`)
          .then((res) => res.json())
          .then((resJson) => setBooks(resJson))
      : fetch(
          `http://${config.server_host}:${config.server_port}/search?title=${title}`
        )
          .then((res) => res.json())
          .then((resJson) => setBooks(resJson));
  }, []);

  const flexFormat = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  };

  return (
    <Container>
      {books.length > 0 ? (
        <>
          <h3 style={{ textAlign: "center", fontSize: "32px" }}>Book of the day for you!</h3>
          <Box
            key={books[0].ISBN}
            p={3}
            m={2}
            style={{
              background: "white",
              borderRadius: "16px",
              border: "2px solid #000",
              width: "300px",
              height: "400px",
              margin: "0 auto",
            }}
          >
            <img
              src={books[0].ImageL}
              alt={`${books[0].Title} album art`}
              style={{ width: 250, height: 350 }}
            />
            <h4>
              <NavLink to={`/book/${books[0].ISBN}`}>{books[0].Title}</NavLink>
            </h4>
          </Box>
          <Container style={{ ...flexFormat, marginTop: "50px" }}>
            {books.slice(1).map((book) => (
              <Box
                key={book.ISBN}
                p={3}
                m={2}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  border: "2px solid #000",
                  width: "300px",
                  height: "400px",
                }}
              >
                <img
                  src={book.ImageL}
                  alt={`${book.Title} album art`}
                  style={{ width: 250, height: 350 }}
                />

                <h4>
                  <NavLink to={`/book/${book.ISBN}`}>{book.Title}</NavLink>
                </h4>
              </Box>
            ))}
          </Container>
        </>
      ) : (
        <h1>No books found</h1>
      )}
    </Container>
  );
}
