const { Router } = require("express");
const UserController = require("./app/controllers/UserController.js");
const SessionController = require("./app/controllers/SessionController.js");
const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

module.exports = routes;
