const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const verificaAuth = {};

verificaAuth.verificaDatosLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const { error } = await userModel.validaSchema.validate(req.body);

        if (error) {
            // VERIFICAR SI LOS ERRORES SON PRODUCIDOS POR LOS CAMPOS EMAIL Y  PASSWORD
            if (error.details[0].context.key == 'email' || error.details[0].context.key == 'password') {
                return res.json({ status: 401, error: true, message: error.details[0].message, results: "" });
            }
        }

        // VERIFICAR SI EL EMAIL NO EXISTE EN LA BD
        const user = await userModel.findOne({ email: email }).populate({ path: 'rol', model: 'Roles' }).exec();

        if (!user) {
            return res.json({ status: 401, error: true, message: 'Acceso DENEGADO', results: "" });
        }

        // VERIFICAR SI EL PASSWORD INTRODUCIDO COINCIDE CON EL DE LA BD    
        const comparacion = await userModel.compararPassword(password, user.password);

        if (!comparacion) {
            return res.json({ status: 401, error: true, message: 'Acceso DENEGADO', results: "" });
        }

        // VERIFICAR QUE POSEA UN ROL VALIDO
        if (!user.rol) {
            return res.json({ status: 401, error: true, message: 'Acceso DENEGADO', results: "" });
        }

        req._id = user._id;
        req.username = user.username;
        req.id_rol = user.rol._id;
        req.rol = user.rol.rol;
        
        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaAuth.verificaToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        // VALIDA QUE LE ENVIEN LA CABECERA
        if (!token) {
            return res.json({ status: 401, error: true, message: 'Falta Token', results: "" });
        }

        // VALIDA QUE EL TOKEN SEA VALIDO
        const decoded = jwt.verify(token, process.env.SECRET);

        req._id = decoded._id;
        req.username = decoded.username;
        req.id_rol = decoded.id_rol;
        req.rol = decoded.rol;

        // VALIDA QUE EL USUARIO DEL TOKEN EXISTA
        const user = await userModel.findById(req._id, { password: false }).populate({ path: 'rol', model: 'Roles' }).exec();

        if (!user) {
            return res.json({ status: 401, error: true, message: 'Token Invalido', results: "" });            
        }

        // VERIFICAR QUE POSEA UN ROL VALIDO
        if (!user.rol) {
            return res.json({ status: 401, error: true, message: 'Token Invalido', results: "" });
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaAuth.verificaPermisoAdmin = async (req, res, next) => {
    if (!req.rol.includes("Admin")) {
        return res.json({ status: 404, error: true, message: 'Requiere Permiso de Administrador', results: "" });
    }

    next();
};

verificaAuth.verificaPermisoUser = async (req, res, next) => {
    if (!req.rol.includes("Admin", "User")) {
        return res.json({ status: 404, error: true, message: 'Requiere Permiso de Usuario', results: "" });
    }

    next();
};

verificaAuth.verificaPermisoGuest = async (req, res, next) => {
    if (!req.rol.includes("Admin", "User", "Guest")) {
        return res.json({ status: 404, error: true, message: 'Requiere Permiso de Invitado', results: "" });
    }
        
    next();
};

module.exports = verificaAuth;