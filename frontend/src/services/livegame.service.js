import axiosInterceptor from './custom.axios-interceptor';

const getLiveScore = () => {
  return axiosInterceptor.get('http://localhost:3001/api/score/')
    .then((response) => response.data);
};

const scoreService = {
  getLiveScore
};

export default scoreService;