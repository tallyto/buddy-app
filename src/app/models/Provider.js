const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

class Provider extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        telefone: Sequelize.STRING,
        cpf: Sequelize.STRING,
        bio: Sequelize.STRING,
        endereco: Sequelize.STRING,
      },
      { sequelize },
    );

    // Executa modificações no provider antes de gravar no banco de dados
    this.addHook('beforeSave', async (provider) => {
      if (provider.password) {
        provider.password_hash = await bcrypt.hash(provider.password, 8);
      }
    });

    return this;
  }

  // Faz a referencia de um id de arquvio na tabela de usuário
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = Provider;
