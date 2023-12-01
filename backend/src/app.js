// app.js ou index.js (arquivo principal da sua aplicação)
const sequelize = require("./config/database"); // Importe sua configuração do Sequelize
const User = require("./models/User"); // Importe seus modelos
const Folder = require("./models/Folder");
const File = require("./models/File");
const VersionHistory = require("./models/VersionHistory");

async function inicializarBancoDeDados() {
  try {
    // Sincronize os modelos com o banco de dados
    await sequelize.sync(/* { force: true } */); // Use { force: true } para recriar as tabelas (em desenvolvimento)

    console.log("Tabelas criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar as tabelas:", error);
  }
}

inicializarBancoDeDados();
