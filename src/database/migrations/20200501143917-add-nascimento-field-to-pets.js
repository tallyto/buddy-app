module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('pets', 'nascimento', {
    type: Sequelize.DATE,
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeColumn('pets', 'nascimento'),
};
