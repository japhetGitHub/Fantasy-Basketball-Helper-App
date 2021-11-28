const express = require('express');
const sportApi = express.Router();
const fillTables = require('./fillTables.js');
const  { fillNbaTeamsTable, fillPlayersTable, fillSeasonStatsTable, fillGameStatsTable, altFillGameStatsTable, seedSampleData } = require('./populateDb.js');

// const authenticateJWT = require('../middleware/authenticateJWT.js');


sportApi.get('/all', function(req, res) {

  Promise.all([fillTables()]).then(() => {
    res.status(201).json({ msg: "Great Success!"});
  }).catch((err) => {
    console.log(err);
    res.status(404).json({ msg: "Error"});
  });

})

sportApi.get('/fill', function(req, res) {

  fillNbaTeamsTable()
    .then(() => fillPlayersTable())
    .then(() => fillSeasonStatsTable())
    .then(() => altFillGameStatsTable())
    .then(() => res.status(201).json({ msg: "Success filling seasonstats, gamestats tables!"}))
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "Error"});
    });

})

sportApi.get('/seed', function(req, res) {

  seedSampleData("test");
  res.status(201).json({ msg: "Success seeding sample user and team data!"});

})


module.exports = sportApi;

// "IsGameOver": true,
// "IsClosed": true,