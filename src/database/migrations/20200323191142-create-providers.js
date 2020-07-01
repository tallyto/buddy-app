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
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    nascimento: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    bio: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    clinica: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    passeador: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    adestrador: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    crmv: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    location: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    notification: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    crmv_file: {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    },
    categoria_id: {
      type: Sequelize.INTEGER,
      references: { model: 'categoria', key: 'id' },
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
