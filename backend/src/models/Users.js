const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Users = sequelize.define(
  "Users",
  {
    // Campos do modelo de Usuários
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "O endereço de e-mail fornecido é inválido.", // Mensagem de erro personalizada
        }, // Adicionando validação de e-mail
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Exemplo de campo com valor padrão
    },
    senhaDefinida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Por padrão, a senha não está definida
    },
    nivelAcesso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "3", // Padrão para novo usuário
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
  }
);

module.exports = Users;
