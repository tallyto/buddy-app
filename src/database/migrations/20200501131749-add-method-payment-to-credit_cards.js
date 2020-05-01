module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('credit_cards', 'payment', {
    type: Sequelize.STRING,
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('credit_cards', 'payment'),
};
