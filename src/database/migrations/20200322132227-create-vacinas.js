module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('vacinas', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    validade: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    pet_id: {
      type: Sequelize.INTEGER,
      references: { model: 'pets', key: 'id' },
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

  down: (queryInterface) => queryInterface.dropTable('vacinas'),
};
