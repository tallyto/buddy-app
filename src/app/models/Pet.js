const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Pets extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        raca: Sequelize.STRING,
        genero: Sequelize.STRING,
        descricao: Sequelize.STRING,
        nascimento: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Pets;
