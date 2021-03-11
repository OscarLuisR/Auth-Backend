const userModel = require('../models/user.model');
const roleModel = require('../models/role.model');

const usersCtrl = {};

usersCtrl.getUsers = async (req, res) => {
    try {
        const results = await userModel.find({}, {_id: 1, username: 1, email: 1}).populate({ path: 'rol', model: 'Roles', select: '_id rol' }).exec();

        res.status(200).json({ status: 200, error: false, message: '', results});        

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

usersCtrl.getUserId = async (req, res) => {
    const {id} = req.params;
    
    try {
        const results = await userModel.findById({_id: id}, {_id: 1, username: 1, email: 1}).populate({ path: 'rol', model: 'Roles', select: '_id rol' }).exec();

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

usersCtrl.createUser = async (req, res) => {    
    const { username, email, password, rol } = req.body;

    try {
        const newUsuario = new userModel({
            username,
            email,
            password: await userModel.encriptarPassword(password),
            rol
        });

        const results = await newUsuario.save();

        const rolFind = await roleModel.findById({_id: rol});

        res.status(200).json({ status: 200, error: false, message: '', results: {_id: results._id, username: results.username, email: results.email, rol: {_id: rol, rol: rolFind.rol} }});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

usersCtrl.updateUser = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        // VERIFICAR SI SE INGRESO UN PASSWORD
        if (password) {
            req.body.password = await userModel.encriptarPassword(password);
        }
        
        const results = await userModel.findByIdAndUpdate({_id: id}, req.body, {new: true, select: '_id username email'}).populate({ path: 'rol', model: 'Roles', select: '_id rol' }).exec(); 
        
        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }        
};

usersCtrl.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {        
        const results = await userModel.findByIdAndDelete({_id: id}, {select: '_id username email'}).populate({ path: 'rol', model: 'Roles', select: '_id rol' }).exec();

        res.status(200).json({ status: 200, error: false, message: '', results});
        
    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    } 
};

module.exports = usersCtrl;