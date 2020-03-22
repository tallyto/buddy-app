const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Categorias extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,

      },
      {
        sequelize,
      },
    );

    return this;
  }
}

module.exports = Categorias;
