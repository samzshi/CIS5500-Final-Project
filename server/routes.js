const mysql = require("mysql");
const config = require("./config.json");

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const db = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
});
db.connect((err) => err && console.log(err));

const searchBooks = async function (req, res) {
  const {
    title,
    author,
    category,
    publicationYearStart,
    publicationYearEnd,
    numOfRatingStart,
    numOfRatingEnd,
    avgRatingStart,
    avgRatingEnd,
  } = req.query;

  const query =
    "with rate as (select book, avg(rating) as Avg_Rating, count(rating) as Num_of_Rating from Rates group by book) select * from Books_basic a join Books_extras b on a.ISBN = b.ISBN join rate on rate.book = a.ISBN where Title like '%" +
    (title == "" ? "'" : title + "%'") +
    " and Author like '%" +
    (author == "" ? "'" : author + "%'") +
    " and Category like '%" +
    (category == "" ? "'" : category + "%'") +
    " and PublicationYear between " +
    publicationYearStart +
    " and " +
    publicationYearEnd +
    " and Num_of_Rating between " +
    numOfRatingStart +
    " and " +
    numOfRatingEnd +
    " and Avg_Rating between " +
    avgRatingStart +
    " and " +
    avgRatingEnd +
    " limit 100";

  db.query(query, [], (err, data) => {
    if (err) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

const searchBooksByTitle = async function (req, res) {
  const { title } = req.query;
  console.log(title);
  const query =
    "SELECT * FROM Books_basic WHERE Title LIKE '%" + title + "%' limit 100";
  db.query(query, [], (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

const filterBooksWFeatures = async function (req, res) {
  const { features } = req.query;
  const featuresArr = features.split(",");

  const query = `
                SELECT a.ISBN, a.Title
                FROM Books_basic a
                LEFT JOIN Books_extra b
                ON a.ISBN = b.ISBN
                WHERE
                a.Title = input1
                AND
                a.Author = input2
                AND
                a.Publisher = input3
                AND
                b.Category = input4
                ORDER BY a.Title ASC
        `;

  db.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

const filterBooksWRatings = async function (req, res) {
  const { ratings } = req.query;
  const ratingsArr = ratings.split(",");

  const query = `
                SELECT a.ISBN, a.Title
                FROM Books_basic a
                LEFT JOIN Ratings b
                ON a.ISBN = b.ISBN
                GROUP BY a.ISBN
                HAVING
                AVG(b.ratings) >= input1
                AND
                MAX(b.ratings) >= input2
                AND
                COUNT(b.ratings) >= input3
                ORDER BY a.Title ASC
        `;

  db.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

const basicAnalysis = async function (req, res) {
  const query = `
                SELECT a.Category, AVG(b.ratings), COUNT(b.ratings), COUNT(a.ISBN)
                FROM Books_extra a
                JOIN Ratings b
                ON a.ISBN = b.ISBN
                GROUP BY a.Category
                ORDER BY a.Category ASC
        `;

  db.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

const getBook = async function (req, res) {
  const { ISBN } = req.params;

  // const query = `select * from Books_basic where ISBN = ${connection.escape(
  //   ISBN
  // )}`;

  const query = `
                SELECT a.ISBN, Title, PublicationYear, Publisher, Author, ImageL, Category, Language, Summary, AverageRating
                FROM
                (SELECT * FROM Books_basic WHERE ISBN = ${db.escape(ISBN)}) a
                JOIN (SELECT * FROM Books_extras WHERE ISBN = ${db.escape(
                  ISBN
                )}) b
                ON a.ISBN = b.ISBN
                JOIN (SELECT Book, AVG(Rating) AS AverageRating FROM Rates WHERE Book = ${db.escape(
                  ISBN
                )}) c
                ON a.ISBN = c.Book
                `;

  db.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

const getBookCover = async function (req, res) {
  const { ISBN } = req.query;

  const query = `
                SELECT Title, ImageL
                FROM Books_basic
        `;

  db.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

const getBookRatingsMap = async function (req, res) {
  const { ISBN } = req.query;

  const query = `
          SELECT BB.title, GROUP_CONCAT(SUBSTRING_INDEX(SUBSTRING_INDEX(U.location, ',', -1), ',', 1) ORDER BY U.location) AS Locations
          FROM (Books_basic BB JOIN Rates R ON BB.ISBN = R.Book) JOIN Users U ON
          U.ID = R.ID
          WHERE title = "${ISBN}"
          GROUP BY BB.title
          ORDER BY BB.title
        `;

  db.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

const avgRatingByLocation = async function (req, res) {
  const { title } = req.query;

  const query = `
            SELECT DISTINCT BR.ISBN, SUBSTRING_INDEX(BR.location, ',', -1) AS country, AVG(BR.Rating) AS avg_rating
            FROM (
                SELECT BB.ISBN, R.Rating, U.location
                FROM (Books_basic BB JOIN Ratings R ON BB.ISBN = R.Book) JOIN Users U ON U.ID = R.ID
                GROUP BY BB.ISBN
            ) BR
            WHERE BR.ISBN = "${title}"
            GROUP BY country
        `;

  db.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

const ageGroupByLocation = async function (req, res) {
  const query = `
        SELECT BR.Title, SUBSTRING_INDEX(BR.Location, ',', -1) AS country, MIN(BR.Age), MAX(BR.Age)
        FROM (
            SELECT BB.Title, U.Age, U.location
            FROM (Books_basic BB JOIN Ratings R ON BB.ISBN = R.Book) JOIN Users U ON U.ID = R.ID
        ) BR
        GROUP BY BR.Title, country;
    `;

  db.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

const getPopularAuthors = async function (req, res) {
  const query = `
                WITH book_rating AS {
                SELECT COUNT(*) as num_book_rating, SUM(Rating) as total_rating, Book
                FROM Ratings r
                GROUP BY Book
                }, author_rating AS {
                SELECT SUM(num_book_rating) as num_rating, AVG(total_rating) as
                avg_rating, bb.Author
                FROM book_rating br
                JOIN Books_basic bb ON br.Book = bb.ISBN
                GROUP BY bb.Author
                }, num_books AS {
                SELECT Author, Count(*) as num_books
                FROM Books_basic
                GROUP BY Author
                }
                SELECT n.Author, n.num_books, a.num_rating, avg_rating
                FROM num_books n
                JOIN author_rating a ON n.Author = a.Author
                ORDER BY a.num_rating, avg_rating, n.num_books
                LIMIT 100;
        `;

  db.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

const mostPopularAuthorSearched = async function (req, res) {
  const query = `
                WITH new_books AS {
                SELECT ISBN, NumSearched
                FROM Books_meta b
                WHERE b.DateImported BETWEEN (CURDATE() - INTERVAL 1 YEAR) AND
                CURDATE()
                }
                SELECT b.Author, SUM(n.NumSearched) as search_count
                FROM new_books n
                JOIN Books_basic b ON n.ISBN = b.ISBN
                GROUP BY b.Author
                ORDER BY search_count
                LIMIT 1
        `;

  db.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

const temp = async function (req, res) {
  const query = `select * from Books_basic limit 100`;
  db.query(query, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
    }
  });
};

module.exports = {
  filterBooksWFeatures,
  filterBooksWRatings,
  basicAnalysis,
  getBook,
  getBookCover,
  getBookRatingsMap,
  avgRatingByLocation,
  ageGroupByLocation,
  getPopularAuthors,
  mostPopularAuthorSearched,
  temp,
  searchBooksByTitle,
  searchBooks,
};
