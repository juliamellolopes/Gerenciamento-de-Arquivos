import React, { useState } from "react";
import "../../styles/Login.css"; // Certifique-se de que este caminho está correto
import userService from "../../services/userService"; // Seu caminho real para userService
import logoImage from "../../assets/logo.png";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = async () => {
    try {
      // Faz a chamada para o serviço de login
      const data = await userService.login(email, password);

      // Se a autenticação for bem-sucedida, chama a função onLogin
      // Pode-se passar informações do usuário, se necessário
      onLogin(data); // Aqui você pode passar informações do usuário se necessário
    } catch (error) {
      console.error(error.message); // Lida com erros de autenticação
      // Aqui você pode exibir uma mensagem para o usuário, por exemplo:
      // setError("Falha ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Bem Vindo</h1>
        <div className="login-acess">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-remember">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember">Remember</label>
          </div>
          <a href="#" className="forgot-password">
            forgot password?
          </a>
          <button onClick={handleLogin}>Log in</button>
        </div>
        <div className="login-branding">
          <div className="brand-logo"> </div>
          <p className="brand-slogan">
            O VENDEMOS PAPEL,
            <br />
            VENDEMOS SOLUÇÃO.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
