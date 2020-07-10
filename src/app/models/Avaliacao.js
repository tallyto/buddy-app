const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Avaliacoes extends Model {
  static init(sequelize) {
    super.init(
      {
        comentario: Sequelize.STRING,
        avaliacao: Sequelize.INTEGER,
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

module.exports = Avaliacoes;
