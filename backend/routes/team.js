const express = require('express');
const team = express.Router();

// Access all team
team.get('/', function(req, res, next) {
  res.json({});
});

team.get('/:id', function (req, res, next){
  res.json({id:1});
  console.log("test");
});

module.exports = team;
