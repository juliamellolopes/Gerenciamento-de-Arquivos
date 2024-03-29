import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logoRetangular from "../../assets/logos/rectangular.png";
import sair from "../../assets/Icons/logut.png";
import { clearUserIdFromCookie } from "../../utils/AuthenticateUser";
import Notification from "../../components/Notification/Notification";
import { useNavigate } from "react-router-dom";
import UserModal from "../Modal/user.js";
import ConfigModal from "../Modal/configuracoes.js";

const TopNavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ebeff7;
  padding: 0 20px;
  height: 60px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0; // Usa uma variável CSS com fallback
  z-index: 10;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: left 0.3s;

  @media (max-width: 768px) {
    left: 0;
  }
`;

const UserArea = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .logo {
    width: 150px; // Ajuste o tamanho da logo conforme necessário
    position: absolute; // Posiciona a logo em relação ao contêiner
    left: -16px;
  }

  .logou-img {
    width: 20px;
    height: 20px;
  }
`;

const TopNavBar = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    type: "",
    message: "",
    visible: false,
  });

  const showNotification = (type, message) => {
    setNotification({
      type,
      message,
      visible: true,
    });
  };

  const handleLogout = () => {
    clearUserIdFromCookie();
    navigate(`/login`);

    showNotification("success", "Logout realizado com sucesso!");
    console.log("Logout realizado!");
  };

  return (
    <TopNavBarContainer>
      <UserArea>
        <img src={logoRetangular} alt="LogoRetangular" className="logo" />
      </UserArea>
      <UserArea>
        <ConfigModal />
        <UserModal />
        <img
          src={sair}
          alt="sair"
          className="logou-img"
          onClick={handleLogout}
        />
      </UserArea>
      <Notification
        type={notification.type}
        message={notification.message}
        visible={notification.visible}
      />
    </TopNavBarContainer>
  );
};

export default TopNavBar;
