const { Router } = require('express');
const authCtrl = require('../controllers/auth.controller');
const { verificaDatosLogin, verificaPermisoAdmin } = require('../middlewares/index');

const router = Router();

router.post('/login', verificaDatosLogin, authCtrl.loginUsuario);

module.exports = router;