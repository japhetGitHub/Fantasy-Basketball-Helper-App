Table users as U {
  id int [pk, increment] // auto-increment
  username varchar
  email varchar
  password varchar
}

Table teams {
  id int [pk, increment]
  name varchar
  user_id int [ref: > users.id]
  platform varchar
 }

Table players_in_team {
  id int [pk, increment]
  player_id int  [ref: > player_info.player_id]// API ID
  team_id int [ref: > teams.id]
}

Table player_info {
  id int [pk, increment]
  player_id int // API ID
  first_name varchar
  last_name varchar
  team varchar
  position varchar
  average_minutes int 
  average_seconds int 
  average_fieldgoalsmade int 
  average_fieldgoalsattempted int 
  average_fieldgoalspercentage int 
  average_effectivefieldgoalspercentage int 
  average_twopointersmade int 
  average_twopointersattempted int 
  average_twopointerspercentage int 
  average_threepointersmade int 
  average_threepointersattempted int 
  average_threepointerspercentage int 
  average_freethrowsmade int 
  average_freethrowsattempted int 
  average_freethrowspercentage int 
  average_offensiverebounds int 
  average_defensiverebounds int 
  average_rebounds int 
  average_offensivereboundspercentage int 
  average_defensivereboundspercentage int 
  average_totalreboundspercentage int 
  average_assists int 
  average_steals int 
  average_blockedshots int 
  average_turnovers int 
  average_personalfouls int 
  average_points int 
  average_trueshootingattempts int 
  average_trueshootingpercentage int 
  average_playerefficiencyrating int 
  average_assistspercentage int 
  average_stealspercentage int 
  average_blockspercentage int 
  average_turnoverspercentage int 
  average_usageratepercentage int 
  average_plusminus int 
  average_doubledoubles int 
  average_tripledoubles int 
  average_fantasypointsfanduel int 
  average_fantasypointsdraftkings int 
  average_fantasypoints int
  average_fantasypointsFantasyDraft int 
}

Table player_stats {
  id int [pk, increment]
  player_id int  [ref: > player_info.player_id]// API ID
  position varchar
  game_date datetime
  minutes int 
  seconds int 
  fieldgoalsmade int 
  fieldgoalsattempted int 
  fieldgoalspercentage int 
  effectivefieldgoalspercentage int 
  twopointersmade int 
  twopointersattempted int 
  twopointerspercentage int 
  threepointersmade int 
  threepointersattempted int 
  threepointerspercentage int 
  freethrowsmade int 
  freethrowsattempted int 
  freethrowspercentage int 
  offensiverebounds int 
  defensiverebounds int 
  rebounds int 
  offensivereboundspercentage int 
  defensivereboundspercentage int 
  totalreboundspercentage int 
  assists int 
  steals int 
  blockedshots int 
  turnovers int 
  personalfouls int 
  points int 
  trueshootingattempts int 
  trueshootingpercentage int 
  playerefficiencyrating int 
  assistspercentage int 
  stealspercentage int 
  blockspercentage int 
  turnoverspercentage int 
  usageratepercentage int 
  plusminus int 
  doubledoubles int 
  tripledoubles int 
  fantasyPointsFanduel int 
  fantasyPointsDraftKings int 
  fantasyPointsYahoo int 
  fantasyPointsFantasyDraft int 
  fantasyPoints int
}