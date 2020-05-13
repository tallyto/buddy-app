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
        nascimento: Sequelize.DATE,
        clinica: Sequelize.BOOLEAN,
        passeador: Sequelize.BOOLEAN,
        adestrador: Sequelize.BOOLEAN,
        crmv: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        token: Sequelize.STRING,
        token_created_at: Sequelize.DATE,
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
    this.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
    this.hasMany(models.Endereco, { foreignKey: 'provider_id', as: 'enderecos' });
    this.hasMany(models.ContaBancaria, { foreignKey: 'provider_id', as: 'contas' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = Provider;
