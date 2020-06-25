module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('enderecos', 'estado', {
    type: Sequelize.STRING,
    allowNull: true,
  }),
  down: (queryInterface) => queryInterface.removeColumn('enderecos', 'estado'),
};
