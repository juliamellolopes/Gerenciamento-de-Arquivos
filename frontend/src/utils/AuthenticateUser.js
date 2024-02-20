import { jwtDecode } from "jwt-decode";

export function authenticateUser() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      localStorage.setItem("cookie", decodedToken.userId.id);
      return true;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return false;
    }
  } else {
    return false;
  }
}

export function clearUserIdFromCookie() {
  localStorage.setItem("cookie", null);
}

export default { authenticateUser, clearUserIdFromCookie };
