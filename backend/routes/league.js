const express = require('express');
const league = express.Router();
const db = require('../db');
const authenticateJWT = require('../middleware/authenticateJWT');
const axios = require('axios');
const dotenv = require('dotenv').config();

const options = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
}
const knex = require('knex')(options);

league.get('/allPlayer', authenticateJWT, function(req, res) {
    return knex('player')
    .select('player_name', 'position', 'player_id')
    .then((answer) => res.json(answer))
});

league.get('/news/:playerId', function(req, res) {
  return axios.get(`https://api.sportsdata.io/v3/nba/scores/json/NewsByPlayerID/${req.params.playerId}`, {headers: {"Ocp-Apim-Subscription-Key":"a670e2e31fbf47369d09c70d535d8fb8"}})
  .then(response => res.json(response.data));
});

module.exports = league;
