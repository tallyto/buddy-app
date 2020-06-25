module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('agendamentos', 'payment', {
    type: Sequelize.STRING,
    allowNull: true,
  }),
  down: (queryInterface) => queryInterface.removeColumn('agendamentos', 'payment'),
};
