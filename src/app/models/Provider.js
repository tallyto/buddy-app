const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

class Provider extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        cpf: Sequelize.STRING,
        bio: Sequelize.STRING,
        clinica: Sequelize.BOOLEAN,
        passeador: Sequelize.BOOLEAN,
        adestrador: Sequelize.BOOLEAN,
        location: Sequelize.BOOLEAN,
        notification: Sequelize.BOOLEAN,
        crmv: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      { sequelize },
    );

    this.addHook('beforeSave', async (provider) => {
      if (provider.password) {
        provider.password_hash = await bcrypt.hash(provider.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.File, { foreignKey: 'crmv_frente_id', as: 'crmv_frente' });
    this.belongsTo(models.File, { foreignKey: 'crmv_verso_id', as: 'crmv_verso' });
    this.hasMany(models.Endereco, { foreignKey: 'provider_id', as: 'enderecos' });
    this.hasMany(models.ContaBancaria, { foreignKey: 'provider_id', as: 'contas' });
    this.belongsToMany(models.Especialidades, { foreignKey: 'provider_id', through: 'provider_especialidades', as: 'especialidades' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = Provider;
