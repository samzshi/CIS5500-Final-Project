const express = require("express");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.get("/booksByFeatures", routes.filterBooksWFeatures);
app.get("/booksByRating", routes.filterBooksWRatings);
app.get("/basicAnalysis", routes.basicAnalysis);
app.get("/book/:ISBN", routes.getBook);
app.get("/bookCover", routes.getBookCover);
app.get("/getBookRatingsMap", routes.getBookRatingsMap);
app.get("/avgRatingByLocation", routes.avgRatingByLocation);
app.get("/ageGroupByLocation", routes.ageGroupByLocation);
app.get("/popularAuthors", routes.getPopularAuthors);
app.get("/mostPopularAuthorSearched", routes.mostPopularAuthorSearched);
app.get("/books", routes.temp);
app.get("/search", routes.searchBooksByTitle);
app.get("/searchBooks", routes.searchBooks);

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  );
});

module.exports = app;
