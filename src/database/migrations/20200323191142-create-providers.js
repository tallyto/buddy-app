
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('providers', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    endereco: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nascimento: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bio: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    categoria_id: {
      type: Sequelize.INTEGER,
      references: { model: 'categorias', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    },
    avatar_id: {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('providers'),
};
