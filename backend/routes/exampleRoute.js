const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');

const books = [
  {
      "author": "Chinua Achebe",
      "country": "Nigeria",
      "language": "English",
      "pages": 209,
      "title": "Things Fall Apart",
      "year": 1958
  },
  {
      "author": "Hans Christian Andersen",
      "country": "Denmark",
      "language": "Danish",
      "pages": 784,
      "title": "Fairy tales",
      "year": 1836
  },
  {
      "author": "Dante Alighieri",
      "country": "Italy",
      "language": "Italian",
      "pages": 928,
      "title": "The Divine Comedy",
      "year": 1315
  },
];

router.get('/books', authenticateJWT, (req, res) => {
  res.json(books);
});

router.post('/books', authenticateJWT, (req, res) => {
  const { role } = req.user;

  if (role !== 'admin') {
    console.log("Error: User not authorized for this route");
    return res.sendStatus(403);
  }


  const book = req.body;
  books.push(book);

  res.send('Book added successfully');
});

module.exports = router;
