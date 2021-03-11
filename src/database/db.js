const mongoose = require('mongoose');
const message = require('../libs/message');

// Crea la Conexion
mongoose.connect(`mongodb://${process.env.HOST}:${process.env.PORT_DB}/${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
})
.then((bd) => {
    console.log(message.ok(` Conectado a la Base de Datos ${process.env.DATABASE} `));
})
.catch((err) => {
    console.log(message.error(` Error: ${err} `));
});