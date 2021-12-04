const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');
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

router.get('/season/:teamId', authenticateJWT, (req, res) => {
  knex('players_in_team')
    .where({ team_id: req.params.teamId })
    .select('player_id')
    .then((players) => {
      Promise.all(players.map(player => (
        //look up player season stats for each playerId
        knex('players_season_stats')
          .join('player', {'players_season_stats.player_id': 'player.player_id'})
          .where({ 'player.player_id': player.player_id })
          .select()
          .then((playerSeasonData) => {
            const {
              id,
              position_category,
              photo_url,
              team_id,
              ...finalPlayerSeasonData
            } = playerSeasonData[0];

            const entries = [];
            for (const [key, value] of Object.entries(finalPlayerSeasonData)) {
              entries.push([key.replace(/_/g, '').toLowerCase(), value]);
            }
            const cleanedPlayerSeasonData = Object.fromEntries(entries);

            return cleanedPlayerSeasonData;
          })
      ))).then((results) =>{ 
        console.log("Player Season Data Sent Successfully!"); 
        res.json(results);
      })
    }).catch(err => { 
      console.log(err); 
      res.sendStatus(500)
    });
});

router.get('/latest/:teamId', authenticateJWT, (req, res) => {
  knex('players_in_team')
    .where({ team_id: req.params.teamId })
    .select('player_id')
    .then((players) => {
      Promise.all(players.map(player => (
        //look up player season stats for each playerId
        knex('players_game_stats')
          .join('player', {'players_game_stats.player_id': 'player.player_id'})
          .where({ 'player.player_id': player.player_id })
          .select()
          .limit(1)
          .then((playerGameData) => {
            const {
              opponent_rank,
              opponent_position_rank,
              global_team_id,
              game_id,
              opponent_id,
              home_or_away,
              position_category,
              photo_url,
              team_id,
              ...finalPlayerGameData
            } = playerGameData[0];

            const entries = [];
            for (const [key, value] of Object.entries(finalPlayerGameData)) {
              entries.push([key.replace(/_/g, '').toLowerCase(), value]);
            }
            const cleanedPlayerGameData = Object.fromEntries(entries);

            return cleanedPlayerGameData;
          })
      ))).then((results) =>{ 
        console.log("Latest Player Game Data Sent Successfully!"); 
        res.json(results);
      })
    }).catch(err => { 
      console.log(err); 
      res.sendStatus(500);
    })
});

router.get('/:teamId/fanpoints/all', authenticateJWT, (req, res) => {
  knex('players_in_team')
    .where({ team_id: req.params.teamId })
    .select('player_id')
    .then((players) => {
      Promise.all(players.map(player => (
        //look up player season stats for each playerId
        playerFantasyPointsHistory(player.player_id)
          .then((playerFantasyPointsHistory) => {
            return playerFantasyPointsHistory;
          })
      ))).then((results) =>{ 
        console.log("playerFantasyPointsHistory Data Sent Successfully!"); 
        res.json(results);
      })
    }).catch(err => { 
      console.log(err); 
      res.sendStatus(500);
    })
});

const playerFantasyPointsHistory = (playerId) => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  const daysAgo = 14; // this variable determines how many days back to look in a player's game history
  pastDate.setDate(pastDate.getDate() - daysAgo);
  const dateStr = `${pastDate.getFullYear()}-${pastDate.getMonth()}-${pastDate.toLocaleString('default', { day: '2-digit' })}`;

  return knex.select(knex.raw(` players_game_stats.fantasy_points_yahoo as fantasyPointsYahoo, player.player_name as playerName from players_game_stats join player on players_game_stats.player_id = player.player_id where player.player_id=${playerId} order by date_time asc`)).then(fantasyPointsHistory => {
    return fantasyPointsHistory
  })
};

module.exports = router;
