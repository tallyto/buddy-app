module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'buddypet',
  port: '5432',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
