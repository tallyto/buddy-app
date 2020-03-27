module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('providers', 'clinica', {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('providers', 'clinica'),
};
