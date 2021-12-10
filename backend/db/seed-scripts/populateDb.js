const dotenv = require('dotenv').config();

const chalk = require('chalk');

const axios = require('axios').create({
  headers: {"Ocp-Apim-Subscription-Key":process.env.SPORTS_API_KEY}
});

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

const fillNbaTeamsTable = () => {
  return axios.get('https://api.sportsdata.io/v3/nba/scores/json/teams')
    .then(response => { 
      const allRelevantTeamData = response.data.map(team => {
        return {
          team_id: team.TeamID,
          team_key: team.Key,
          city: team.City,
          team_name: team.Name,
          conference: team.Conference,
          division: team.Division,
          logo_url: team.WikipediaLogoUrl
        };
      });
      
      // first removes existing data in table (to avoid breaking Unique constraint beacause of duplicate data)
      return knex.raw('TRUNCATE TABLE nba_team RESTART IDENTITY cascade')
        .then(() => (
          knex('nba_team').insert(allRelevantTeamData)
            .then(() => console.log(`${chalk.green("-> nba_team data inserted")}`))
        )).catch((err) => { console.log(`${chalk.red("Error inserting nba_team data into database")}`); throw err });
    }).catch((err) => { console.log(`${chalk.red("Error retrieving nba_team data from sportsdata.io")}`); throw err });
};

const fillPlayersTable = () => {
  return axios.get('https://api.sportsdata.io/v3/nba/scores/json/Players')
    .then(response => {
      const allRelevantPlayerData = response.data.map(player => {
        return {
          player_id: player.PlayerID,
          team_id: player.TeamID,
          team: player.Team,
          position_category: player.PositionCategory,
          position: player.Position,
          player_name: `${player.FirstName} ${player.LastName}`,
          photo_url: player.PhotoUrl
        };
      });
      return knex.raw('TRUNCATE TABLE player RESTART IDENTITY cascade')
        .then(() => (
          knex('player').insert(allRelevantPlayerData)
            .then(() => console.log(`${chalk.green("-> player data inserted")}`))
        )).catch((err) => { console.log(`${chalk.red("Error inserting player data into database")}`); throw err });
    }).catch((err) => { console.log(`${chalk.red("Error retrieving player data from sportsdata.io")}`); throw err });
};

const fillSeasonStatsTable = () => {
  return axios.get('https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2022')
    .then(response => { 
      const allRelevantSeasonData = response.data.map(team => {
        return {
          player_id: team.PlayerID,
          games: team.Games,
          minutes: team.Minutes,
          seconds: team.Seconds,
          field_goals_made: team.FieldGoalsMade,
          field_goals_attempted: team.FieldGoalsAttempted,
          field_goals_percentage: team.FieldGoalsPercentage,
          effective_field_goals_percentage: team.EffectiveFieldGoalsPercentage,
          two_pointers_made: team.TwoPointersMade,
          two_pointers_attempted: team.TwoPointersAttempted,
          two_pointers_percentage: team.TwoPointersPercentage,
          three_pointers_made: team.ThreePointersMade,
          three_pointers_attempted: team.ThreePointersAttempted,
          three_pointers_percentage: team.ThreePointersPercentage,
          free_throws_made: team.FreeThrowsMade,
          free_throws_attempted: team.FreeThrowsAttempted,
          free_throws_percentage: team.FreeThrowsPercentage,
          offensive_rebounds: team.OffensiveRebounds,
          defensive_rebounds: team.DefensiveRebounds,
          rebounds: team.Rebounds,
          offensive_rebounds_percentage: team.OffensiveReboundsPercentage,
          defensive_rebounds_percentage: team.DefensiveReboundsPercentage,
          total_rebounds_percentage: team.TotalReboundsPercentage,
          assists: team.Assists,
          steals: team.Steals,
          blocked_shots: team.BlockedShots,
          turnovers: team.Turnovers,
          personal_fouls: team.PersonalFouls,
          points: team.Points,
          true_shooting_attempts: team.TrueShootingAttempts,
          true_shooting_percentage: team.TrueShootingPercentage,
          player_efficiency_rating: team.PlayerEfficiencyRating,
          assists_percentage: team.AssistsPercentage,
          steals_percentage: team.StealsPercentage,
          blocks_percentage: team.BlocksPercentage,
          turn_overs_percentage: team.TurnOversPercentage,
          usage_rate_percentage: team.UsageRatePercentage,
          fantasy_points_fan_duel: team.FantasyPointsFanDuel,
          fantasy_points_draft_kings: team.FantasyPointsDraftKings,
          fantasy_points_yahoo: team.FantasyPointsYahoo,
          plus_minus: team.PlusMinus,
          double_doubles: team.DoubleDoubles,
          triple_doubles: team.TripleDoubles,
          fantasy_points_fantasy_draft: team.FantasyPointsFantasyDraft
        };
      });
      
      // first removes existing data in table (to avoid breaking Unique constraint beacause of duplicate data)
      return knex.raw('TRUNCATE TABLE players_season_stats RESTART IDENTITY cascade')
        .then(() => (
          knex('players_season_stats').insert(allRelevantSeasonData)
            .then(() => console.log(`${chalk.green("-> players_season_stats data inserted")}`))
        )).catch((err) => { console.log(`${chalk.red("Error inserting players_season_stats data into database")}`); throw err });
    }).catch((err) => { console.log(`${chalk.red("Error retrieving players_season_stats data from sportsdata.io")}`); throw err });
};

const fillGameStatsTable = () => { // retreives game stats data for every game in season only for players in 
  // return knex('player')
  //   .select('player_id')
  return knex('players_in_team')
    .distinct('player_id')
    .then(players => {
      return knex.raw('TRUNCATE TABLE players_game_stats RESTART IDENTITY cascade')
        .then(() => (
          players.forEach(player => {
            return axios.get(`https://api.sportsdata.io/v3/nba/stats/json/PlayerGameStatsBySeason/2022/${player.player_id}/all`)
              .then(response => { 
                console.log(response);
                // const allRelevantPlayerGameData = response.data.map(playerGame => {
                //   return {
                //     player_id: playerGame.PlayerID,
                //     opponent_rank: playerGame.OpponentRank,
                //     opponent_position_rank: playerGame.OpponentPositionRank,
                //     global_team_id: playerGame.GlobalTeamID,
                //     game_id: playerGame.GameID,
                //     opponent_id: playerGame.OpponentID,
                //     date_time: playerGame.DateTime,
                //     home_or_away: playerGame.HomeOrAway,
                //     minutes: playerGame.Minutes,
                //     seconds: playerGame.Seconds,
                //     field_goals_made: playerGame.FieldGoalsMade,
                //     field_goals_attempted: playerGame.FieldGoalsAttempted,
                //     field_goals_percentage: playerGame.FieldGoalsPercentage,
                //     effective_field_goals_percentage: playerGame.EffectiveFieldGoalsPercentage,
                //     two_pointers_made: playerGame.TwoPointersMade,
                //     two_pointers_attempted: playerGame.TwoPointersAttempted,
                //     two_pointers_percentage: playerGame.TwoPointersPercentage,
                //     three_pointers_made: playerGame.ThreePointersMade,
                //     three_pointers_attempted: playerGame.ThreePointersAttempted,
                //     three_pointers_percentage: playerGame.ThreePointersPercentage,
                //     free_throws_made: playerGame.FreeThrowsMade,
                //     free_throws_attempted: playerGame.FreeThrowsAttempted,
                //     free_throws_percentage: playerGame.FreeThrowsPercentage,
                //     offensive_rebounds: playerGame.OffensiveRebounds,
                //     defensive_rebounds: playerGame.DefensiveRebounds,
                //     rebounds: playerGame.Rebounds,
                //     offensive_rebounds_percentage: playerGame.OffensiveReboundsPercentage,
                //     defensive_rebounds_percentage: playerGame.DefensiveReboundsPercentage,
                //     total_rebounds_percentage: playerGame.TotalReboundsPercentage,
                //     assists: playerGame.Assists,
                //     steals: playerGame.Steals,
                //     blocked_shots: playerGame.BlockedShots,
                //     turnovers: playerGame.Turnovers,
                //     personal_fouls: playerGame.PersonalFouls,
                //     points: playerGame.Points,
                //     true_shooting_attempts: playerGame.TrueShootingAttempts,
                //     true_shooting_percentage: playerGame.TrueShootingPercentage,
                //     player_efficiency_rating: playerGame.PlayerEfficiencyRating,
                //     assists_percentage: playerGame.AssistsPercentage,
                //     steals_percentage: playerGame.StealsPercentage,
                //     blocks_percentage: playerGame.BlocksPercentage,
                //     turn_overs_percentage: playerGame.TurnOversPercentage,
                //     usage_rate_percentage: playerGame.UsageRatePercentage,
                //     fantasy_points_fan_duel: playerGame.FantasyPointsFanDuel,
                //     fantasy_points_draft_kings: playerGame.FantasyPointsDraftKings,
                //     fantasy_points_yahoo: playerGame.FantasyPointsYahoo,
                //     plus_minus: playerGame.PlusMinus,
                //     double_doubles: playerGame.DoubleDoubles,
                //     triple_doubles: playerGame.TripleDoubles,
                //     fantasy_points_fantasy_draft: playerGame.FantasyPointsFantasyDraft
                //   };
                // });
                // first removes existing data in table (to avoid breaking Unique constraint beacause of duplicate data)
                // return knex('players_game_stats').insert(allRelevantPlayerGameData)
                //   .then(() => console.log(`${chalk.green("players_game_stats data inserted")}`))
                //   .catch((err) => { console.log(`${chalk.red("Error inserting players_game_stats data into database")}`); throw err });
              }).catch((err) => { console.log(`${chalk.red("Error retrieving players_game_stats data from sportsdata.io")}`); throw err });
          })
        ));
    });
};

const altFillGameStatsTable = () => { // retreives last (14) days game stats data for every player in nba 
  // return knex('player')
  //   .select('player_id')
  return knex.raw('TRUNCATE TABLE players_game_stats RESTART IDENTITY cascade')
    .then(() => (
      [...Array(14)].reduce((prev, cur, daysAgo) =>
        prev.then(() => {
          const currentDate = new Date();
          const pastDate = new Date(currentDate);
          pastDate.setDate(pastDate.getDate() - daysAgo);
          const dateStr = `${pastDate.getFullYear()}-${pastDate.toLocaleString('default', { month: 'short' })}-${pastDate.toLocaleString('default', { day: '2-digit' })}`;
          return axios.get(`https://api.sportsdata.io/v3/nba/stats/json/PlayerGameStatsByDate/${dateStr}`)
            .then(response => { 
              // console.log(response);

              const allRelevantPlayerGameData = response.data.map(playerGame => {
                return {
                  player_id: playerGame.PlayerID,
                  opponent_rank: playerGame.OpponentRank,
                  opponent_position_rank: playerGame.OpponentPositionRank,
                  global_team_id: playerGame.GlobalTeamID,
                  game_id: playerGame.GameID,
                  opponent_id: playerGame.OpponentID,
                  date_time: playerGame.DateTime,
                  home_or_away: playerGame.HomeOrAway,
                  minutes: playerGame.Minutes,
                  seconds: playerGame.Seconds,
                  field_goals_made: playerGame.FieldGoalsMade,
                  field_goals_attempted: playerGame.FieldGoalsAttempted,
                  field_goals_percentage: playerGame.FieldGoalsPercentage,
                  effective_field_goals_percentage: playerGame.EffectiveFieldGoalsPercentage,
                  two_pointers_made: playerGame.TwoPointersMade,
                  two_pointers_attempted: playerGame.TwoPointersAttempted,
                  two_pointers_percentage: playerGame.TwoPointersPercentage,
                  three_pointers_made: playerGame.ThreePointersMade,
                  three_pointers_attempted: playerGame.ThreePointersAttempted,
                  three_pointers_percentage: playerGame.ThreePointersPercentage,
                  free_throws_made: playerGame.FreeThrowsMade,
                  free_throws_attempted: playerGame.FreeThrowsAttempted,
                  free_throws_percentage: playerGame.FreeThrowsPercentage,
                  offensive_rebounds: playerGame.OffensiveRebounds,
                  defensive_rebounds: playerGame.DefensiveRebounds,
                  rebounds: playerGame.Rebounds,
                  offensive_rebounds_percentage: playerGame.OffensiveReboundsPercentage,
                  defensive_rebounds_percentage: playerGame.DefensiveReboundsPercentage,
                  total_rebounds_percentage: playerGame.TotalReboundsPercentage,
                  assists: playerGame.Assists,
                  steals: playerGame.Steals,
                  blocked_shots: playerGame.BlockedShots,
                  turnovers: playerGame.Turnovers,
                  personal_fouls: playerGame.PersonalFouls,
                  points: playerGame.Points,
                  true_shooting_attempts: playerGame.TrueShootingAttempts,
                  true_shooting_percentage: playerGame.TrueShootingPercentage,
                  player_efficiency_rating: playerGame.PlayerEfficiencyRating,
                  assists_percentage: playerGame.AssistsPercentage,
                  steals_percentage: playerGame.StealsPercentage,
                  blocks_percentage: playerGame.BlocksPercentage,
                  turn_overs_percentage: playerGame.TurnOversPercentage,
                  usage_rate_percentage: playerGame.UsageRatePercentage,
                  fantasy_points_fan_duel: playerGame.FantasyPointsFanDuel,
                  fantasy_points_draft_kings: playerGame.FantasyPointsDraftKings,
                  fantasy_points_yahoo: playerGame.FantasyPointsYahoo,
                  plus_minus: playerGame.PlusMinus,
                  double_doubles: playerGame.DoubleDoubles,
                  triple_doubles: playerGame.TripleDoubles,
                  fantasy_points_fantasy_draft: playerGame.FantasyPointsFantasyDraft
                };
              });
              // first removes existing data in table (to avoid breaking Unique constraint beacause of duplicate data)
              return knex('players_game_stats').insert(allRelevantPlayerGameData)
                .then(() => console.log(`${chalk.green("->-> players_game_stats data inserted")}`))
                .catch((err) => { console.log(`${chalk.blue("skipping this data point")}`); });
            }).catch((err) => { console.log(`${chalk.red("Error retrieving players_game_stats data from sportsdata.io")}`); throw err });
        })
        .then(() => console.log(`-> Inserted game stats for ${daysAgo} day(s) ago`))
      , Promise.resolve() )
    ));
};


const seedSampleData = (username) => {
  // in production code this user and teams should already be in their respective tables
  return knex('users')
    .insert({
      username: "bobby24",
      email: username,
      password: "45137"
    }).then(() => (
      knex('users')
        .where({ email: username })
        .select('id')
        .then((user) => (
          knex('teams').insert([
            {
              team_name: "kobe4life",
              user_id: user[0].id,
              platform: "Yahoo"
            },
            {
              team_name: "celticSquadd",
              user_id: user[0].id,
              platform: "Fan Duel"
            }     
          ]).then(() => (
            knex('teams')
              .select('id')
              .then((teams) => (
                Promise.all(teams.map(team => (
                  knex('player')
                    .select('player_id')
                    .orderByRaw(' random()')
                    .limit(13)
                    .then((sampleIds) => (
                      Promise.all(sampleIds.map((sampleId) => {
                        return knex('players_in_team').insert({
                          player_id: sampleId.player_id,
                          team_id: team.id  
                        }).catch((err) => console.log(err))
                      })).then(() => console.log(chalk.green(`->players inserted into team ${team.id}`))).catch((err) => console.log(err))
                    ))
                ))).catch((err) => console.log(err))
              ))
          )).catch((err) => console.log(err))
        ))
    )).catch((err) => console.log(err))

}


module.exports = { fillNbaTeamsTable, fillPlayersTable, fillSeasonStatsTable, fillGameStatsTable, altFillGameStatsTable, seedSampleData };