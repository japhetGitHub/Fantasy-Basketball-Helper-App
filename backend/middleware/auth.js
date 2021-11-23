const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const users = [
  {
      username: 'john',
      password: 'admin123',
      role: 'admin'
  }, {
      username: 'anna',
      password: 'user123',
      role: 'user'
  }, {
      username: 'test',
      password: 'pass',
      role: 'user'
  }
];

dotenv.config();

const accessTokenSecret = process.env.TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
let refreshTokens = [];

router.post('/login', (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;
  // console.log(req.body)

  // Filter user from the users array by username and password (later should be changed to a db lookup w/ password digest)
  const user = users.find(u => { return u.username === username && u.password === password });

  if (user) {
      // Generate an access token and a refresh token
      const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret, { expiresIn: '3s' });
      const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);
      
      refreshTokens.push(refreshToken); // add refresh token to array (later should be changed to a db insert)

      res.json({
          accessToken,
          refreshToken
      });
  } else {
      res.status(401).send('Username or password incorrect');
  }
});

router.post('/register', (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;

  if (!username || !password) {
    return res.sendStatus(401);
  }
  const user = { 
    username,
    password,
    role: "user"
  }; 
  users.push(user);

  // Generate an access token and a refresh token
  const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret, { expiresIn: '5m' });
  const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);
  
  refreshTokens.push(refreshToken); // save refresh token

  console.log("Registration Successful!", user);
  res.json({
      accessToken,
      refreshToken
  });
 
});

router.post('/token', (req, res) => { // receives requests for new access token  
  const { token } = req.body; // body contains refresh token

  if (!token) {
      return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) { // must be valid refresh token
      return res.sendStatus(403);
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => { // generates new access token based on verified refresh token
      if (err) {
          return res.sendStatus(403);
      }

      const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '5m' });

      res.status(201).json({
          accessToken // returns new access token
      });
  });
});

router.post('/logout', (req, res) => {
  const { token } = req.body;
  // removes refresh token when user logs out so that a new access token cannot be maliciously recreated
  refreshTokens = refreshTokens.filter(t => t !== token);

  res.send("Logout successful");
});

module.exports = router;