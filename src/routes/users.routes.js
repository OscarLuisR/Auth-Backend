const { Router } = require('express');
const usersCtrl = require('../controllers/users.controller');
const { verificaToken, verificaPermisoAdmin, verificaDatosRegistroUser, verificaDatosUpdateUser } = require('../middlewares/index');

const router = Router();

router.get('/', [verificaToken, verificaPermisoAdmin], usersCtrl.getUsers);
router.get('/:id', [verificaToken, verificaPermisoAdmin], usersCtrl.getUserId);
router.post('/', [verificaToken, verificaPermisoAdmin, verificaDatosRegistroUser], usersCtrl.createUser);
router.put('/:id', [verificaToken, verificaPermisoAdmin, verificaDatosUpdateUser], usersCtrl.updateUser);
router.delete('/:id', [verificaToken, verificaPermisoAdmin], usersCtrl.deleteUser);

module.exports = router;