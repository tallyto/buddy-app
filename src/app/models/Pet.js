const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Pets extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        raca: Sequelize.STRING,
        especie: Sequelize.STRING,
        pelagem: Sequelize.STRING,
        sexo: Sequelize.STRING,
        condicao: Sequelize.STRING,
        temperamento: Sequelize.STRING,
        nascimento: Sequelize.DATE,
        notification_saude: Sequelize.BOOLEAN,
        notification_servicos: Sequelize.BOOLEAN,
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
