module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('agendamentos', 'description', {
    type: Sequelize.STRING,
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('agendamentos', 'description'),
};
