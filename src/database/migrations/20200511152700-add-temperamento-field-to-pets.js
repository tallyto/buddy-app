module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('pets', 'temperamento', {
    type: Sequelize.STRING,
    allowNull: true,
  }),
  down: (queryInterface) => queryInterface.removeColumn('pets', 'temperamento'),
};
