const { VersionHistory } = require("../models"); // Importe os modelos apropriados
const s3 = require("../config/configAWS");

async function downloadFile(req, res) {
  const { versionHistoryId } = req.params;

  try {
    const versionHistory = await VersionHistory.findByPk(versionHistoryId);

    if (!versionHistory || !versionHistory.arquivoAntigoKey) {
      return res
        .status(404)
        .json({ mensagem: "Arquivo antigo não encontrado" });
    }

    const s3 = new AWS.S3({
      accessKeyId: "SEU_ACCESS_KEY_ID",
      secretAccessKey: "SEU_SECRET_ACCESS_KEY",
      // outras configurações necessárias para acessar seu bucket do S3
    });

    const params = {
      Bucket: "SEU_BUCKET_NAME",
      Key: versionHistory.arquivoAntigoKey, // chave do arquivo no S3
    };

    const fileStream = s3.getObject(params).createReadStream();
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o arquivo antigo" });
  }
}

module.exports = {
  downloadFile,
};
