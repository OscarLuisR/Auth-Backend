const  routes = require('express').Router();

routes.use('/api/auth', require('./auth.routes'));
routes.use('/api/users', require('./users.routes'));
routes.use('/api/roles', require('./roles.routes'));

module.exports = routes;