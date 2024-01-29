import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Porta do backend

const userService = {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || "Erro ao fazer login");
    }
  },

  async cadastrarUser(name, email, nivel) {
    try {
      const response = await axios.post(`${API_BASE_URL}/cadastrar`, {
        name,
        email,
        nivel,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || "Erro ao cadastrar usuário");
    }
  },

  // Outros métodos para redefinir senha, etc.
};

export default userService;
