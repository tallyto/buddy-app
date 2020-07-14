const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        content: Sequelize.STRING,
      },
      { sequelize },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.Admins, { foreignKey: 'admin_id', as: 'admin' });

  }
}

module.exports = Post;
