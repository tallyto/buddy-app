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
        payment: Sequelize.STRING,
        card_id:Sequelize.STRING,
        cpf:Sequelize.STRING,
        endereco_id:Sequelize.INTEGER,
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
