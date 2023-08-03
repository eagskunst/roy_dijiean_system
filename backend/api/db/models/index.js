const { User, UserSchema } = require("./user.model");
const { Admin, AdminSchema } = require("./admin.model");
const { Client, ClientSchema } = require("./client.model");

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize))
  Admin.init(AdminSchema, Admin.config(sequelize))
  Client.init(ClientSchema, Client.config(sequelize))
  User.associate(sequelize.models)
  Admin.associate(sequelize.models)
  Client.associate(sequelize.models)
}

module.exports = setupModels