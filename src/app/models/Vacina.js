const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Vacina extends Model {
  static init(sequelize) {
    super.init(
      {
        vacina: Sequelize.STRING,
        data: Sequelize.DATE,
        revacinar: Sequelize.DATE,
        peso: Sequelize.FLOAT,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pets, { foreignKey: 'pet_id', as: 'pets' });
  }
}

module.exports = Vacina;
