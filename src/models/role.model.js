const { Schema, model } = require('mongoose');
const joi = require('joi');
const message = require('../libs/message');

const roleSchema = new Schema (
    {
        rol: {type: String, required: true, unique: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

roleSchema.statics.validaSchema = joi.object({
    rol: joi.string()
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

const roleModel = model('Roles', roleSchema);

module.exports = roleModel;