import React, { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { Box } from '@mui/system';

const config = require("../config.json");

const BookRatingByLocation = () => {
  const [title, setTitle] = useState('');
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://${config.server_host}:${config.server_port}/avgRatingByLocation?title=${title}`);
      const data = await response.json();
      setBookData(data);
    };
    fetchData();
  }, [title]);

  const handleSearch = () => {
    const fetchData = async () => {
      const response = await fetch(`http://${config.server_host}:${config.server_port}/avgRatingByLocation?title=${title}`);
      const data = await response.json();
      setBookData(data);
    };
    fetchData();
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <Box mt={2}>
        <TextField
          label="Enter Book Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Box>
      <Box mt={4}>
        <Table>
          <TableBody>
            {bookData.length > 0 && bookData.map((location) => (
              <TableRow key={location.country}>
                <TableCell>{location.country}</TableCell>
                <TableCell>{location.avg_rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default BookRatingByLocation;
