const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const roleModel = require('../models/role.model');

const verificaUser = {};

verificaUser.verificaDatosRegistroUser = async (req, res, next) => {
    const { username, email, rol } = req.body;

    try {
        const { error } = await userModel.validaSchema.validate(req.body);

        if (error) {
            return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
        }

        // VERIFICAR SI EL USERNAME YA EXISTE EN LA BD
        const usernameFind = await userModel.findOne({ username: username }, { password: false });

        if (usernameFind) {
            return res.json({ status: 400, error: true, message: 'Usuario Ya Existe', results: "" });
        }

        // VERIFICAR SI EL EMAIL YA EXISTE EN LA BD
        const emailFind = await userModel.findOne({ email: email }, { password: false });

        if (emailFind) {
            return res.json({ status: 400, error: true, message: 'Email Ya Existe', results: "" });
        }

        // VERIFICAR SI EL ROL EXISTE EN LA BD
        const id_rol = await roleModel.findOne({ _id: rol });

        if (!id_rol) {
            return res.json({ status: 400, error: true, message: 'El Rol NO Existe', results: "" });
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaUser.verificaDatosUpdateUser = async (req, res, next) => {
    const { username, email, password, rol } = req.body;
    const { id } = req.params;

    try {
        const { error } = await userModel.validaSchema.validate(req.body);

        if (error) {
            // VERIFICAR QUE CAMPOS SE INGRESARON PARA COMPROBAR SI YA EXISTEN EN LA BD
            if ((username !== undefined && error.details[0].context.key == 'username') ||
                (email !== undefined && error.details[0].context.key == 'email') ||
                (password !== undefined && error.details[0].context.key == 'password') ||
                (rol !== undefined && error.details[0].context.key == 'rol')) {

                return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
            }
        }

        // SI SE INGRESO EL USERNAME SE VERIFICAR SI YA EXISTE EN LA BD PARA OTRO USUARIO
        if (username !== undefined) {
            const usernameFind = await userModel.findOne({ username: username }, { password: false });

            if (usernameFind) {
                if (id != usernameFind._id) {
                    return res.json({ status: 400, error: true, message: 'Usuario Ya Existe', results: "" });
                }
            }
        }

        // SI SE INGRESO EL EMAIL SE VERIFICAR SI YA EXISTE EN LA BD PARA OTRO USUARIO
        if (email !== undefined) {
            const emailFind = await userModel.findOne({ email: email }, { password: false });

            if (emailFind) {
                if (id != emailFind._id) {
                    return res.json({ status: 400, error: true, message: 'Email Ya Existe', results: "" });
                }
            }
        }

        // VERIFICAR SI EL ROL EXISTE EN LA BD
        if (rol !== undefined) {
            const id_rol = await roleModel.findOne({ _id: rol });

            if (!id_rol) {
                return res.json({ status: 400, error: true, message: 'El Rol No Existe', results: "" });
            }
        }
        
        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = verificaUser;