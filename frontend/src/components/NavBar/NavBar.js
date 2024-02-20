import React, { useState, useEffect } from "react";
import styled from "styled-components";
import iconeUser from "../../assets/Icons/user.png";
import logoRetangular from "../../assets/logos/rectangular.png";
import configuracoes from "../../assets/Icons/engrenagem.png";
import sair from "../../assets/Icons/logut.png";
import { clearUserIdFromCookie } from "../../utils/AuthenticateUser";
import Notification from "../../components/Notification/Notification";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";

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

  .logo {
    width: 60%;
  }

  .user-image {
    margin-right: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  .config-img {
    margin-right: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  .logou-img {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

const TopNavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
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

  const handleUser = async () => {
    try {
      const userData = localStorage.getItem("cookie");
      const user = await userService.pesquisarUser(userData);
      setUser(user);
      console.log(user.user);
    } catch (error) {
      console.error("Erro ao pesquisar usuário:", error);
    }
  };

  const handleConfig = () => {
    // Logica para fazer o pop-up de configurações aparecer
    console.log("configurações");
  };

  return (
    <TopNavBarContainer>
      <UserArea>
        <img src={logoRetangular} alt="LogoRetangular" className="logo" />
      </UserArea>
      <UserArea>
        <img
          src={configuracoes}
          alt="config"
          className="config-img"
          onClick={handleConfig}
        />
        <img
          src={iconeUser}
          alt="User"
          className="user-image"
          onClick={handleUser}
        />
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
