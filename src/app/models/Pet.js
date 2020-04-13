const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Pets extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        raca: Sequelize.STRING,
        genero: Sequelize.STRING,
        descricao: Sequelize.STRING,
        idade: Sequelize.INTEGER,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.hasMany(models.Vacina, { foreignKey: 'pet_id', as: 'vacinas' });
  }
}

module.exports = Pets;
