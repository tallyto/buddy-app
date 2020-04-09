const Sequelize = require('sequelize');
const User = require('../app/models/User');
const File = require('../app/models/File');
const Pet = require('../app/models/Pet');
const Vacina = require('../app/models/Vacina');
const Categoria = require('../app/models/Categoria');
const Provider = require('../app/models/Provider');
const Agendamento = require('../app/models/Agendamento');
const Notification = require('../app/models/Notification');


const databaseConfig = require('../config/database');

const models = [User, File, Pet, Vacina, Categoria, Provider, Agendamento, Notification];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();
