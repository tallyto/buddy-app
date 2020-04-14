const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        size: Sequelize.STRING,
        key: Sequelize.STRING,
        url: Sequelize.STRING,
      },
      { sequelize },
    );
    return this;
  }
}

module.exports = File;
