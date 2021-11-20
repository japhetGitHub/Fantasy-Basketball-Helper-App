DROP TABLE IF EXISTS players_in_team CASCADE;

CREATE TABLE players_in_team (
  id SERIAL PRIMARY KEY NOT NULL,
  player_id INTEGER REFERENCES player_info(playerId),
  team_id INTEGER REFERENCES teams(id)
);