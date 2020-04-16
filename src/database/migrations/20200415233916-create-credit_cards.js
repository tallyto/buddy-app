module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('credit_cards', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    titular: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    card_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    validade: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cvv: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('credit_cards'),
};
