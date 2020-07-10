module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('avaliacoes', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    comentario: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avaliacao: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    provider_id: {
      type: Sequelize.INTEGER,
      references: { model: 'providers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
  down: (queryInterface) => queryInterface.dropTable('avaliacoes'),
};
