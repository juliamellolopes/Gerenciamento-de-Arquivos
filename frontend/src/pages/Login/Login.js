import React, { useState } from "react";
import "../../styles/Login.css"; // Certifique-se de que este caminho está correto
import userService from "../../services/userService"; // Seu caminho real para userService
import showPasswordIcon from "../../assets/Icons/showPassword.png";
import hidePasswordIcon from "../../assets/Icons/hidePassword.png";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(hidePasswordIcon);

  const handleLogin = async () => {
    try {
      const data = await userService.login(email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

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
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember">Remember</label>
            <a href="#" className="forgot-password">
              forgot password?
            </a>
          </div>
          <button onClick={handleLogin}>Log in</button>
        </div>
        <div className="login-branding">
          <div className="brand-logo"> </div>
          <div className="brand-slogan"> </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
