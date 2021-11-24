// TODO: figure out where to store accessToken besides in localStorage (possibly in cookie) to improve security

const getRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.refreshToken;
};

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken;
};

const updateAccessToken = (token) => { // TODO: update this so that updated access token is stored in a cookie
  let user = JSON.parse(localStorage.getItem("user"));
  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const setUser = (user) => { // TODO: update this so that initial access token is stored in a cookie
  console.log("In TokenService:", JSON.stringify(user));
  localStorage.setItem("user", JSON.stringify(user));
  // localStorage.setItem("user", JSON.stringify(response.data.refreshToken));
};

const removeUser = () => { // TODO: update this so that access token is deleted from wherever it is stored
  localStorage.removeItem("user");
};


const TokenService = {
  getRefreshToken,
  getAccessToken,
  updateAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;