/* eslint-disable camelcase */
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
          player_name: playerInfo.playerFirstName + " " + playerInfo.playerLastName,
          position: playerInfo.position,
          player_id: playerInfo.playerId
        });
      });

      return managePlayers;
    });
};

const getStartingLineups = (teamId) => {
  return axiosInterceptor.get(API_URL + `/overview/${teamId}`)
    .then((response) => {
      // const managePlayers = {
      //   teamName: response.data.teamName,
      //   players: []
      // };

      // response.data.players.forEach((playerInfo) => {
      //   managePlayers.players.push({
      //     playerId: playerInfo.playerId,
      //     playerFirstName: playerInfo.playerFirstName,
      //     playerLastName: playerInfo.playerLastName,
      //     playerImage: playerInfo.playerImage,
      //     position: playerInfo.position,
      //     Game: playerInfo.lastWeekGame,
      //     Points: playerInfo.lastWeekPoints,
      //     "Fantasy Points": playerInfo.lastWeekFan,
      //     Blocks: playerInfo.lastWeekBlocks,
      //     Steals: playerInfo.lastWeekSteals
      //   });
      // });

      return response.data;
    });
};

const putUserTeam = (teamId, teamArray) => {
  const playerIdArray = [];
  teamArray.forEach((player) => playerIdArray.push(player.player_id));
  return axiosInterceptor.put(API_URL + `/update/${teamId}`, { playerIdArray });
};

const deleteTeam = (teamId) => {
  return axiosInterceptor.delete(API_URL + `/delete/${teamId}`);
};

const createTeam = (name, plateform) => {
  return axiosInterceptor.post(API_URL + `/create`, {name, plateform});
};

const getSpecificTeamSeasonData = (teamId) => {
  return axiosInterceptor.get(API_URL + `/api/myteam/season/${teamId}`);
};

const teamService = {
  getAllTeamForUser,
  getAllPlayerForTeam,
  getPlayersToManage,
  getStartingLineups,
  putUserTeam,
  deleteTeam,
  createTeam,
  getSpecificTeamSeasonData
};

export default teamService;
