module.exports = {
  up: (queryInterface) => queryInterface.removeColumn('pets', 'idade'),

};
