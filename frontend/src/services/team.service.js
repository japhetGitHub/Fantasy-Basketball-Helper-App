import axiosInterceptor from './custom.axios-interceptor';

const API_URL = 'http://localhost:3001/api/team';


const getAllTeamForUser = () => {
  return axiosInterceptor.get(API_URL + '/all')
    .then((response) => response.data);
};

const getAllPlayerForTeam = (teamId) => {
  return axiosInterceptor.get(API_URL + `/overview/${teamId}`)
    .then((response) => response.data);
};

const getPlayersToManage = (teamId) => {
  return axiosInterceptor.get(API_URL + `/overview/${teamId}`)
    .then((response) => {
      const managePlayers = [];

      response.data.players.forEach((playerInfo) => {
        managePlayers.push({
          playerName: playerInfo.playerFirstName + " " + playerInfo.playerLastName,
          position: playerInfo.position,
          playerId: playerInfo.playerId
        });
      });

      return managePlayers;
    });
};

const getStartingLineups = (teamId) => {
  return axiosInterceptor.get(API_URL + `/overview/${teamId}`)
    .then((response) => {
      const managePlayers = {
        teamName: response.data.teamName,
        players: []
      };

      response.data.players.forEach((playerInfo) => {
        managePlayers.players.push({
          playerId: playerInfo.playerId,
          playerFirstName: playerInfo.playerFirstName,
          playerLastName: playerInfo.playerLastName,
          playerImage: playerInfo.playerImage,
          position: playerInfo.position,
          Game: playerInfo.lastWeekGame,
          Points: playerInfo.lastWeekPoints,
          "Fantasy Points": playerInfo.lastWeekFan,
          Blocks: playerInfo.lastWeekBlocks,
          Steals: playerInfo.lastWeekSteals
        });
      });

      return managePlayers;
    });
};

const teamService = {
  getAllTeamForUser,
  getAllPlayerForTeam,
  getPlayersToManage,
  getStartingLineups
};

export default teamService;
