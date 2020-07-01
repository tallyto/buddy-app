module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('agendamentos', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    payment: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    accept: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    },
    provider_id: {
      type: Sequelize.INTEGER,
      references: { model: 'providers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    },
    pet_id: {
      type: Sequelize.INTEGER,
      references: { model: 'pets', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    },
    canceled_at: {
      type: Sequelize.DATE,
      allowNull: true,
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

  down: (queryInterface) => queryInterface.dropTable('agendamentos'),
};
