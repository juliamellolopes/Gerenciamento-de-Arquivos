const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Files = require("./Files");

const VersionHistory = sequelize.define("VersionHistory", {
  versionNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER, // ou o tipo correspondente ao ID do usuário
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  arquivoAntigoUrl: {
    type: DataTypes.STRING, // ou o tipo adequado para armazenar o URL
    allowNull: true, // Pode ser nulo caso a versão seja a primeira
  },
});

VersionHistory.belongsTo(Files);

module.exports = VersionHistory;
