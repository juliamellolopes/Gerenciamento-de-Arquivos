const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Users = require("./Users");

const Folders = sequelize.define(
  "Folders",
  {
    folderName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O nome da pasta não pode ser vazio.",
        },
      },
    },
    // Outros campos necessários para a tabela de pastas
  },
  {
    tableName: "folders",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
  }
);

Folders.belongsTo(Users); // Estabelecendo relação com Usuários
Folders.hasMany(Folders, { as: "Subfolders", foreignKey: "ParentFolderId" }); // Relacionamento de autoassociação

module.exports = Folders;
