module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('providers', 'avaliacao', {
    type: Sequelize.DECIMAL,
    allowNull: true,
  }),
  down: (queryInterface) => queryInterface.removeColumn('providers', 'avaliacao'),
};
