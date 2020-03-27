module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('providers', 'adestrador', {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('providers', 'adestrador'),
};
