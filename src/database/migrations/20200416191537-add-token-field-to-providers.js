module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('providers', 'token', {
    type: Sequelize.STRING,
    allowNull: true,
  }),
  down: (queryInterface) => queryInterface.removeColumn('providers', 'token'),
};
