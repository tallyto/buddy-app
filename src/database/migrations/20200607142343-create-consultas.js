module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('consultas', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    anamnese: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    avaliacao_clinica: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    prescricao: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    provider_id: {
      type: Sequelize.INTEGER,
      references: { model: 'providers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },
    pet_id: {
      type: Sequelize.INTEGER,
      references: { model: 'pets', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },
    data: {
      type: Sequelize.DATE,
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
  down: (queryInterface) => queryInterface.dropTable('consultas'),
};
