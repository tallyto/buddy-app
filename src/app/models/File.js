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
            return `https://buddy-pet.herokuapp.com/files/${this.path}`;
          },
        },
      },
      { sequelize },
    );
    return this;
  }
}

module.exports = File;
