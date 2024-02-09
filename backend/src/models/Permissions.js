const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Users = require("./Users");
const Folders = require("./Folders");
const Files = require("./Files");

const Permissions = sequelize.define("Permissions", {
  accessLevel: {
    type: DataTypes.ENUM("read", "write", "admin"), // Define os níveis de acesso permitidos
    allowNull: false,
    defaultValue: "read",
  },
});

Permissions.belongsTo(Users);
Permissions.belongsTo(Folders);
Permissions.belongsTo(Files);

module.exports = Permissions;
