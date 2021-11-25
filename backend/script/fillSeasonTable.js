const axios = require('axios');
const db = require('../db');

const fillSeasonTable = () => {
  let queryInputSeasonStats = "INSERT INTO players_season_stats(playerID, name, team, position, games, fantasyPoints, minutes, seconds, fieldGoalsMade, fieldGoalsAttempted, fieldGoalsPercentage, effectiveFieldGoalsPercentage, twoPointersMade, twoPointersAttempted, twoPointersPercentage, threePointersMade, threePointersAttempted, threePointersPercentage, freeThrowsMade, freeThrowsAttempted, freeThrowsPercentage, offensiveRebounds, defensiveRebounds, rebounds, offensiveReboundsPercentage, defensiveReboundsPercentage, totalReboundsPercentage, assists, steals, blockedShots, turnovers, personalFouls, points, trueShootingAttempts, trueShootingPercentage, playerEfficiencyRating, assistsPercentage, stealsPercentage, blocksPercentage, turnOversPercentage, usageRatePercentage, fantasyPointsFanDuel, fantasyPointsDraftKings, fantasyPointsYahoo, plusMinus, doubleDoubles, tripleDoubles, fantasyPointsFantasyDraft) VALUES";
  axios.get('https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2022', {headers: {"Ocp-Apim-Subscription-Key":"ce0935001bf94813a935f4593acd1514"}})
  .then(response => {
    response.data.map((player) => {
      queryInputSeasonStats += `(${player.PlayerID}, '${player.Name.split("'").join("")}', '${player.Team}', '${player.Position}', ${player.Games}, ${player.FantasyPoints}, ${player.Minutes}, ${player.Seconds}, ${player.FieldGoalsMade}, ${player.FieldGoalsAttempted}, ${player.FieldGoalsPercentage}, ${player.EffectiveFieldGoalsPercentage}, ${player.TwoPointersMade}, ${player.TwoPointersAttempted}, ${player.TwoPointersPercentage}, ${player.ThreePointersMade}, ${player.ThreePointersAttempted}, ${player.ThreePointersPercentage}, ${player.FreeThrowsMade}, ${player.FreeThrowsAttempted}, ${player.FreeThrowsPercentage}, ${player.OffensiveRebounds}, ${player.DefensiveRebounds}, ${player.Rebounds}, ${player.OffensiveReboundsPercentage}, ${player.DefensiveReboundsPercentage}, ${player.TotalReboundsPercentage}, ${player.Assists}, ${player.Steals}, ${player.BlockedShots}, ${player.Turnovers}, ${player.PersonalFouls}, ${player.Points}, ${player.TrueShootingAttempts}, ${player.TrueShootingPercentage}, ${player.PlayerEfficiencyRating}, ${player.AssistsPercentage}, ${player.StealsPercentage}, ${player.BlocksPercentage}, ${player.TurnOversPercentage}, ${player.UsageRatePercentage}, ${player.FantasyPointsFanDuel}, ${player.FantasyPointsDraftKings}, ${player.FantasyPointsYahoo}, ${player.PlusMinus},${player.DoubleDoubles}, ${player.TripleDoubles}, ${player.FantasyPointsFantasyDraft}),`
    })
    queryInputSeasonStats = queryInputSeasonStats.slice(0, -1) + ";";
    
    return db 
      .query(queryInputSeasonStats)
      .then((result) => {
        console.log("in the DB")
        res.json({data: result.rows})
      })
      .catch((err) => err);
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports = fillSeasonTable;