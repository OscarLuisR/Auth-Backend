const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const joi = require('joi');
const message = require('../libs/message');

const userSchema = new Schema (
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        rol: { type: Schema.Types.ObjectId, ref: 'Roles'}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.statics.validaSchema = joi.object({
    username: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un UserName";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un UserName Valido";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe ingresar un Email";                        
                        break;
                    case "string.empty":                        
                    case "string.email":
                        err.message = "Debe ingresar un Email Valido";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    password: joi.string()
        .min(6)
        .max(20)
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe ingresar un Password";                        
                        break;
                    case "string.empty":
                    case "string.min":
                        err.message = "El Password debe tenaer un minimo de 6 carracteres";                        
                        break;
                    case "string.max":
                        err.message = "El Password debe tenaer un maximo de 20 carracteres";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),
    
    rol: joi.string() // TODO: OJO OJO OJO PASAR A ObjectId
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Rol";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Rol Valido";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        })
});

userSchema.statics.encriptarPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.compararPassword = async (passwordRecibido, password) => {
    return await bcrypt.compare(passwordRecibido, password);
};

const userModel = model('Users', userSchema);

module.exports = userModel;