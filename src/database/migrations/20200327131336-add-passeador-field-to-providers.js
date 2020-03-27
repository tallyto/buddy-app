module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('providers', 'passeador', {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('providers', 'passeador'),
};
