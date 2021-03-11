const { Router } = require('express');
const rolesCtrl = require('../controllers/roles.controller');
const { verificaToken, verificaPermisoAdmin, verificaDatosRegistroRol, verificaDatosUpdateRol } = require('../middlewares/index');

const router = Router();

router.get('/', [verificaToken , verificaPermisoAdmin], rolesCtrl.getRoles);
router.get('/:id', [verificaToken, verificaPermisoAdmin], rolesCtrl.getRolId);
router.post('/', [verificaToken, verificaPermisoAdmin, verificaDatosRegistroRol], rolesCtrl.createRol);
router.put('/:id', [verificaToken, verificaPermisoAdmin, verificaDatosUpdateRol], rolesCtrl.updateRol);
router.delete('/:id', [verificaToken, verificaPermisoAdmin], rolesCtrl.deleteRol);

module.exports = router;