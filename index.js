const app = require('./src/app');
const message = require('./src/libs/message');

// Base de Datos
require('./src/database/db');

// inicio del servidor 
app.listen(app.get('port'), (err) => {
    if (err) {
        console.log(message.error(` Error: ${err} `));
    } else {
        console.log(message.connected(` Servidor corriendo en el puerto: ${app.get('port')} `));
    }    
});