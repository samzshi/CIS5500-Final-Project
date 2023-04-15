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
app.get("/book", routes.getBook);
app.get("/bookCover", routes.getBookCover);
app.get("/bookRatingMap", routes.getBookRatingMap);
app.get("/avgRatingByLocation", routes.avgRatingByLocation);
app.get("/ageGroupByLocation", routes.ageGroupByLocation);
app.get("/popularAuthors", routes.getpopularAuthors);
app.get("/mostPopularAuthorSearched", routes.mostPopularAuthorSearched);

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  );
});

module.exports = app;
