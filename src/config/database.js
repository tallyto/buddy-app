module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'buddy@app123',
  database: 'buddypet',
  port: '5432',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
