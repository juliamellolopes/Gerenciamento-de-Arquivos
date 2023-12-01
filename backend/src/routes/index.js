const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");

// Rota para cadastrar um novo usuário
router.post("/cadastro", usersController.cadastrarUser);
router.get("/redefinir-senha", usersController.redefinirSenha);

module.exports = router;
