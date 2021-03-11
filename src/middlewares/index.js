const { verificaDatosLogin, verificaToken, verificaPermisoAdmin, verificaPermisoUser, verificaPermisoGuest} = require('./verificaAuth');
const { verificaDatosRegistroUser, verificaDatosUpdateUser } = require('./verificaUser');
const { verificaDatosRegistroRol, verificaDatosUpdateRol } = require('./verificaRol');

module.exports = {
    verificaDatosLogin,
    verificaToken,
    verificaDatosRegistroUser, 
    verificaDatosUpdateUser,
    verificaDatosRegistroRol, 
    verificaDatosUpdateRol,
    verificaPermisoAdmin, 
    verificaPermisoUser,
    verificaPermisoGuest
};
