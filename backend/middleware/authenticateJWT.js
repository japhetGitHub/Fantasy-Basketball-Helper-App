const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Retrieves TOKEN_SECRET from .env 
dotenv.config();
const accessTokenSecret = process.env.TOKEN_SECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

module.exports = authenticateJWT;