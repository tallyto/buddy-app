module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('agendamentos', 'accept', {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  }),
  down: (queryInterface) => queryInterface.removeColumn('agendamentos', 'accept'),
};
