const axios = require('axios');
const db = require('..');

const fillGameTable = (date) => {
  let queryInputGamesStats = "INSERT INTO players_game_stats(playerID, name, team, position, day, fantasyPoints, minutes, seconds, fieldGoalsMade, fieldGoalsAttempted, fieldGoalsPercentage, effectiveFieldGoalsPercentage, twoPointersMade, twoPointersAttempted, twoPointersPercentage, threePointersMade, threePointersAttempted, threePointersPercentage, freeThrowsMade, freeThrowsAttempted, freeThrowsPercentage , offensiveRebounds, defensiveRebounds, rebounds, offensiveReboundsPercentage, defensiveReboundsPercentage, totalReboundsPercentage, assists, steals, blockedShots, turnovers, personalFouls, points, trueShootingAttempts, trueShootingPercentage, playerEfficiencyRating, assistsPercentage, stealsPercentage, blocksPercentage, turnOversPercentage, usageRatePercentage, fantasyPointsFanDuel, fantasyPointsDraftKings, fantasyPointsYahoo, plusMinus, doubleDoubles, tripleDoubles, fantasyPointsFantasyDraft) VALUES";
  
  axios.get(`https://api.sportsdata.io/v3/nba/stats/json/PlayerGameStatsByDate/${date}`, {headers: {"Ocp-Apim-Subscription-Key":"ce0935001bf94813a935f4593acd1514"}})
  .then(response => {
    response.data.map((player) => {
      queryInputGamesStats += `( ${player.PlayerID}, '${player.Name.split("'").join("")}', '${player.Team}', '${player.Position}', '${player.Day}', ${player.FantasyPoints}, ${player.Minutes}, ${player.Seconds}, ${player.FieldGoalsMade}, ${player.FieldGoalsAttempted}, ${player.FieldGoalsPercentage}, ${player.EffectiveFieldGoalsPercentage}, ${player.TwoPointersMade}, ${player.TwoPointersAttempted}, ${player.TwoPointersPercentage}, ${player.ThreePointersMade}, ${player.ThreePointersAttempted}, ${player.ThreePointersPercentage}, ${player.FreeThrowsMade}, ${player.FreeThrowsAttempted}, ${player.FreeThrowsPercentage} , ${player.OffensiveRebounds}, ${player.DefensiveRebounds}, ${player.Rebounds}, ${player.OffensiveReboundsPercentage}, ${player.DefensiveReboundsPercentage}, ${player.TotalReboundsPercentage}, ${player.Assists}, ${player.Steals}, ${player.BlockedShots}, ${player.Turnovers}, ${player.PersonalFouls}, ${player.Points}, ${player.TrueShootingAttempts}, ${player.TrueShootingPercentage}, ${player.PlayerEfficiencyRating}, ${player.AssistsPercentage}, ${player.StealsPercentage}, ${player.BlocksPercentage}, ${player.TurnOversPercentage}, ${player.UsageRatePercentage}, ${player.FantasyPointsFanDuel}, ${player.FantasyPointsDraftKings}, ${player.FantasyPointsYahoo}, ${player.PlusMinus}, ${player.DoubleDoubles}, ${player.TripleDoubles}, ${player.FantasyPointsFantasyDraft}),`
    })
    queryInputGamesStats = queryInputGamesStats.slice(0, -1) + ";";
    
     return db 
      .query(queryInputGamesStats)
      .then((result) => {
        console.log("fillGameTable: insterted into the DB", date)
      })
      .catch((err) => console.log("@fillGameTable, Date:", date, " Error:", err));
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports = fillGameTable;