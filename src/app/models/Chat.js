const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Chat extends Model {
  static init(sequelize) {
    super.init(
      {},
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
    this.belongsTo(models.Pets, { foreignKey: 'pet_id', as: 'pets' });
  }
}

module.exports = Chat;
