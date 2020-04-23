module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('agendamentos', 'value', {
    type: Sequelize.STRING,
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('agendamentos', 'value'),
};
