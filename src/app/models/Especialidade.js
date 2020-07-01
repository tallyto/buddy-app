const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Especialidades extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Provider, { foreignKey: 'especialidade_id', through: 'provider_especialidades', as: 'providers' });
  }
}

module.exports = Especialidades;
