const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://buddyaplicativo.com.br/files/${this.path}`;
          },
        },
      },
      { sequelize },
    );


    return this;
  }
}

module.exports = File;
