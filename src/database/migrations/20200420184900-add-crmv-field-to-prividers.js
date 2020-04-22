module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('providers', 'crmv', {
    type: Sequelize.STRING,
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('providers', 'crmv'),
};
