module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('credit_cards', 'endereco_id', {
    type: Sequelize.INTEGER,
    allowNull: true,
  }),
  down: (queryInterface) => queryInterface.removeColumn('credit_cards', 'endereco_id'),
};
