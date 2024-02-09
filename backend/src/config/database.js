const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("gerenciador", "root", "123456", {
  dialect: "mysql", // O tipo do banco de dados (mysql, postgres, etc.)
  host: "localhost",
  //host: "my-rds-endpoint.xxx.us-west-2.rds.amazonaws.com", // Endpoint do seu RDS na AWS
  port: 3306, // A porta do banco de dados
  logging: false, // Define como false para desabilitar os logs do Sequelize
});

module.exports = sequelize;
