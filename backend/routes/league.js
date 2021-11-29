const express = require('express');
const league = express.Router();
const db = require('../db');
const authenticateJWT = require('../middleware/authenticateJWT');
const options = {
  client: 'pg',
  connection: {
      host: '127.0.0.1',
      port: '5432',
      user: 'labber',
      password: 'labber',
      database: 'fantasy_basket'
  }
}
const knex = require('knex')(options);

// "http://localhost:3001/api/league"

league.get('/allPlayer', authenticateJWT, function(req, res) {
    return knex('player')
    .select('player_name', 'position', 'player_id')
    .then((answer) => res.json(answer))
});




module.exports = league;
