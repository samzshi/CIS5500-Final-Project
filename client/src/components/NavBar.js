import { AppBar, Container, Toolbar, Typography, Input, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavText = ({ href, text, isMain }) => {
  return (
    <Typography
      variant={isMain ? "h4" : "h6"}
      noWrap
      style={{
        fontFamily: "Montserrat",
        fontWeight: 700,
        letterSpacing: "0.1rem",
        color: "#fff",
        marginRight: "1.5rem"
      }}
    >
      <NavLink
        to={href}
        style={{
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {text}
      </NavLink>
    </Typography>
  );
};

export default function NavBar() {
  return (
    <AppBar position="static" style={{ backgroundColor: "#FFA500" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavText href="/" text="PagePal" isMain />
          <NavText href="/filter" text="Search" />
          <NavText href="/Authors" text="Authors" />
          <NavText href="/bookratingbylocation" text="Geography" />
          <Input
            placeholder="Search books by title..."
            disableUnderline
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "0.5rem 1rem",
              width: "20rem",
              marginRight: "1.5rem"
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = `/search/${e.target.value}`;
              }
            }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}