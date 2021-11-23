import axiosInterceptor from './custom.axios-interceptor';
import TokenService from "./token.service";

const API_URL = "http://localhost:3001/api/authenticate/";


const login = (username, password) => {
  const credentials = {
    username,
    password
  };
  console.log("IN AUTH SERVICE Start");
  
  // axios.post(API_URL + 'login', credentials).then((res) => {
  //   console.log("TEST 1");
  //   return res;
  // }).catch(() => console.log("ERROR TEST 1 CAUGHT"));

  return axiosInterceptor.post(API_URL + 'login', credentials)
    .then(response => { // expecting an access token
      console.log("IN AUTH SERVICE POST:",response);
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
        // localStorage.setItem("user", JSON.stringify(response.data));
        // TODO: figure out where to store accessToken

        // localStorage.setItem("user", JSON.stringify(response.data.refreshToken));
      }

      return response.data;
    }); // passes on potential error received in axios interceptor when login is unsuccessful
};

const logout = () => {
  TokenService.removeUser();
  //TODO: remove accessToken from where it was stored
};

const register = (email, password) => {
  return axiosInterceptor.post(API_URL + "register", { // **** backend route not implemented yet *****
    email,
    password
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