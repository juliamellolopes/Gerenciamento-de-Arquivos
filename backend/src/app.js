const express = require("express");
const sequelize = require("./config/database");
const router = require("./routes/index");

const app = express();

// Middlewares e configurações do Express
app.use(express.json()); // Habilita o uso de JSON nas requisições

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

app.use("", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
