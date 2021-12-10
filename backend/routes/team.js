const express = require('express');
const team = express.Router();
const db = require('../db');
const chalk = require('chalk');
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
const authenticateJWT = require('../middleware/authenticateJWT');

const lookupPlayersInTeam = (teamId) => {
  return knex('players_in_team')
    .where({ team_id: teamId })
    .select('player_id')
    .then((playerIds) => playerIds)
};

team.get('/all', authenticateJWT, function(req, res) {
  // gives back every team this user is having

  const { username } = req.user;

  knex('users')
    .where({ email: username })
    .select('id')
    .then((user) => knex('teams').where({ user_id: user[0].id }).select())
    .then((teams) => { // determines the best and worst performer for each team in teams[]
      // -> do a lookup in players_in_team for all relevant player_id's 
      Promise.all(teams.map((team) => lookupPlayersInTeam(team.id)))
        .then((allTeamsPlayers) => {
          // -> then do a lookup (1 user team at a time) in players_season_stats retrieving the fantasy_points_(blank) for the correct platform
          Promise.all(allTeamsPlayers.map((teamsPlayers, index) => {
              return Promise.all(teamsPlayers.map((player) => (
                knex('players_season_stats')
                  .where({ player_id: player.player_id })
                  .select(`fantasy_points_${teams[index].platform.toLowerCase().replace(' ', '_')}`, 'points', 'rebounds', 'assists', 'steals', 'blocked_shots', 'player_id')
                  .then((final) => final[0])
                  .catch((err) => console.log(err))
              )))
            })).then(allTeamsFantasyPoints => {
              console.log(allTeamsFantasyPoints)
            // -> then sort the resulting array of fantasy points and single out the highest and lowest for best and worst player respectively.
            allTeamsFantasyPoints = allTeamsFantasyPoints.map((teamFantasyPoints, index) => teamFantasyPoints.sort((firstEl, secondEl) => 
              firstEl[`fantasy_points_${teams[index].platform.toLowerCase().replace(' ', '_')}`] - secondEl[`fantasy_points_${teams[index].platform.toLowerCase().replace(' ', '_')}`]
            ))
            const bestWorstTeamsPlayers = allTeamsFantasyPoints.map((teamFantasyPoints) => ({ topPerformer: teamFantasyPoints[teamFantasyPoints.length - 1], worstPerformer: teamFantasyPoints[0] }));

            // also sum all the fantasy points for totalFanPoints property
            const teamsTotalFantasyPoints = allTeamsFantasyPoints.map((sortedTeamFantasyPoints, index) => {
              let accumulator = 0;
              for (const playerFantasyPoints of sortedTeamFantasyPoints) {
                accumulator += playerFantasyPoints[`fantasy_points_${teams[index].platform.toLowerCase().replace(' ', '_')}`];
              }
              return accumulator;
            });

            // -> then do a last lookup in player table by the player_id of the topPerformer and worstPerformer players to retrieve their name and image link
            Promise.all(bestWorstTeamsPlayers.map((bestWorst, index) => {
              if(bestWorst.topPerformer) {
                return knex('player')
                  .where({ player_id: bestWorst['topPerformer'].player_id })
                  .select('player_name', 'photo_url', 'team')
                  .then((result) => { 
                    const playerDetails = { 
                      'player_name': result[0].player_name, 
                      'photo_url': result[0].photo_url,
                      'player_team': result[0].team,
                      'points': bestWorst.topPerformer.points,
                      'rebounds': bestWorst.topPerformer.rebounds,
                      'assists': bestWorst.topPerformer.assists,
                      'steals': bestWorst.topPerformer.steals,
                      'blocks': bestWorst.topPerformer.blocked_shots
                    };
                    bestWorst['topPerformer'] = { ...playerDetails }
                    return knex('player')
                      .where({ player_id: bestWorst['worstPerformer'].player_id })
                      .select('player_name', 'photo_url', 'team')
                      .then((result) => { 
                        const playerDetails = { 
                          'player_name': result[0].player_name, 
                          'photo_url': result[0].photo_url,
                          'player_team': result[0].team,
                          'points': bestWorst.worstPerformer.points,
                          'rebounds': bestWorst.worstPerformer.rebounds,
                          'assists': bestWorst.worstPerformer.assists,
                          'steals': bestWorst.worstPerformer.steals,
                          'blocks': bestWorst.topPerformer.blocked_shots
                        };
                        bestWorst['worstPerformer'] = { ...playerDetails }
                        bestWorst['totalFanPoints'] = teamsTotalFantasyPoints[index];
                        bestWorst['teamName'] = teams[index].team_name;
                        bestWorst['teamId'] = teams[index].id;
                        return bestWorst;
                      })
                  })
              } else {
                return {
                  teamName: teams[index].team_name,
                  teamId: teams[index].id,
                  totalFanPoints: 0,
                  topPerformer: { player_name: "Empty", photo_url: "https://e3educate.org/wp-content/uploads/2021/09/user.jpg" },
                  worstPerformer: { player_name: "Empty", photo_url: "https://e3educate.org/wp-content/uploads/2021/09/user.jpg" }
                }
              }
              })).then((finalData) => { 
              console.log("final data:", finalData);
              res.json(finalData);
            })
          });
        })
    })
    .catch((err) => {console.log(err); res.sendStatus(500)});
});


team.get('/overview/:teamId', function(req, res) {
  // gives back every player this team is having, used in the manage player too

  knex('players_in_team')
    .join('teams', {'players_in_team.team_id': 'teams.id'})
    .where({ team_id: req.params.teamId })
    .select('player_id', 'team_name')
    .then((players) => {
      if (!players[0]) {
        return knex('teams')
          .where({ id: req.params.teamId })
          .select('team_name')
          .then((teamName) => {
            const data = {
              teamName: teamName[0].team_name,
              players: []
            }
     
            return res.json(data);
          })
      }
      Promise.all(players.map(player => (
        lastWeekPlayerStats(player.player_id)
          .then((playerGameData) => {
            const filteredData = playerGameData.map(game => {
              const entries = [];
              for (const [key, value] of Object.entries(game)) {
                entries.push([key.toLowerCase().replace(/([-_]\w)/g, g => g[1].toUpperCase()), value]);
              }
              const cleanedPlayerData = Object.fromEntries(entries);
              return cleanedPlayerData;
            })

            return filteredData[0];
          })
      ))).then((results) =>{ 
        
        const data = {
          teamName: players[0].team_name,
          players: results
        }
        console.log("Player Season Data Sent Successfully!"); 
        res.json(data);
      })
    }).catch(err => { 
      console.log(err); 
      res.sendStatus(500)
    });
});

const lastWeekPlayerStats = (playerId) => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  const daysAgo = 10;
  pastDate.setDate(pastDate.getDate() - daysAgo);
  const dateStr = `${pastDate.getFullYear()}-${pastDate.getMonth()}-${pastDate.toLocaleString('default', { day: '2-digit' })}`;

  // a custom sql query that gets the average stats for the last 'const daysAgo' days
  return knex.select(knex.raw(` ROUND(AVG(field_goals_made)::numeric, 2) as last_week_field_goals_made, ROUND(AVG(field_goals_attempted)::numeric, 2) as last_week_field_goals_attempted, ROUND(AVG(field_goals_percentage)::numeric, 2) as last_week_field_goals_percentage, ROUND(AVG(effective_field_goals_percentage)::numeric, 2) as last_week_effective_field_goals_percentage, ROUND(AVG(two_pointers_made)::numeric, 2) as last_week_two_pointers_made, ROUND(AVG(two_pointers_attempted)::numeric, 2) as last_week_two_pointers_attempted, ROUND(AVG(two_pointers_percentage)::numeric, 2) as last_week_two_pointers_percentage, ROUND(AVG(three_pointers_made)::numeric, 2) as last_week_three_pointers_made, ROUND(AVG(three_pointers_attempted)::numeric, 2) as last_week_three_pointers_attempted, ROUND(AVG(three_pointers_percentage)::numeric, 2) as last_week_three_pointers_percentage, ROUND(AVG(free_throws_made)::numeric, 2) as last_week_free_throws_made, ROUND(AVG(free_throws_attempted)::numeric, 2) as last_week_free_throws_attempted, ROUND(AVG(free_throws_percentage)::numeric, 2) as last_week_free_throws_percentage, ROUND(AVG(offensive_rebounds)::numeric, 2) as last_week_offensive_rebounds, ROUND(AVG(defensive_rebounds)::numeric, 2) as last_week_defensive_rebounds, ROUND(AVG(rebounds)::numeric, 2) as last_weekrebounds, ROUND(AVG(offensive_rebounds_percentage)::numeric, 2) as last_week_offensive_rebounds_percentage, ROUND(AVG(defensive_rebounds_percentage)::numeric, 2) as last_week_defensive_rebounds_percentage, ROUND(AVG(total_rebounds_percentage)::numeric, 2) as last_week_total_rebounds_percentage, ROUND(AVG(assists)::numeric, 2) as last_week_assists, ROUND(AVG(steals)::numeric, 2) as last_week_steals, ROUND(AVG(blocked_shots)::numeric, 2) as last_week_blocked_shots, ROUND(AVG(turnovers)::numeric, 2) as last_week_turnovers, ROUND(AVG(personal_fouls)::numeric, 2) as last_week_personal_fouls, ROUND(AVG(points)::numeric, 2) as last_week_points, ROUND(AVG(true_shooting_attempts)::numeric, 2) as last_week_true_shooting_attempts, ROUND(AVG(true_shooting_percentage)::numeric, 2) as last_week_true_shooting_percentage, ROUND(AVG(player_efficiency_rating)::numeric, 2) as last_week_player_efficiency_rating, ROUND(AVG(assists_percentage)::numeric, 2) as last_week_assists_percentage, ROUND(AVG(steals_percentage)::numeric, 2) as last_week_steals_percentage, ROUND(AVG(blocks_percentage)::numeric, 2) as last_week_blocks_percentage, ROUND(AVG(turn_overs_percentage)::numeric, 2) as last_week_turn_overs_percentage, ROUND(AVG(usage_rate_percentage)::numeric, 2) as last_week_usage_rate_percentage, ROUND(AVG(fantasy_points_fan_duel)::numeric, 2) as last_week_fantasy_points_fan_duel, ROUND(AVG(fantasy_points_draft_kings)::numeric, 2) as last_week_fantasy_points_draft_kings, ROUND(AVG(fantasy_points_yahoo)::numeric, 2) as last_week_fantasy_points_yahoo, ROUND(AVG(plus_minus)::numeric, 2) as last_week_plus_minus, ROUND(AVG(double_doubles)::numeric, 2) as last_week_double_doubles, ROUND(AVG(triple_doubles)::numeric, 2) as last_week_triple_doubles, ROUND(AVG(fantasy_points_fantasy_draft)::numeric, 2) as last_week_fantasy_points_fantasy_draft, player.player_id as player_id, player.player_name as player_name, player.photo_url as player_image, player.position as position from players_game_stats join player on players_game_stats.player_id = player.player_id where date_time > '${dateStr}' and player.player_id=${playerId} group by player.id`)).then(lastWeekStats => {
    
    return lastWeekStats
  })
};

team.put('/update/:teamId', authenticateJWT, function(req, res) {
  // updates the team array
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
  // deletes the team coming from the :teamId
  db .query(`DELETE FROM players_in_team WHERE team_id=${req.params.teamId}`)
  .then(() => console.log("delete players"))
  .catch((err) => err);

  db .query(`DELETE FROM teams WHERE id=${req.params.teamId}`)
  .then(() => console.log("team"))
  .catch((err) => err);
});

team.post('/create', authenticateJWT, function(req, res) {
  // creates the team coming from the :teamId
  console.log("call to create team: ", req.user.username);// need to get the user ID

  return knex('users')
    .where({ email: req.user.username })
    .select('id')
    .then((t) => {
      return knex('teams').insert({team_name: req.body.name, user_id: Number(t[0].id), platform: req.body.plateform})
      .then(() => console.log("team created"))
      .catch((err) => console.log(err));
    });
});


module.exports = team;
