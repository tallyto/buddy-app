module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('providers', 'token_created_at', {
    type: Sequelize.DATE,
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('providers', 'token_created_at'),
};
