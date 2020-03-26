const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Vacina extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: Sequelize.STRING,
        data: Sequelize.DATE,
        validade: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pet, { foreignKey: 'pet_id', as: 'pets' });
  }
}

module.exports = Vacina;
