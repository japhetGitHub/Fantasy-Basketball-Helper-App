import axiosInterceptor from './custom.axios-interceptor';
import TokenService from "./token.service";

const API_URL = "http://localhost:3001/api/authenticate/";


const login = (username, password) => {
  const credentials = {
    username,
    password
  };
  console.log("Sending Login Request");
  return axiosInterceptor.post(API_URL + 'login', credentials)
    .then(response => { // expecting an access token
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }

      return response.data;
    }); // passes on potential error received in axios interceptor when login is unsuccessful
};

const logout = () => {
  TokenService.removeUser();
};

const register = (username, password) => {
  const credentials = {
    username,
    password
  };
  console.log("Sending Registration Request");
  return axiosInterceptor.post(API_URL + "register", credentials)
    .then(response => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data); // logs user in upon successful registration
      }

      return response.data;
    });
};

const getCurrentUser = () => {
  return TokenService.getUser();
};


const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;