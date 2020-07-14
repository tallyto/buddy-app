module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('exames', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    exame: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    material: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    prazo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    valor_final: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    valor_laboratorio: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    laboratorio: {
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
  down: (queryInterface) => queryInterface.dropTable('exames'),
};
