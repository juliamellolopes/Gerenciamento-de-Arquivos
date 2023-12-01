const { Folder, User } = require("../models"); // Importe os modelos apropriados

const folderController = {
  // Criar uma nova pasta
  async criarPasta(req, res) {
    const { userId, nomePasta } = req.body;

    try {
      const usuario = await User.findByPk(userId);

      if (usuario.nivelAcesso <= 2) {
        // Níveis 1 e 2 têm permissão para criar pasta
        const novaPasta = await Folder.create({ nome: nomePasta });
        res
          .status(201)
          .json({ data: novaPasta, mensagem: "Pasta criada com sucesso" });
      } else {
        res.status(403).json({ mensagem: "Sem permissão para criar pasta" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar a pasta" });
    }
  },

  // Deletar uma pasta existente
  async deletarPasta(req, res) {
    const { userId, pastaId } = req.params;

    try {
      const usuario = await User.findByPk(userId);
      const pasta = await Folder.findByPk(pastaId);

      if (!pasta) {
        return res.status(404).json({ mensagem: "Pasta não encontrada" });
      }

      if (usuario.nivelAcesso <= 1) {
        // Apenas nível 1 (admin) pode excluir pasta
        await pasta.destroy();
        res.status(200).json({ mensagem: "Pasta excluída com sucesso" });
      } else {
        res.status(403).json({ mensagem: "Sem permissão para excluir pasta" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir a pasta" });
    }
  },

  // Editar uma pasta existente
  async editarPasta(req, res) {
    const { userId, pastaId } = req.params;
    const { novoNome } = req.body;

    try {
      const usuario = await User.findByPk(userId);
      const pasta = await Folder.findByPk(pastaId);

      if (!pasta) {
        return res.status(404).json({ mensagem: "Pasta não encontrada" });
      }

      if (usuario.nivelAcesso <= 2) {
        // Níveis 1 e 2 podem editar o nome da pasta
        pasta.nome = novoNome;
        await pasta.save();
        res
          .status(200)
          .json({ mensagem: "Nome da pasta atualizado com sucesso" });
      } else {
        res.status(403).json({ mensagem: "Sem permissão para editar pasta" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao editar a pasta" });
    }
  },
};

module.exports = folderController;
