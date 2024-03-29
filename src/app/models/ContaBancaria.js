const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class ContaBancaria extends Model {
  static init(sequelize) {
    super.init(
      {
        conta: Sequelize.STRING,
        agencia: Sequelize.STRING,
        banco: Sequelize.STRING,
        conta_dv: Sequelize.STRING,
        recipient_id:Sequelize.STRING
      },
      { sequelize },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Provider, { foreignKey: 'provider_id', as: 'providers' });
  }
}

module.exports = ContaBancaria;
