const { connect, connection } = require('mongoose');

// create new database called sociualNetworkdb if it doesn't exist
connect('mongodb://127.0.0.1:27017/socialNetworkdb');

module.exports = connection;
