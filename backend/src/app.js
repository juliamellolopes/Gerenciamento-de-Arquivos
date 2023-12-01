const express = require("express");
const sequelize = require("./config/database");
const fileRoutes = require("./routes/fileRoutes"); // Importe suas rotas
const userRoutes = require("./routes/userRoutes");
// Importe outras rotas, se houver

const app = express();

// Middlewares e configurações do Express
app.use(express.json()); // Habilita o uso de JSON nas requisições

// Definição das rotas
app.use("/files", fileRoutes); // Adicione suas rotas de arquivos
app.use("/users", userRoutes); // Adicione suas rotas de usuários
// Adicione outras rotas aqui, se necessário

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
