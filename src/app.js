const express = require('express');
const routes = require('./routes');
require('./database');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }


  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
