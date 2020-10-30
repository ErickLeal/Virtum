const express = require('express');
const routes = express.Router();

const controllers = require('./controllers');

routes.post('/cadastrar', controllers.userController.cadastrar);
routes.post('/login', controllers.userController.login);
routes.post('/alterarnome', controllers.userController.alterarnome);
routes.post('/buscaruserid', controllers.userController.buscaruserid);
routes.post('/addamigo', controllers.userController.adicionaramigo);

module.exports = routes;