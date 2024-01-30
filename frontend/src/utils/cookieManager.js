import Cookies from "js-cookie";

const COOKIE_OPTIONS = { sameSite: "Lax", secure: true };

export const saveUserCredentials = (email, password, rememberMe) => {
  if (rememberMe) {
    Cookies.set("savedEmail", email, COOKIE_OPTIONS);
    Cookies.set("savedPassword", password, COOKIE_OPTIONS);
    Cookies.set("savedRememberMe", "true", COOKIE_OPTIONS);
  } else {
    Cookies.remove("savedEmail");
    Cookies.remove("savedPassword");
    Cookies.remove("savedRememberMe");
  }
};

export const saveUserData = (userData) => {
  Cookies.set("userData", JSON.stringify(userData), COOKIE_OPTIONS);
};

export const getUserCredentials = () => {
  const savedEmail = Cookies.get("savedEmail");
  const savedPassword = Cookies.get("savedPassword");
  const savedRememberMe = Cookies.get("savedRememberMe");

  return { savedEmail, savedPassword, savedRememberMe };
};

export const getUserData = () => {
  const userDataString = Cookies.get("userData");
  return userDataString ? JSON.parse(userDataString) : null;
};

export const isAuthenticated = () => {
  // Adicione sua lógica de autenticação aqui
  const userData = getUserData();
  return !!userData;
};
