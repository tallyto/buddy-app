const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Agendamento extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
      },
      { sequelize },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Provider, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  }
}

module.exports = Agendamento;
