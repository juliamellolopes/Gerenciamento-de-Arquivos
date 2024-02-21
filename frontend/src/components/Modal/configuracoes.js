import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import configuracoes from "../../assets/Icons/engrenagem.png";

const style = {
  position: "fixed",
  top: "20%",
  right: "0%",
  transform: "translateY(-50%)",
  width: 250,
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 2,
};

const Link = styled.a`
  text-decoration: none;
  color: #007bff;
`;

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <UserArea>
        <img
          src={configuracoes}
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
          <div>
            <Typography variant="h6" component="h2">
              Configurações
            </Typography>
            <Typography variant="body2">
              <Link href="/configuracoes-sistema">
                Configurações do sistema
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link href="/permissoes-uso">Permissões de uso</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="/adicionar-usuario">Adicionar usuário</Link>
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
