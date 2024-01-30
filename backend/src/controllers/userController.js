const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

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
      const existingUser = await Users.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: "Email já está em uso." });
      }

      const newUser = await Users.create({ name, email, nivel });
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
      const user = await Users.findOne({ where: { Email } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (!user.senhaDefinida) {
        return res.status(200).json({ message: "Redefinir a senha" });
      }

      const passwordMatch = await bcrypt.compare(Password, user.Password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const token = jwt.sign({ userId: user.id }, "seu_segredo_secreto", {
        expiresIn: "1h",
      });

      res.json({ token, data: user, message: "Login realizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  },

  async redefinirSenha(req, res) {
    const { novaSenha, confirmarSenha, user } = req.body;

    if (novaSenha !== confirmarSenha) {
      return res.status(400).send("As senhas não correspondem");
    }

    try {
      const userId = Users.findAll({ where: { user } });

      // Gere um hash para a nova senha antes de salvá-la no banco de dados
      const hashedPassword = await bcrypt.hash(novaSenha, 10);

      // Atualize a senha do usuário no banco de dados usando o ID do usuário
      await Users.update(
        { password: hashedPassword }, // Campo da senha no modelo do usuário
        { where: { id: userId.id } }
      );

      res.json({
        id: userId.id,
        message: "Redefinição se senha realizada com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao redefinir a senha" });
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

  async pesquisarUser(req, res) {
    const { email } = req.body;
    try {
      const user = await Users.findOne({ where: { email } });

      res
        .status(201)
        .json({ data: user.id, mesagem: "User encontrado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao encontrar usuário" });
    }
  },
};

module.exports = userController;
