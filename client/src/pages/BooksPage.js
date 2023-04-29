import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { NavLink } from "react-router-dom";

const config = require("../config.json");

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/books`)
      .then((res) => res.json())
      .then((resJson) => setAlbums(resJson));
  }, []);

  const flexFormat = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  };

  return (
    <Container style={flexFormat}>
      {albums.map((book) => (
        <Box
          key={book.ISBN}
          p={3}
          m={2}
          style={{
            background: "white",
            borderRadius: "16px",
            border: "2px solid #000",
          }}
        >
          <img src={book.ImageM} alt={`${book.Title} album art`} />

          <h4>
            <NavLink to={`/albums/${book.ISBN}`}>{book.Title}</NavLink>
          </h4>
        </Box>
      ))}
    </Container>
  );
}
