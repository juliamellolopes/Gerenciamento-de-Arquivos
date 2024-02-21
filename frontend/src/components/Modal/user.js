import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import iconeUser from "../../assets/Icons/user.png";
import userService from "../../services/userService";
import styled from "styled-components";

const style = {
  position: "fixed",
  top: "20%",
  right: "0%",
  transform: "translateY(-50%)",
  width: 250,
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 3,
};

const UserArea = styled.div`
  .user-image {
    margin-right: 10px;
    width: 22px;
    height: 22px;
    margin-top: 5px;
  }
`;

const ProfileModal = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleOpen = async () => {
    try {
      const userData = await userService.pesquisarUser(
        localStorage.getItem("cookie")
      );
      setUserData(userData);
      setOpen(true);
    } catch (error) {
      console.error("Erro ao pesquisar usuário:", error);
    }
  };

  const handleClose = () => setOpen(false);

  const getInitials = (name) => {
    const words = name.split(" ");
    const firstTwoWords = words.slice(0, 2);
    return firstTwoWords
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };
  return (
    <div>
      <UserArea>
        <img
          src={iconeUser}
          alt="User"
          className="user-image"
          onClick={handleOpen}
        />
      </UserArea>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ invisible: true }}
      >
        <Box sx={style}>
          {userData && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#0F679A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginRight: 10,
                }}
              >
                {getInitials(userData.user.name)}
              </div>
              <div>
                <Typography variant="h6" component="h2">
                  {userData.user.name}
                </Typography>
                <Typography>{userData.user.email}</Typography>
                <Typography variant="body2">
                  <a
                    href="/configuracoes"
                    style={{ textDecoration: "none", color: "#007bff" }}
                  >
                    Editar perfil
                  </a>
                </Typography>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
