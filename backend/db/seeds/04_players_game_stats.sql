INSERT INTO 
players_game_stats(
  statID,
  teamID,
  playerID,
  seasonType,
  season,
  name,
  team,
  position ,
  started,
  fanDuelSalary,
  draftKingsSalary,
  fantasyDataSalary,
  yahooSalary,
  injuryStatus,
  injuryBodyPart,
  injuryStartDate,
  injuryNotes,
  fanDuelPosition,
  draftKingsPosition,
  yahooPosition,
  opponentRank,
  opponentPositionRank,
  globalTeamID,
  fantasyDraftSalary,
  fantasyDraftPosition,
  gameID,
  opponentID,
  opponent,
  day,
  dateTime,
  homeOrAway,
  isGameOver, --boolean
  globalGameID,
  globalOpponentID,
  updated,
  games,
  fantasyPoints,
  minutes,
  seconds,
  fieldGoalsMade,
  fieldGoalsAttempted,
  fieldGoalsPercentage,
  effectiveFieldGoalsPercentage,
  twoPointersMade,
  twoPointersAttempted,
  twoPointersPercentage,
  threePointersMade,
  threePointersAttempted,
  threePointersPercentage,
  freeThrowsMade,
  freeThrowsAttempted,
  freeThrowsPercentage,
  offensiveRebounds,
  defensiveRebounds,
  rebounds,
  offensiveReboundsPercentage,
  defensiveReboundsPercentage,
  totalReboundsPercentage,
  assists,
  steals,
  blockedShots,
  turnovers,
  personalFouls,
  points,
  trueShootingAttempts,
  trueShootingPercentage,
  playerEfficiencyRating,
  assistsPercentage,
  stealsPercentage,
  blocksPercentage,
  turnOversPercentage,
  usageRatePercentage,
  fantasyPointsFanDuel,
  fantasyPointsDraftKings,
  fantasyPointsYahoo,
  plusMinus,
  doubleDoubles,
  tripleDoubles,
  fantasyPointsFantasyDraft,
  isClosed,
  lineupConfirmed, --VARCHAR(255) NOT NULL, --boolean
  lineupStatus
)
VALUES
(
  916748,
  7,
  20000441,-- VALUES MODIFIED TO ENSURE FK IS LINKED TO PK
  1,
  2022,
  'Bradley Beal',
  'PHI',
  'SG',
  1,
  10997,
  10683,
  10683,
  36,
  'Scrambled',
  'Scrambled',
  null,
  'Scrambled',
  'PG/SG',
  'PG',
  'PG',
  10,
  2,
  20000007,
  null,
  'Scrambled',
  16867,
  10,
  'TOR',
  '2021-11-11T00:00:00',
  '2021-11-11T19:00:00',
  'HOME',
  true,
  20016867,
  20000010,
  '2021-11-14T03:15:15',
  1,
  77.5,
  61,
  64,
  18.9,
  29.8,
  99.3,
  99.3,
  17.3,
  25.1,
  108.1,
  2.5,
  7.4,
  52.3,
  12.6,
  12.6,
  157.1,
  0.0,
  9.9,
  9.9,
  0.0,
  16.5,
  13.9,
  12.3,
  2.5,
  4.9,
  4.9,
  4.9,
  51.8,
  35.4,
  115.2,
  55.6,
  37.3,
  3.1,
  9.5,
  12.8,
  43.0,
  82.2,
  80.1,
  82.2,
  -14.1,
  0.0,
  0.0,
  80.1,
  true,
  true,
  'Scrambled'
);