const userModel = require('../models/user.model');
const roleModel = require('../models/role.model');

const InitialSetup = {};

InitialSetup.createRolUserAdmin = async () => {
    try {
        let id_rol;

        // Verifica si existe el Rol de Administrdor
        const rolFind = await roleModel.findOne({ rol: 'Admin' });

        // Si existe toma el campo id_rol
        if (rolFind) {   
            id_rol = rolFind._id;         
        }else {
            const newRole = new roleModel({rol: 'Admin'});
    
            // Si NO existe, crea el registro en la tabla
            const role = await newRole.save();

            if (!role) {
                return;
            }

            // Obtiene el campo id_rol
            id_rol = role._id;

            console.log('Rol Creado!');
        }

        // Verifica si existe el Usuario Administrdor
        const userFind = await userModel.findOne({ email: 'admin@admin.com' }, {password: false});

        if (!userFind) {
            const newUsuario = new userModel({
                username: "Admin",
                email: "admin@admin.com",
                password: await userModel.encriptarPassword('admin'),
                rol: id_rol
            });
    
            const user = await newUsuario.save();

            if (!user) {
                return;                
            }

            console.log('Usuario Creado!');
        }
        
    } catch (err) {
        console.log(err);
    }
};

module.exports = InitialSetup;