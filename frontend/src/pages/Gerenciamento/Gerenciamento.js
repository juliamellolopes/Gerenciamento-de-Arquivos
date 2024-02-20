import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import servicoDeArquivos from "../../services/fileService";
//import Notificacao from "../../components/Notification/Notification";
//import iconeBaixar from "../../assets/icons/download.png";
//import iconeDeletar from "../../assets/icons/lixeira.png";
//import iconeMais from "../../assets/icons/treePonits.png";
//import iconeNovoArquivo from "../../assets/icons/mais.png";
//import logo from "../../assets/logos/retangular.png";
import TopNavBar from "../../components/NavBar/NavBar";
import Notification from "../../components/Notification/Notification";

import "../../styles/Gerenciamento.css";

function GerenciamentoDeArquivos() {
  const userData = localStorage.getItem("cookie");

  return (
    <div>
      <TopNavBar />
      <div className="content-below-navbar">
        <div className="fm-container">
          Nome do arquivo função de deletar, update
        </div>
      </div>
    </div>
  );
}

export default GerenciamentoDeArquivos;
