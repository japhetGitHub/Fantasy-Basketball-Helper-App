const express = require('express');
const team = express.Router();
const db = require('../db');
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
const authenticateJWT = require('../middleware/authenticateJWT');

// "http://localhost:3001/api/team"

team.get('/all', authenticateJWT, function(req, res) {
  // gives back every team this user is having
  // const data = [
  //   {
  //     teamId: 1,
  //     teamName: "team1",
  //     topPerformer: {
  //       name: "steph",
  //       image: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nba/low-res/20000485.png",
  //     },
  //     worstPerformer: {
  //       name: "zion",
  //       image: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nba/low-res/20002271.png"
  //     },
  //     totalFanPoints: 871
  //   },
  //   {
  //     teamId: 2,
  //     teamName: "team2",
  //     topPerformer: {
  //       name: "stephen",
  //       image: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nba/low-res/20000485.png",
  //     },
  //     worstPerformer: {
  //       name: "zion willi",
  //       image: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nba/low-res/20002271.png"
  //     },
  //     totalFanPoints: 934
  //   }
  // ];

  // get this user from users table
  const { username } = req.user;

  knex('users')
    .where({ email: username })
    .select('id')
    .then((user) => knex('teams').where({ user_id: user[0].id }).select())
    .then((teams) => {
      // do some code here to determine the best and worst performer for each team in teams[] then add that data to teamData
      // -> do a lookup in players_in_team for all relevant player_id's 
      // -> then do a lookup (1 user team at a time) in players_season_stats retrieving the fantasy_points_(blank) for the correct platform
      // -> then sort the resulting array of fantasy points and single out the highest and lowest for best and worst player respectively. also summ all the fantasy points for totalFanPoints property
      // -> then do a last lookup in player table by the player_id of the best and worst players to retrieve their name and image link

      const teamData = teams.map((team) => ({ 
        id: team.id, 
        team_name: team.team_name, 
        platform: team.platform 
      }));
      console.log("teamData:", teamData);
      res.sendStatus(200);
    })
    .catch((err) => console.log(err));


  // return res.sendStatus(200);
});


team.get('/overview/:teamId', authenticateJWT, function(req, res) {
  // gives back every player this team is having, used in the manage player too
  console.log("gets the team")
  const data = {
    teamName: "teamNameHere",
    players: [
      {
        playerId: 20000,
        playerFirstName: "Steph",
        playerLastName: "Curry",
        playerImage: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nba/low-res/20000485.png",
        position: "PG",
        lastWeekPoints: 200,
        lastWeekFan: 50,
        lastWeekBlocks: 30,
        lastWeekSteals: 10,
        lastWeekGame:10
      },
      {
        playerId: 20001,
        playerFirstName: "Zion",
        playerLastName: "Williamson",
        playerImage: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nba/low-res/20002271.png",
        position: "PF",
        lastWeekPoints: 100,
        lastWeekFan: 10,
        lastWeekBlocks: 10,
        lastWeekSteals: 10,
        lastWeekGame:9
      },
      {
        playerId: 20002,
        playerFirstName: "Another",
        playerLastName: "Point guard",
        playerImage: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nba/low-res/20000485.png",
        position: "PG",
        lastWeekPoints: 150,
        lastWeekFan: 30,
        lastWeekBlocks: 20,
        lastWeekSteals: 10,
        lastWeekGame:14
      },
    ]
  };

  return res.json(data);
});

team.put('/update/:teamId', authenticateJWT, function(req, res) {
  // update the team array
  console.log("req: ", req.body.playerIdArray); // replace the array of the player in the team by this array
});

team.delete('/delete/:teamId', authenticateJWT, function(req, res) {
  // delete the team coming from the :teamId
  console.log("call to delete team")
});

team.post('/create', authenticateJWT, function(req, res) {
  // delete the team coming from the :teamId
  console.log("call to create team: ", req.body);
});


module.exports = team;
