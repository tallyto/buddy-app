const express = require('express');
require('express-async-errors');
const cors = require('cors');
const path = require('path');
const Youch = require('youch');
const Sentry = require('@sentry/node');
const sentryConfig = require('./config/sentry');
const routes = require('./routes');
require('./database');

class App {
  constructor() {
    this.server = express();
    // Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors());
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  
  exceptionHandler() {
    this.server.use(async (erro, req, res, next) => {
      const errors = await new Youch(erro, req).toJSON();

      return res.status(500).json(errors);
    });
  }

}

module.exports = new App().server;
