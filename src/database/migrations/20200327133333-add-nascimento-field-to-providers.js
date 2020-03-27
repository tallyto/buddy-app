module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('providers', 'nascimento', {
    type: Sequelize.DATE,
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('providers', 'nascimento'),
};
