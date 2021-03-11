const chalk = require('chalk');

const message = {};

message.connected = chalk.inverse.green;
message.disconnected = chalk.inverse.magenta;
message.error = chalk.inverse.redBright;
message.finished = chalk.inverse.yellow;
message.ok = chalk.inverse.blue;

module.exports = message;