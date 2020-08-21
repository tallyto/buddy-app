module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('providers', 'avaliacao', {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  }),
  down: (queryInterface) => queryInterface.removeColumn('providers', 'avaliacao'),
};
