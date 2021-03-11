const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authCtrl = {};

authCtrl.loginUsuario = async (req, res) => {
    try {
        // Genera el TOKEN
        const token = await jwt.sign({ _id: req._id, username: req.username, id_rol: req.id_rol, rol: req.rol }, process.env.SECRET, {expiresIn: '2h' /*expiresIn: 86400 // 24 horas*/});

        res.status(201).json({ status: 201, error: false, message: '', results:[{token, _id: req._id, username: req.username, id_rol: req.id_rol, rol: req.rol}] });
        
    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }    
};

module.exports = authCtrl;