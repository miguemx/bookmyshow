var mysql      = require('mysql');
require('dotenv').config()


var connection = mysql.createConnection({
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database : process.env.DBNAME
});

// realizar la conexion
connection.connect(error => {
    if (error) throw error;
    console.log("Se ha conectado a la base de datos.");
});

module.exports = connection;