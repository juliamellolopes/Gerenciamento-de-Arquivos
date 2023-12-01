const { File, User, VersionHistory } = require("../models");
const s3 = require("../config/configAWS");

// Criar um novo arquivo
async function criarArquivo(req, res) {
  const { userId, pastaId, nomeArquivo } = req.body;

  try {
    const usuario = await User.findByPk(userId);

    if (usuario.nivelAcesso <= 2) {
      // Operação no S3: enviar arquivo
      const params = {
        Bucket: "NOME_DO_BUCKET",
        Key: pastaId + "/" + nomeArquivo, // Nome do arquivo no S3
        Body: "CONTEÚDO_DO_ARQUIVO", // Pode ser um buffer, um stream ou uma string
      };

      await s3.upload(params).promise();

      // Criar o registro do arquivo no banco de dados
      await File.create({ nome: nomeArquivo, pastaId });

      res.status(201).json({ mensagem: "Arquivo criado com sucesso" });
    } else {
      res.status(403).json({ mensagem: "Sem permissão para criar arquivo" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o arquivo" });
  }
}

async function deletarArquivo(req, res) {
  const { userId, arquivoId } = req.params;

  try {
    const usuario = await User.findByPk(userId);
    const arquivo = await File.findByPk(arquivoId);

    if (!arquivo) {
      return res.status(404).json({ mensagem: "Arquivo não encontrado" });
    }

    if (usuario.nivelAcesso <= 1) {
      // Operação no S3: deletar arquivo
      const params = {
        Bucket: "NOME_DO_BUCKET",
        Key: arquivo.pastaId + "/" + arquivo.nome, // Localização do arquivo no S3
      };

      await s3.deleteObject(params).promise();

      // Deletar o registro do arquivo no banco de dados
      await arquivo.destroy();

      res.status(200).json({ mensagem: "Arquivo excluído com sucesso" });
    } else {
      res.status(403).json({ mensagem: "Sem permissão para excluir arquivo" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir o arquivo" });
  }
}

async function baixarArquivo(req, res) {
  const { userId, arquivoId } = req.params;

  try {
    const usuario = await User.findByPk(userId);
    const arquivo = await File.findByPk(arquivoId);

    if (!arquivo) {
      return res.status(404).json({ mensagem: "Arquivo não encontrado" });
    }

    if (usuario.nivelAcesso <= 3) {
      // Operação no S3: baixar arquivo
      const params = {
        Bucket: "NOME_DO_BUCKET",
        Key: arquivo.pastaId + "/" + arquivo.nome, // Localização do arquivo no S3
      };

      const data = await s3.getObject(params).promise();
      // Realize o tratamento dos dados como necessário
      // Aqui você pode enviar o arquivo ou manipular os dados antes de enviar

      res.status(200).json({ mensagem: "Arquivo baixado com sucesso" });
    } else {
      res.status(403).json({ mensagem: "Sem permissão para baixar arquivo" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao baixar o arquivo" });
  }
}

// Atualizar um arquivo existente (substituir arquivo antigo)
async function atualizarArquivo(req, res) {
  const { userId, arquivoId } = req.params;
  const novaVersao = req.body.novaVersao; // Receba a nova versão do arquivo do corpo da requisição

  try {
    const usuario = await User.findByPk(userId);
    const arquivo = await File.findByPk(arquivoId);

    if (!arquivo) {
      return res.status(404).json({ mensagem: "Arquivo não encontrado" });
    }

    if (usuario.nivelAcesso <= 2) {
      // Operação no S3: fazer backup da versão antiga
      const paramsBackup = {
        Bucket: "NOME_DO_BUCKET",
        Key: arquivo.pastaId + "/" + arquivo.nome + "_backup", // Nome do arquivo de backup no S3
        Body: "CONTEÚDO_DA_VERSAO_ANTIGA", // Pode ser um buffer, um stream ou uma string
      };

      await s3.upload(paramsBackup).promise();

      // Operação no S3: atualizar arquivo com a nova versão
      const paramsAtualizacao = {
        Bucket: "NOME_DO_BUCKET",
        Key: arquivo.pastaId + "/" + arquivo.nome, // Localização do arquivo no S3
        Body: novaVersao, // Nova versão do arquivo
      };

      await s3.upload(paramsAtualizacao).promise();

      // Atualizar a versão no banco de dados
      arquivo.versionNumber++;
      await arquivo.save();

      // Registro no histórico com detalhes do arquivo antigo
      await VersionHistory.create({
        arquivoId: arquivo.id,
        versionNumber: arquivo.versionNumber,
        userId: usuario.id,
        updatedAt: arquivo.updatedAt,
        arquivoAntigoUrl: backupResult.Location, // URL do arquivo antigo no S3
      });

      res.status(200).json({ mensagem: "Arquivo atualizado com sucesso" });
    } else {
      res
        .status(403)
        .json({ mensagem: "Sem permissão para atualizar arquivo" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o arquivo" });
  }
}

module.exports = {
  criarArquivo,
  deletarArquivo,
  baixarArquivo,
  atualizarArquivo,
};
