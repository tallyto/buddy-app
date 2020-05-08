module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('agendamentos', 'pet_id', {
    type: Sequelize.INTEGER,
    references: { model: 'pets', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: false,
  }),

  down: (queryInterface) => queryInterface.removeColumn('agendamentos', 'pet_id'),
};
