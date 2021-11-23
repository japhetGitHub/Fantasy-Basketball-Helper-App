import axios from "axios";
import TokenService from "./token.service";

const API_URL = "http://localhost:3001/api";
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  console.log("Inside Request Interceptor");
  // Doing stuff before request is sent
  const token = TokenService.getAccessToken();
  console.log("Token:", token);
  if (token) {
    // config.headers["Authorization"] = 'Bearer ' + token;
    config.headers["x-access-token"] = 'Bearer ' + token; // for Node.js Express back-end
  }
  // config.headers['Content-Type'] = 'application/json'; // already set in instance
  console.log("Config:", config);
  return config;
}, (error) => {
  console.log("INCASE Interceptor Request Error");
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function(response) { // Any status code that lie within the range of 2xx cause this function to trigger
  return response;
}, function(err) { // Any status codes that falls outside the range of 2xx cause this function to trigger
  const originalRequest = err.config;

  if (originalRequest.url !== "/authenticate/login" && err.response) { // as long as user wasn't trying to login (i.e. this flow is only for potentially updating token)
    // Access Token was expired
    if (err.response.status === 401 && originalRequest.url === (API_URL + '/authenticate/token')) { // 401 when no refreshToken is sent)
      // TO DO: Redirect to login page upon unsuccessfully refreshing token (try using history package)
      return Promise.reject(err);
    }
    
    if (err.response.status === 403 && !originalRequest._retry) { // api sends status 403 when accessToken can't be verified.
      originalRequest._retry = true; // retry flag ensures that this interceptor doesn't infinitely try to retry requesting for new token.

      const refreshToken = TokenService.getRefreshToken();
      return axiosInstance.post('/authenticate/token', { "token": refreshToken }) // backend expects body with "token" property
        .then(res => {
          if (res.status === 201) { // status 201 because new resource was made (i.e. new access token)
            const { accessToken } = res.data;
            TokenService.updateAccessToken(accessToken);

            axiosInstance.defaults.headers.common['x-access-token'] = 'Bearer ' + TokenService.getAccessToken(); // access token is a bearer token
            return axiosInstance(originalRequest); // re-attempts original request now with a new access token
          }
        }).catch((_error) => {
          return Promise.reject(_error);
        });
    }
  }

  return Promise.reject(err);
});

export default axiosInstance;