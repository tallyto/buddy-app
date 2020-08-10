module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('credit_cards', 'card_id', {
    type: Sequelize.STRING,
    allowNull: true,
  }),
  down: (queryInterface) => queryInterface.removeColumn('credit_cards', 'card_id'),
};
