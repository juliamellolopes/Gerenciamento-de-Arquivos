import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import iconeUser from "../../assets/Icons/user.png";
import userService from "../../services/userService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(120%, -203%)",
  width: 250,
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
};

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

  return (
    <div>
      <img
        src={iconeUser}
        alt="User"
        className="user-image"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ invisible: true }}
      >
        <Box sx={style}>
          {/*<Typography id="modal-modal-title" variant="h6" component="h2">
            Perfil do Usuário
          </Typography>*/}
          {userData && (
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {userData.user.name}
              </Typography>
              <Typography id="modal-modal-description">
                {userData.user.email}
              </Typography>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
