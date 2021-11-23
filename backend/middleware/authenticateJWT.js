// const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


// Retrieves TOKEN_SECRET from .env 
dotenv.config();
const accessTokenSecret = process.env.TOKEN_SECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["x-access-token"] || req.headers.authorization;
  console.log("TEST 1", authHeader);
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // header will receive token as "Bearer xxxxxxxxx.xxxxx..."
    console.log("TEST 2", token);
    
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
          console.log("TEST 3", err);
          return res.sendStatus(403);
        }
        
        req.user = user;
        console.log("TEST 4", req.user);

        next();
    });
  } else {
      res.sendStatus(401);
  }
};

module.exports = authenticateJWT;