module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('conta_bancaria', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    agencia: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    conta: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    banco: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    provider_id: {
      type: Sequelize.INTEGER,
      references: { model: 'providers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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

  down: (queryInterface) => queryInterface.dropTable('conta_bancaria'),
};
