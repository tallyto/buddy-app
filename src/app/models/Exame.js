const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Exames extends Model {
  static init(sequelize) {
    super.init(
      {
        exame: Sequelize.STRING,
        material: Sequelize.STRING,
        prazo: Sequelize.STRING,
        valor_final: Sequelize.STRING,
        valor_laboratorio: Sequelize.STRING,
        laboratorio: Sequelize.STRING,
        data: Sequelize.DATE,
      },
      { sequelize },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Provider, { foreignKey: 'provider_id', as: 'providers' });
    this.belongsTo(models.Pets, { foreignKey: 'pet_id', as: 'pets' });
  }
}

module.exports = Exames;
