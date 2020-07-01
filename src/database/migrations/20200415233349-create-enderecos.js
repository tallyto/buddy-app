module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('enderecos', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rua: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numero: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    complemento: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cep: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bairro: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cidade: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    estado: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
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
  down: (queryInterface) => queryInterface.dropTable('enderecos'),
};
