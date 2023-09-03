export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return JSON.parse(user !==  "undefined" ? user : {});
};

export const getJWToken = () => {
  const { accessToken } = getUserFromLocalStorage() ?? {};
  return accessToken;
};

export const setUserInLocalStorage = (user) => {
  localStorage.setItem("user", user ? JSON.stringify(user) : {});
};