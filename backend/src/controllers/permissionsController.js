const { Permission, User, File } = require("../models");

async function cadastrarPermissaoArquivo(req, res) {
  const { userId, fileId, accessLevel } = req.body;

  try {
    // Verifica se o usuário existe e tem permissão para atribuir permissões
    const user = await User.findByPk(userId);

    if (!user || user.accessLevel > 2) {
      return res
        .status(403)
        .json({ mensagem: "Sem permissão para atribuir permissões" });
    }

    // Verifica se o arquivo existe
    const file = await File.findByPk(fileId);

    if (!file) {
      return res.status(404).json({ mensagem: "Arquivo não encontrado" });
    }

    const novaPermissao = await Permission.create({
      userId,
      fileId,
      accessLevel,
    });

    res.status(201).json({
      mensagem: "Permissão atribuída ao arquivo com sucesso",
      novaPermissao,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar a permissão ao arquivo" });
  }
}

async function cadastrarPermissaoPasta(req, res) {
  const { userId, folderId, accessLevel } = req.body;

  try {
    // Verifica se o usuário existe e tem permissão para atribuir permissões
    const user = await User.findByPk(userId);

    if (!user || user.accessLevel > 2) {
      return res
        .status(403)
        .json({ mensagem: "Sem permissão para atribuir permissões" });
    }

    // Verifica se a pasta existe
    const folder = await Folder.findByPk(folderId);

    if (!folder) {
      return res.status(404).json({ mensagem: "Pasta não encontrada" });
    }

    const novaPermissao = await Permission.create({
      userId,
      folderId,
      accessLevel,
    });

    res
      .status(201)
      .json({
        mensagem: "Permissão atribuída à pasta com sucesso",
        novaPermissao,
      });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar a permissão à pasta" });
  }
}

module.exports = {
  cadastrarPermissaoArquivo,
  cadastrarPermissaoPasta,
};
