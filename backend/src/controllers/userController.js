const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function listarPastasArquivosAcessiveis(userId, pastaId = null) {
  try {
    // Buscar as permissões do usuário para as pastas
    const userPermissions = await Permission.findAll({
      where: { userId },
      include: [{ model: Folder }],
    });

    // Filtrar as pastas acessíveis com base nas permissões
    const accessibleFolders = userPermissions
      .filter((permission) => permission.Folder)
      .map((permission) => permission.Folder);

    const pastasArquivosAcessiveis = [];
    // Função recursiva para listar pastas e arquivos
    async function listarPastasArquivos(pastaAtualId = null) {
      const subPastas = accessibleFolders.filter(
        (folder) => folder.pastaPaiId === pastaAtualId
      );

      for (const subPasta of subPastas) {
        const pastaInfo = {
          id: subPasta.id,
          nome: subPasta.nome,
          arquivos: [], // Aqui serão listados os arquivos da pasta
          subpastas: [], // Aqui serão listadas as subpastas
        };

        // Buscar os arquivos da pasta
        const pastaFiles = await File.findAll({
          where: { folderId: subPasta.id },
        });

        pastaInfo.arquivos = pastaFiles.map((file) => ({
          id: file.id,
          nome: file.nome,
        }));

        // Recursivamente listar as subpastas
        pastaInfo.subpastas = await listarPastasArquivos(subPasta.id);

        pastasArquivosAcessiveis.push(pastaInfo);
      }

      return pastasArquivosAcessiveis;
    }

    return listarPastasArquivos(pastaId);
  } catch (error) {
    throw new Error("Erro ao listar pastas e arquivos acessíveis");
  }
}

const userController = {
  async cadastrarUser(req, res) {
    const { name, email, nivel } = req.body;

    try {
      // Verificar se o email já está em uso
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ mensagem: "Email já está em uso." });
      }

      const newUser = await User.create({ name, email, nivel });
      res
        .status(201)
        .json({ data: newUser, mesagem: "User cadastrado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao cadastrar o usuário" });
    }
  },

  async login(req, res) {
    const { Email, Password } = req.body;

    try {
      const user = await User.findOne({ where: { Email } });

      if (!user) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      if (!user.senhaDefinida) {
        return res.status(200).json({ mensagem: "Redefinir a senha" });
      }

      const passwordMatch = await bcrypt.compare(Password, user.Password);

      if (!passwordMatch) {
        return res.status(401).json({ mensagem: "Credenciais inválidas" });
      }

      const token = jwt.sign({ userId: user.id }, "seu_segredo_secreto", {
        expiresIn: "1h",
      });

      res.json({ token, data: user });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  },

  async redefinirSenha(req, res) {
    const { novaSenha, confirmarSenha } = req.body;

    if (novaSenha !== confirmarSenha) {
      return res.status(400).send("As senhas não correspondem");
    }

    try {
      const { userId } = req.user; // Se você estiver usando autenticação, pode acessar o ID do usuário assim

      // Gere um hash para a nova senha antes de salvá-la no banco de dados
      const hashedPassword = await bcrypt.hash(novaSenha, 10);

      // Atualize a senha do usuário no banco de dados usando o ID do usuário
      await User.update(
        { password: hashedPassword }, // Campo da senha no modelo do usuário
        { where: { id: userId } }
      );

      res.redirect("/login"); // Redirecione para a página de login após a redefinição
    } catch (error) {
      res.status(500).send("Erro ao redefinir a senha");
    }
  },

  async listarPastasArquivos(req, res) {
    const { userId } = req.params;

    try {
      const pastasArquivosAcessiveis = await listarPastasArquivosAcessiveis(
        userId
      );
      res.status(200).json({ pastasArquivosAcessiveis });
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar pastas e arquivos" });
    }
  },
};

module.exports = userController;
