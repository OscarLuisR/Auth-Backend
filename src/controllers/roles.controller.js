const roleModel = require('../models/role.model');

const rolesCtrl = {};

rolesCtrl.getRoles = async (req, res) => {
    try {
        const results = await roleModel.find({}, {_id: 1, rol: 1});
        
        res.status(200).json({ status: 200, error: false, message: '', results});        

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

rolesCtrl.getRolId = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await roleModel.findById({_id: id}, {_id: 1, rol: 1});

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

rolesCtrl.createRol = async (req, res) => {  
    try {
        const newRol = new roleModel(req.body);

        const results = await newRol.save();
        
        res.status(200).json({ status: 200, error: false, message: '', results: {_id: results._id, rol: results.rol}});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

rolesCtrl.updateRol = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await roleModel.findByIdAndUpdate({_id: id}, req.body, {new: true, select: '_id rol'});

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }  
};

rolesCtrl.deleteRol = async (req, res) => {
    const { id } = req.params;

    try {        
        const results = await roleModel.findByIdAndDelete({_id: id}, {select: '_id rol'});
        
        res.status(200).json({ status: 200, error: false, message: '', results});
        
    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = rolesCtrl;