const express = require('express');
const league = express.Router();
const db = require('../db');
const authenticateJWT = require('../middleware/authenticateJWT');

// "http://localhost:3001/api/league"

league.get('/allPlayer', authenticateJWT, function(req, res) {
  // gives back every player in the league

  const data = [ // all the players in the league
    {
      playerName: "Steph Curry",
      position: "PG",
      playerId: 20000
    },
    {
      playerName: "Zion Williamson",
      position: "PF",
      playerId: 20001
    },
    {
      playerName: "Another Pointguard",
      position: "PG",
      playerId: 20002
    },
    {
      playerName: "some guy",
      position: "PF",
      playerId: 2003
    },
    {
      playerName: "Yep Th",
      position: "C",
      playerId: 2004
    },
    {
      playerName: "AJ TO",
      position: "SG",
      playerId: 2005
    },
    {
      playerName: "GASD DASdas",
      position: "SF",
      playerId: 2006
    },
    {
      playerName: "dasdas dasdasdasdasdas",
      position: "SF",
      playerId: 2007
    },
  ];


  return res.json(data);
});




module.exports = league;
