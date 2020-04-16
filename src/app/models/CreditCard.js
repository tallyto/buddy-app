const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class CreditCard extends Model {
  static init(sequelize) {
    super.init(
      {
        titular: Sequelize.STRING,
        card_number: Sequelize.STRING,
        validade: Sequelize.STRING,
        cvv: Sequelize.STRING,
      },
      { sequelize },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = CreditCard;
