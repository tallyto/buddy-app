const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Consultas extends Model {
  static init(sequelize) {
    super.init(
      {
        anamnese: Sequelize.STRING,
        avaliacao_clinica: Sequelize.STRING,
        prescricao: Sequelize.STRING,
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

module.exports = Consultas;
