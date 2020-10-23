const express = require('express');
const routes = express.Router();

const controllers = require('./controllers');

routes.post('/cadastrar', controllers.userController.cadastrar);
routes.post('/login', controllers.userController.login);

module.exports = routes;