module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('conta_bancaria', 'conta_dv', {
    type: Sequelize.STRING,
    allowNull: true,
  }),
  down: (queryInterface) => queryInterface.removeColumn('conta_bancaria', 'conta_dv'),
};
