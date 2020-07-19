const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const Sentry = require('@sentry/node');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
require('./database');

class App {
  constructor() {
    Sentry.init({ dsn: 'https://8fcc08e7698c40d6908674de634f1227@o353944.ingest.sentry.io/5348601' });
    this.server = express();   
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors());
    this.server.get('/favicon.ico', (req, res) => res.status(204));
    this.server.use(morgan("combined", {
      skip: function (req, res) { return res.statusCode < 400 },
      stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    }))

  }
  routes() {
    this.server.use(routes);  
    this.server.use(Sentry.Handlers.errorHandler());
  }
}

module.exports = new App().server;
