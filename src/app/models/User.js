const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        telefone: Sequelize.STRING,
        endereco: Sequelize.STRING,
        token: Sequelize.STRING,
        token_created_at: Sequelize.DATE,
      },
      { sequelize },
    );

    // Executa modificações no usuario antes de gravar no banco de dados
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // Faz a referencia de um id de arquvio na tabela de usuário
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
