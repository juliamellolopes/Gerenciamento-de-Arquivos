const { VersionHistory } = require("../models/VersionHistory.js"); // Importe os modelos apropriados
//const s3 = require("../config/configAWS");
const Files = require("../models/Files.js");

const versionsController = {
  async downloadFile(req, res) {
    const { versionHistoryId } = req.params;

    try {
      const versionHistory = await VersionHistory.findByPk(versionHistoryId);

      if (!versionHistory || !versionHistory.arquivoAntigoKey) {
        return res
          .status(404)
          .json({ mensagem: "Arquivo antigo não encontrado" });
      }

      //const params = {
      //  Bucket: "SEU_BUCKET_NAME",
      //  Key: versionHistory.arquivoAntigoKey, // chave do arquivo no S3
      //};

      //const fileStream = s3.getObject(params).createReadStream();
      fileStream.pipe(res);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar o arquivo antigo" });
    }
  },

  async listarVersoesArquivo(req, res) {
    const { fileId } = req.params;

    try {
      // Encontre o arquivo pelo ID
      const file = await Files.findByPk(fileId);

      if (!file) {
        return res.status(404).json({ mensagem: "Arquivo não encontrado" });
      }

      // Encontre as versões do arquivo pelo ID do arquivo
      const versoes = await VersionHistory.findAll({
        where: { fileId },
        order: [["updatedAt", "DESC"]], // Ordena por data de atualização, da mais recente para a mais antiga
      });

      res.status(200).json({ versoes });
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar as versões do arquivo" });
    }
  },
};

module.exports = versionsController;
