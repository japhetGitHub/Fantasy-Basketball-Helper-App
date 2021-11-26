const express = require('express');
const team = express.Router();
const db = require('../db');
const authenticateJWT = require('../middleware/authenticateJWT');

// "http://localhost:3001/api/team"

team.get('/all', authenticateJWT, function(req, res) {
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

  return res.json(data);
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
