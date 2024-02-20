import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Porta do backend

const userService = {
  async login(dados) {
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, dados);
      return res;
    } catch (error) {
      throw new Error("Erro ao fazer login");
    }
  },

  async cadastrarUser(dados) {
    try {
      const response = await axios.post(`${API_BASE_URL}/cadastrar`, dados);
      return response;
    } catch (error) {
      throw new Error("Erro ao cadastrar usuário");
    }
  },

  //async redefinirSenha(novaSenha, confirmarSenha, user) {
  //  try {
  //    const response = await axios.post(`${API_BASE_URL}/redefinir-senha`, {
  //      novaSenha,
  //      confirmarSenha,
  //      user,
  //    });
  //    return response.data;
  //  } catch (error) {
  //    throw new Error(error.response.data.error || "Erro ao redefinir senha");
  //  }
  //},

  async pesquisarUser(userId) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/pesquisar-user/${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || "Erro ao encontrar usuário");
    }
  },
};

export default userService;
