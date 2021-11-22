DROP TABLE IF EXISTS player_stats CASCADE;

CREATE TABLE player_stats (
  id SERIAL PRIMARY KEY NOT NULL,
  playerId INT REFERENCES player_info(playerId) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  team VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  minutes INT  NOT NULL,
  seconds INT  NOT NULL,
  fieldGoalsMade INT  NOT NULL,
  fieldGoalsAttempted INT  NOT NULL,
  fieldGoalsPercentage INT  NOT NULL,
  effectiveFieldgoalsPercentage INT  NOT NULL,
  twoPointersMade INT  NOT NULL,
  twoPointersAttempted INT  NOT NULL,
  twoPointersPercentage INT  NOT NULL,
  threePointersMade INT  NOT NULL,
  threePointersAttempted INT  NOT NULL,
  threePointersPercentage INT  NOT NULL,
  freeThrowsMade INT  NOT NULL,
  freeThrowsAttempted INT  NOT NULL,
  freeThrowsPercentage INT  NOT NULL,
  offensiveRebounds INT  NOT NULL,
  defensiveRebounds INT  NOT NULL,
  rebounds INT  NOT NULL,
  offensiveReboundsPercentage INT  NOT NULL,
  defensiveReboundsPercentage INT  NOT NULL,
  totalReboundsPercentage INT  NOT NULL,
  assists INT  NOT NULL,
  steals INT  NOT NULL,
  blockedShots INT  NOT NULL,
  turnovers INT  NOT NULL,
  personalFouls INT  NOT NULL,
  points INT  NOT NULL,
  trueShootingAttempts INT  NOT NULL,
  trueShootingPercentage INT  NOT NULL,
  playerEfficiencyRating INT  NOT NULL,
  assistsPercentage INT  NOT NULL,
  stealsPercentage INT  NOT NULL,
  blocksPercentage INT  NOT NULL,
  turnoversPercentage INT  NOT NULL,
  usageRatePercentage INT  NOT NULL,
  plusMinus INT  NOT NULL,
  doubleDoubles INT  NOT NULL,
  tripleDoubles INT  NOT NULL,
  fantasyPointsfanduel INT  NOT NULL,
  fantasyPointsdraftkings INT  NOT NULL,
  fantasyPoints INT NOT NULL,
  fantasyPointsFantasyDraft INT NOT NULL 
);