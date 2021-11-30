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

team.get('/all', function(req, res) {
  // gives back every team this user is having
  const data = [
    {
      teamId: 1,
      teamName: "team1",
      topPerformer: {
        name: "steph",
        image: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nba/low-res/20000485.png",
      },
      worstPerformer: {
        name: "zion",
        image: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nba/low-res/20002271.png"
      },
      totalFanPoints: 871
    },
    {
      teamId: 2,
      teamName: "team2",
      topPerformer: {
        name: "stephen",
        image: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nba/low-res/20000485.png",
      },
      worstPerformer: {
        name: "zion willi",
        image: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nba/low-res/20002271.png"
      },
      totalFanPoints: 934
    }
  ];
  // knex('users')
  //   .join('teams', 'users.id', 'teams.user_id')
  //   .join('players_in_team', 'players_in_team.team_id', 'teams.id')
  //   .join('players_season_stats', 'players_season_stats.player_id', 'players_in_team.player_id')
  //   .join('player', 'players_season_stats.player_id', 'player.player_id')
  //   .select()
    
    
    
    
  //   .then((playersData) => {
  //     const platformName = (platform) => {
  //       switch(platform) {
  //         case "Yahoo":
  //           return "fantasy_points_yahoo";

  //         case "Fan Duel":
  //           return "fantasy_points_fan_duel";

  //         case "Fantasy Draft":
  //           return "fantasy_points_fantasy_draft";

  //         case "Draft King":
  //           return "fantasy_points_draft_kings";
  //       }
  //     }
  //     const data = [];

  //     console.log(playersData)
  //     for (let i = 0; i < playersData.length - 1; i++) {
  //     }

  //   })
    
   return res.json(data);

});


team.get('/overview/:teamId', function(req, res) {
  // gives back every player this team is having, used in the manage player too
  const data = {
    teamName: "teamNameHere",
    players: [
      {
        playerId: 20000441,
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
        playerId: 20000442,
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
        playerId: 20000443,
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
  return res.json(data)

  // return knex('teams')
  // .join('players_in_team', 'players_in_team.team_id', 'teams.id')
  // .where('teams.id', req.params.teamId)
  // .join('player', 'players_in_team.player_id', 'player.player_id')
  // .join('players_game_stats', 'players_game_stats.player_id', 'player.player_id')
  // .select('team_name', 'player_name', 'photo_url', 'position', 'player_id')
  // .sum('points')
  // .groupBy('players_game_stats.player_id')
  // .then((info) => {
    
  //   return res.json(info);
  // })

});

team.put('/update/:teamId', authenticateJWT, function(req, res) {
  // update the team array
  console.log("in the put")
  const newArray = req.body.playerIdArray.map((num) => 
  ({player_id: num, team_id: req.params.teamId}));
  console.log(newArray)

  db .query(`DELETE FROM players_in_team WHERE team_id=${req.params.teamId}`)
  .then(() => console.log("delete"))
  .catch((err) => err);

  return knex('players_in_team').insert(newArray)
    .then(() => console.log("created"))
    .catch((err) => console.log(err));
});

team.delete('/delete/:teamId', authenticateJWT, function(req, res) {
  // delete the team coming from the :teamId
  db .query(`DELETE FROM players_in_team WHERE team_id=${req.params.teamId}`)
  .then(() => console.log("delete players"))
  .catch((err) => err);

  db .query(`DELETE FROM teams WHERE id=${req.params.teamId}`)
  .then(() => console.log("team"))
  .catch((err) => err);
});

team.post('/create', authenticateJWT, function(req, res) {
  // create the team coming from the :teamId
  console.log("call to create team: ", req.user);// need to get the user ID

  // return knex('teams').insert({team_name: req.body.name, user_id: 1, platform: req.body.plateform})
  // .then(() => console.log("team created"))
  // .catch((err) => console.log(err));
});


module.exports = team;
