import React from "react";
import styled from "styled-components";
//import { AiOutlineBell } from "react-icons/ai"; // Ícone de notificação
//import UserImage from "../../images/Eduardo (1).png";
import iconeUser from "../../assets/Icons/user.png";
import logoRetangular from "../../assets/logos/rectangular.png";
import configuracoes from "../../assets/Icons/engrenagem.png";
import sair from "../../assets/Icons/logut.png";

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
  return (
    <TopNavBarContainer>
      <UserArea>
        <img src={logoRetangular} alt="LogoRetangular" className="logo" />
      </UserArea>
      <UserArea>
        <img src={configuracoes} alt="config" className="config-img" />
        <img src={iconeUser} alt="User" className="user-image" />
        <img src={sair} alt="sair" className="logou-img" />
      </UserArea>
    </TopNavBarContainer>
  );
};

export default TopNavBar;
