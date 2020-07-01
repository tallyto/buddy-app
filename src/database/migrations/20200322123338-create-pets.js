module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('pets', {
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
    especie: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    raca: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pelagem: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sexo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    condicao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    temperamento: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    nascimento: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    notification_saude: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    notification_servicos: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
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
  down: (queryInterface) => queryInterface.dropTable('pets'),
};
