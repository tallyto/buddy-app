const App = require('./app');

const PORT = process.env.PORT || 3001;

App.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
