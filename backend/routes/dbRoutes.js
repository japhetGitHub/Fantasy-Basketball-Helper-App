const express = require('express');
const router = express.Router();

const db = require('../db');

const getTeam = function() {
  console.log('BEFORE');
  return db 
  // .query(query)
  // console.log('HELLO')
  .query(`SELECT * FROM teams;`)
  // res.json({data: result.rows}
  // .then (res.send())
  .then((result) => {
    console.log('RESULT', result)
    // res.send(result.rows)
    return result.rows
  })
  .catch((err) => err);


} 

router.get('/team/all', function(req, res) {
  // console.log('HELLO');
  // res.send('HELLO')
  console.log('HELLO');
  getTeam()
    .then (result => {
      console.log(result)
      res.send(result)
    })
});


const getUserID  = function() {
  return db
  // query needs to be modified to user id
  .query(`SELECT id FROM users;`)
  .then((result) => {
    console.log('RESULT', result)
    return result.rows
  })
  .catch((err) => err);
}

// to be fixed - but not necessary
router.get('/:userID', function(req, res) {
  getUserID()
    .then (result => {
      console.log(result)
      res.send(result)
    })
});


const getAllTeams = function() {
  return db
  // query needs to be modified to take in user id
  .query(`SELECT team_name FROM teams LEFT JOIN users ON users.id = teams.user_id WHERE users.id=1`)
  .then((result) => {
    console.log('RESULT', result)
    return result.rows
  })
  .catch((err) => err);
}

router.get('/:userID/team/all', function(req, res) {
  getAllTeams()
    .then (result => {
      console.log(result)
      res.send(result)
    })
});


const getSpecificTeam = function() {
  return db
  // need user id and team id
  .query(`SELECT * FROM teams LEFT JOIN users ON users.id = teams.user_id WHERE teams.id=1 `)
  .then((result) => {
    console.log('RESULT', result)
    return result.rows
  })
  .catch((err) => err);
}

router.get('/:userID/team/:teamID', function(req, res) {
  getSpecificTeam()
    .then (result => {
      console.log(result)
      res.send(result)
    })
});


const getTeams = function() {
  return db
  // query for verification
  .query(`SELECT * FROM teams; `)
  .then((result) => {
    console.log('RESULT', result)
    return result.rows
  })
  .catch((err) => err);
}

// values need to be determined 
let sql = `INSERT INTO teams(team_name, user_id, platform)
           VALUES('test team 2', 1, 'Google')`;
db.query(sql);      

router.get('/:userID/teams', function(req, res) {
  getTeams()
    .then (result => {
      console.log('RESULT', result)
      res.send(result)
    })
  .catch((err) => err); 
});

let sql2 = `DELETE FROM teams WHERE id = 6`;
db.query(sql2);      

const getPlayerInfo = function() {
  return db
  // query for verification
  .query(`SELECT * FROM player_info 
  LEFT JOIN players_in_team ON players_in_team.player_id = player_info.playerId
  LEFT JOIN teams ON teams.id = players_in_team.team_id 
  LEFT JOIN users ON users.id = teams.user_id `)
  .then((result) => {
    console.log('RESULT', result)
    return result.rows
  })
  .catch((err) => err);
}

router.get('/:userID/:teamID/:playerID/playerinfo', function (req, res) {
  getPlayerInfo()
  .then (result => {
    console.log('RESULT', result)
    res.send(result)
  })
  .catch((err) => err); 
});

const getPlayerStats = function() {
  return db
  // query for verification
  .query(`SELECT * FROM player_stats
  LEFT JOIN player_info ON player_info.playerId = player_stats.playerId
  LEFT JOIN players_in_team ON players_in_team.player_id = player_info.playerId
  LEFT JOIN teams ON teams.id = players_in_team.team_id 
  LEFT JOIN users ON users.id = teams.user_id `)
  .then((result) => {
    console.log('RESULT', result)
    return result.rows
  })
  .catch((err) => err);
}

router.get('/:userID/:teamID/:playerID/playerstats', function (req, res) {
  getPlayerStats()
  .then (result => {
    console.log('RESULT', result)
    res.send(result)
  })
  .catch((err) => err); 
});

module.exports = router;
