import jwt_decode from "jwt-decode";

// Função para armazenar o ID do usuário nos cookies
function setUserIdInCookie(userId) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  document.cookie = `userId=${userId}; Expires=${expirationDate.toUTCString()}; Secure; HttpOnly; path=/`;
}

// Função para obter o ID do usuário do cookie
function getUserIdFromCookie() {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userId="))
    ?.split("=")[1];

  return cookieValue || null;
}

// Função para verificar se o usuário está autenticado e obter o ID do usuário
function authenticateUser() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt_decode(token);
    setUserIdInCookie(decodedToken.userId);
    return true;
  } else {
    return false;
  }
}

export default { authenticateUser, getUserIdFromCookie };
