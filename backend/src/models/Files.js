const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Folders = require("./Folders");
const Users = require("./Users");

const Files = sequelize.define(
  "Files",
  {
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O nome do arquivo não pode estar vazio.",
        },
      },
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false,
      // Você pode adicionar outras validações ou configurações conforme necessário
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Você pode adicionar outras validações ou configurações conforme necessário
    },
    fileUrl: {
      type: DataTypes.STRING, // ou TEXT para URLs longas
      allowNull: false,
    },
  },
  {
    tableName: "files",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
  }
);

Files.belongsTo(Folders); // Estabelecendo relação com Pastas
Files.belongsTo(Users); // Estabelecendo relação com Usuários

module.exports = Files;
