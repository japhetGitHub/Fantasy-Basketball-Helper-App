const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


// Retrieves TOKEN_SECRET from .env 
dotenv.config();
const accessTokenSecret = process.env.TOKEN_SECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["x-access-token"] || req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // header will receive token as "Bearer xxxxxxxxx.xxxxx..."
    
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
          console.log("Error: Invalid Access Token Received", err);
          return res.sendStatus(403);
        }
        
        console.log("Access Token Successfully Verified");
        req.user = user;

        next();
    });
  } else {
      console.log("Error: Request does not contain access token in appropriate header")
      res.sendStatus(401);
  }
};

module.exports = authenticateJWT;