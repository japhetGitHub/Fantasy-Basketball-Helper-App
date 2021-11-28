import axiosInterceptor from './custom.axios-interceptor';

const API_URL = 'http://localhost:3001/api/league';


const getAllPlayerInLeague = () => {
  return axiosInterceptor.get(API_URL + '/allPlayer')
    .then((response) => response.data);
};

const getNewsForPlayer = (playerId) => {
  return axiosInterceptor.get(API_URL + `/news/${playerId}`)
    .then((response) => {
      return response.data;
    });
};


const leagueService = {
  getAllPlayerInLeague,
  getNewsForPlayer,
};

export default leagueService;
