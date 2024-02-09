import React, { useState, useEffect } from "react";
import {
  saveUserCredentials,
  getUserCredentials,
  saveUserData,
  isAuthenticated,
} from "../../utils/cookieManager";
import validateServices from "../../utils/validateServices";
import userService from "../../services/userService";
import showPasswordIcon from "../../assets/Icons/showPassword.png";
import hidePasswordIcon from "../../assets/Icons/hidePassword.png";
import Notification from "../../components/Notification/Notification";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../utils/AuthenticateUser";
import Loader from "../../components/Loader/loading";

import "../../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(hidePasswordIcon);
  const [isLoading, setIsLoading] = useState(false);

  const [notification, setNotification] = useState({
    type: "",
    message: "",
    visible: false,
  });

  const navigate = useNavigate();

  const showNotification = (type, message) => {
    setNotification({
      type,
      message,
      visible: true,
    });
  };

  useEffect(() => {
    // Verificar se há credenciais salvas ao iniciar o componente
    const { savedEmail, savedPassword, savedRememberMe } = getUserCredentials();

    if (savedRememberMe === "true" && savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      // Validar dados antes de prosseguir
      validateServices.validateUserData(email, password);

      // Continuar com a lógica de login se a validação passar
      const userData = await userService.login(email, password);

      // Salvar credenciais se "lembrar-me" estiver ativado
      saveUserCredentials(email, password, rememberMe);
      saveUserData(userData);

      showNotification("success", userData.message);

      const { token } = userData.data; // Extrai o token da resposta
      localStorage.setItem("token", token); // Armazena o token no localStorage

      if (authenticateUser()) {
        // Redirecionar após o login bem-sucedido
        navigate(`/dashboard`);
      } else {
        //mensagem de erro
      }
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated()) {
    // Redirecionar ou fazer algo se já estiver autenticado
    navigate(`/dashboard`);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setHidePassword(showPassword ? hidePasswordIcon : showPasswordIcon);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-acess">
          <h1>Bem Vindo</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password-button"
              onClick={togglePasswordVisibility}
            >
              <img
                src={hidePassword}
                alt={showPassword ? "Ocultar senha" : "Mostrar senha"}
              />
            </span>
          </div>
          <div className="login-remember">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Remember</label>
            <a href="/forgot-password" className="forgot-password">
              forgot password?
            </a>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="login-branding">
          <div className="brand-logo"> </div>
          <div className="brand-slogan"> </div>
        </div>
      </div>
      <Notification
        type={notification.type}
        message={notification.message}
        visible={notification.visible}
      />
      <ToastContainer />
    </div>
  );
}

export default Login;

//import { getUserIdFromCookie, setUserIdInCookie } from "./authUtils.js";
//import axios from "axios";

//async function login(email, senha) {
//  try {
//    const response = await axios.post("http://localhost:3003/api/login", {
//      email,
//      senha,
//    });
//    const { token } = response.data; // Extrai o token da resposta
//    localStorage.setItem("token", token); // Armazena o token no localStorage

//    if (authenticateUser()) {
//      // Redireciona o usuário para outra página
//      window.location.href = "outraPagina.html";
//    } else {
//      //mensagem de erro
//    }
//  } catch (error) {
//    console.error("Erro ao fazer login:", error);
//  }
//}

//// Exemplo de uso para obter o userId do cookie
//const userId = getUserIdFromCookie();
