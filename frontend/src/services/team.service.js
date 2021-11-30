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
          player_name: playerInfo.playerName,
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
    }).catch((err) => console.log(err));
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
  return axiosInterceptor.get(`http://localhost:3001/api/myteam/season/${teamId}`);
};
const getSpecificTeamLatestGameData = (teamId) => {
  return axiosInterceptor.get(`http://localhost:3001/api/myteam/latest/${teamId}`);
};
const getPlayerFantasyPointsHistory = (teamId) => {
  return axiosInterceptor.get(`http://localhost:3001/api/myteam/${teamId}/fanpoints/all`)
    .then((results) => {
      console.log(results);
      results = results.data.map((player) => {
        const data = {
          games: [],
          playerName: player[0].playername
        };
        player.forEach((game, index) => {
          data.games.push({
            x: index,
            y: game.fantasypointsyahoo
          });
        });
        return data;
      });
      return results;
    });
};

const teamService = {
  getAllTeamForUser,
  getAllPlayerForTeam,
  getPlayersToManage,
  getStartingLineups,
  putUserTeam,
  deleteTeam,
  createTeam,
  getSpecificTeamSeasonData,
  getSpecificTeamLatestGameData,
  getPlayerFantasyPointsHistory
};

export default teamService;
