import { jwtDecode } from "jwt-decode";

// Função para armazenar o ID do usuário nos cookies
function setUserIdInCookie(userId) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1); // Expira em 1 dia

  document.cookie = `userId=${userId}; expires=${expirationDate.toUTCString()}; Secure; HttpOnly; path=/`;
}

// Função para obter o ID do usuário do cookie
export function getUserIdFromCookie() {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith("userId=")) {
      return cookie.substring("userId=".length) || null;
    }
  }

  return null;
}

// Função para verificar se o usuário está autenticado e obter o ID do usuário
export function authenticateUser() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      setUserIdInCookie(decodedToken.userId.id);
      return true;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return false;
    }
  } else {
    return false;
  }
}

export default { authenticateUser, getUserIdFromCookie };
