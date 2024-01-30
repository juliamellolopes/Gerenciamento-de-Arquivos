import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import Notification from "../../components/Notification/Notification";
import { ToastContainer } from "react-toastify";

import "../../styles/Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // Etapa 1: Solicitar Email, Etapa 2: Redefinir Senha

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

  const handleForgotPassword = async () => {
    try {
      if (step === 1) {
        // Etapa 1: Solicitar Email
        const response = await userService.pesquisarUser(email);

        if (response.success) {
          showNotification("success", response.message);
          setStep(2); // Mude para a Etapa 2: Redefinir Senha
        } else {
          showNotification("error", response.message);
        }
      } else if (step === 2) {
        // Etapa 2: Redefinir Senha
        const response = await userService.redefinirSenha(
          email,
          password,
          response.id
        );

        if (response.success) {
          showNotification("success", response.message);
          navigate("/login"); // Redirecione para a página de login após o sucesso
        } else {
          showNotification("error", response.message);
        }
      }
    } catch (error) {
      showNotification("error", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-acess">
          {step === 1 ? (
            <div>
              <h1>Esqueceu sua Senha?</h1>
              <p>Informe seu e-mail para recuperar sua senha.</p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <h1>Redefinir Senha</h1>
              <p>Informe sua nova senha.</p>
              <input
                type="password"
                placeholder="Nova Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <button onClick={handleForgotPassword}>
            {step === 1 ? "Enviar" : "Redefinir Senha"}
          </button>
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

export default ForgotPassword;
