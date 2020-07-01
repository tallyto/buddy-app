module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('provider_especialidades', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    provider_id: {
      type: Sequelize.INTEGER,
      references: { model: 'providers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },
    especialidade_id: {
      type: Sequelize.INTEGER,
      references: { model: 'especialidades', key: 'id' },
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
  down: (queryInterface) => queryInterface.dropTable('provider_especialidades'),
};
