const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        token: Sequelize.STRING,
        token_created_at: Sequelize.DATE,
      },
      { sequelize },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Pets, { foreignKey: 'user_id', as: 'pets' });
    this.hasMany(models.Endereco, { foreignKey: 'user_id', as: 'enderecos' });
    this.hasMany(models.CreditCard, { foreignKey: 'user_id', as: 'credit_cards' });
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
