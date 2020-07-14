const Sequelize = require('sequelize');
const User = require('../app/models/User');
const Admin = require('../app/models/Admin');
const File = require('../app/models/File');
const Pet = require('../app/models/Pet');
const Vacina = require('../app/models/Vacina');
const Provider = require('../app/models/Provider');
const Agendamento = require('../app/models/Agendamento');
const Notification = require('../app/models/Notification');
const CreditCard = require('../app/models/CreditCard');
const Endereco = require('../app/models/Endereco');
const Post = require('../app/models/Post');
const Chat = require('../app/models/Chat');
const ContaBancaria = require('../app/models/ContaBancaria');
const Consulta = require('../app/models/Consulta');
const Exame = require('../app/models/Exame');
const Especialidade = require('../app/models/Especialidade');
const Avaliacao = require('../app/models/Avaliacao');

const databaseConfig = require('../config/database');

const models = [
  User,
  File,
  Pet,
  Vacina,
  Provider,
  Agendamento,
  Notification,
  CreditCard,
  Endereco,
  Post,
  Chat,
  ContaBancaria,
  Consulta,
  Exame,
  Especialidade,
  Avaliacao,
  Admin
];

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
