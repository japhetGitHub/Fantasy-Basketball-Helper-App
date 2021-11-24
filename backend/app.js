const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors =require("cors");
const db = require('./db');
const app = express();
const axios = require('axios');
var CronJob = require('cron').CronJob;

app.use(cors({origin: "*", credential: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create this for every routes group
const teamRouter = require('./routes/team');
const { application_name } = require('pg/lib/defaults');

// do this for every routes group, it's gonna use the file in routes/'name of the route' so create that file too
// app.use('/api/team', teamRouter);

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

app.get('/api/team/all', function(req, res) {
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
app.get('/api/:userID', function(req, res) {
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

app.get('/:userID/team/all', function(req, res) {
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

app.get('/:userID/team/:teamID', function(req, res) {
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

app.get('/:userID/teams', function(req, res) {
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

app.get('/:userID/:teamID/:playerID/playerinfo', function (req, res) {
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

app.get('/:userID/:teamID/:playerID/playerstats', function (req, res) {
  getPlayerStats()
  .then (result => {
    console.log('RESULT', result)
    res.send(result)
  })
  .catch((err) => err); 
});

const getPlayerStatsForDB = async function(formattedYesterday) {
  
  const headers = {
    "Ocp-Apim-Subscription-Key": "ce0935001bf94813a935f4593acd1514"
  }
  // const today = new Date()
  // const formattedDate = today.slice(0, 10)
  // 2021-11-22
  // 012345678910
  console.log("++++++++++++++++++++++++++++++++++++", formattedYesterday);
  //  return
  //  date example: 2021-NOV-20
  //  note: today's date returns no values 
  const url = `https://api.sportsdata.io/v3/nba/stats/json/PlayerGameStatsByDate/${formattedYesterday}`
  console.log("URL ===", url)

  try {
    const {data} = await axios.get(url, {headers: headers})
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}


// Only call this function if you need a daily update - change line 215!
// why does cronjob get called even job.start is commented?
// var job = new CronJob('* * * * * *', function() {
//   console.log('You will see this message every second');

//   // const date = new Date()
//   // const formattedDate = date.toISOString().split('T')[0]
//   // getPlayerStatsForDB(formattedDate);

//   const yesterday = new Date(new Date().setDate(new Date().getDate()-1));
//   const formattedYesterday = yesterday.toISOString().split('T')[0]
//   // console.log('YESTERDAY', formattedYesterday);
//   getPlayerStatsForDB(formattedYesterday);

// }, null, true, 'America/Los_Angeles');
// job.start();

// const date = new Date()
// let formattedDate = (date.setDate(date.getDate() - 1));
// formattedDate = date.toISOString().split('T')[0]

// Today's date gives no values, need to input yesterday
const yesterday = new Date(new Date().setDate(new Date().getDate()-1));
const formattedYesterday = yesterday.toISOString().split('T')[0]
console.log('YESTERDAY', formattedYesterday);
getPlayerStatsForDB(formattedYesterday);

// // This is all in the quick start from Francis but it's gonna depend on JWT if we use or not
// app.get('/api/authenticate');
// app.post('/api/login');
// app.post('/api/register');

console.log("Listening on port 3001...");


// app.listen(3002);

module.exports = app;
