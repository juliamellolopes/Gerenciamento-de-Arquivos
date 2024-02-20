const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const folderController = require("../controllers/folderController");
const filesController = require("../controllers/filesController");
const permissionsController = require("../controllers/permissionsController");
const versionsController = require("../controllers/versionsController");

//Versions
router.get("/download/:versionHistoryId", versionsController.downloadFile);
router.get(
  "/arquivos/:fileId/versoes",
  versionsController.listarVersoesArquivo
);

//Permissions
router.post(
  "/permissao/arquivo",
  permissionsController.cadastrarPermissaoArquivo
);
router.post("/permissao/pasta", permissionsController.cadastrarPermissaoPasta);

//Files
router.post("/criarArquivo", filesController.criarArquivo);
router.delete(
  "/deletarArquivo/:userId/:arquivoId",
  filesController.deletarArquivo
);
router.get("/baixarArquivo/:userId/:arquivoId", filesController.baixarArquivo);
router.put(
  "/atualizarArquivo/:userId/:arquivoId",
  filesController.atualizarArquivo
);

//Folder
router.post("/criarPasta", folderController.criarPasta);
router.delete("/deletarPasta/:userId/:pastaId", folderController.deletarPasta);
router.put("/editarPasta/:userId/:pastaId", folderController.editarPasta);

//User
router.post("/cadastrar", userController.cadastrarUser);
router.post("/login", userController.login);
router.put("/redefinir-senha", userController.redefinirSenha);
router.get(
  "/usuarios/:userId/pastas-arquivos",
  userController.listarPastasArquivos
);
router.get("/pesquisar-user/:userId", userController.pesquisarUser);

module.exports = router;
