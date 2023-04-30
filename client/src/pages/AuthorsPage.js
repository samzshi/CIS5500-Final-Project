import React, { useState, useEffect } from 'react';

const config = require("../config.json");

const AuthorsPage = () => {
  const [popularAuthors, setPopularAuthors] = useState([]);
  const [mostSearchedAuthor, setMostSearchedAuthor] = useState({});

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/popularAuthors`)
      .then(response => response.json())
      .then(data => setPopularAuthors(data))
      .catch(error => console.log(error));

    fetch('/api/mostPopularAuthorSearched')
      .then(response => response.json())
      .then(data => setMostSearchedAuthor(data[0]))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    console.log(popularAuthors);
  }, [popularAuthors]);

  return (
    <div>
      <h1>Popular Authors</h1>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Number of Books</th>
            <th>Number of Ratings</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {popularAuthors.map(author => (
            <tr key={author.Author}>
              <td>{author.Author}</td>
              <td>{author.num_books}</td>
              <td>{author.num_rating}</td>
              <td>{author.avg_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Most Searched Author</h1>
      <p>{mostSearchedAuthor.Author}</p>
      <p>{mostSearchedAuthor.search_count} searches in the past year</p>
    </div>
  );
};

export default AuthorsPage;
