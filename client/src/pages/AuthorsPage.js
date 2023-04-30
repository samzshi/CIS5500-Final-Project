import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthorsPage = () => {
  const [popularAuthors, setPopularAuthors] = useState([]);
  const [mostSearchedAuthor, setMostSearchedAuthor] = useState({});

  useEffect(() => {
    axios.get('/api/popular-authors')
      .then(response => setPopularAuthors(response.data))
      .catch(error => console.log(error));

    axios.get('/api/most-searched-author')
      .then(response => setMostSearchedAuthor(response.data[0]))
      .catch(error => console.log(error));
  }, []);

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
