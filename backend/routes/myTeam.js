const express = require('express');
const router = express.Router();
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

router.get('/season/:teamID', authenticateJWT, (req, res) => {

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

  knex.select().from('players_season_stats').where({name: 'Stephen Curry'})
    .then((rows) => {
      for (row of rows) {
        console.log(row);
      }
    }).catch((err) => console.log(err))
    .finally(() => {
        knex.destroy();
    });
  // console.log(req.user)
  res.sendStatus(200);
});

router.post('/books', authenticateJWT, (req, res) => {
  const { role } = req.user;

  if (role !== 'admin') {
    console.log("Error: User not authorized for this route");
    return res.sendStatus(403);
  }


  const book = req.body;
  books.push(book);

  res.send('Book added successfully');
});

module.exports = router;
