import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import servicoDeArquivos from "../../services/fileService";
//import Notificacao from "../../components/Notification/Notification";
//import iconeBaixar from "../../assets/icons/download.png";
//import iconeDeletar from "../../assets/icons/lixeira.png";
//import iconeMais from "../../assets/icons/treePonits.png";
//import iconeNovoArquivo from "../../assets/icons/mais.png";
//import logo from "../../assets/logos/retangular.png";
import { getUserIdFromCookie } from "../../utils/AuthenticateUser";
import TopNavBar from "../../components/NavBar/NavBar";

import "../../styles/Gerenciamento.css";

function GerenciamentoDeArquivos() {
  const userData = getUserIdFromCookie();
  console.log(userData);

  return (
    <div>
      <TopNavBar />
      <div className="content-below-navbar">
        <p>Bem-vindo {userData}</p>
      </div>
    </div>
  );
}

export default GerenciamentoDeArquivos;
