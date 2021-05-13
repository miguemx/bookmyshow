const mysql = require("../lib/mysql");

// constructor
/**
 * c
 * @param {object} usuario el objeto con los datos del usuario
 */
const Usuario = function(usuario) {
    this.usuario_id = usuario.id;
    this.usuario_nombre = usuario.nombre;
    this.usuario_correo = usuario.correo;
    this.usuario_contrasena = usuario.contrasena;
};

/**
 * inserta un nuevo usuario en la base de datos
 * @param {string} usuario el objeto usuario con los datos a registrar
 * @param {function} result callback que se hara con el resultado
 */
Usuario.insert = (usuario, result) => {
    mysql.query("INSERT INTO usuarios SET ?", usuario, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        console.log("usuario creado: ", { id: res.insertId, ...usuario });
        result(null, { id: res.insertId, ...usuario });
    });
};


/**
 * encuentra un usuario a traves de su ID
 * @param {string} usuarioId el ID del usuario a buscar
 * @param {function} result el callback que ejecuta una vez que encuentra al usuario
 */
Usuario.find = (usuarioId, result) => {
    mysql.query(`SELECT * FROM usuarios WHERE usuario_id = ${usuarioId}`, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if (res.length) { // al ecnontrar usuarios, se devuelve el primero (no deberia haber mas de unoi)
            console.log("Encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }
        // se devuelve en el result el status de no ecnontrado y los datos en null
        result({ status: "not_found" }, null);
    });
};

/**
 * obtiene una lista de usuarios
 * @param {function} result 
 */
Usuario.getAll = result => {
    mysql.query("SELECT * FROM usuarios", (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("usuarios: ", res);
        result(null, res);
    });
};

/**
 * busca un usuario mediante su correo registrado
 * @param {string} correo el correo que envia el usuario
 * @param {function} result callback que se ejecuta despues de realizar la consulta
 */
Usuario.findByEmail = (correo, result) => {
    mysql.query(`SELECT * FROM usuarios WHERE usuario_correo = '${correo}'`, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if (res.length) { // al ecnontrar usuarios, se devuelve el primero (no deberia haber mas de unoi)
            console.log("Encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }
        // se devuelve en el result el status de no ecnontrado y los datos en null
        result({ status: "not_found" }, null);
    });
}


module.exports = Usuario;