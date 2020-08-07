module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('conta_bancaria', 'recipient_id', {
    type: Sequelize.STRING,
    allowNull: true,
  }),
  down: (queryInterface) => queryInterface.removeColumn('conta_bancaria', 'recipient_id'),
};
