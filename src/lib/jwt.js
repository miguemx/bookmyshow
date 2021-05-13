const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();


const jwt = function() {
    
} 

/**
 * cifra un JWT agregando el payload recibido
 * @param {object} payload los datos JSON a cifrar en el payload
 * @return {string} la cadena del token formado
 * @return {bool} false en caso de que no se pueda generar el token
 */
jwt.cifrar = (payload) => {
    try {
        let  token = jsonwebtoken.sign(payload, process.env.JWTKEY);
        return token;
    }
    catch (ex) {
        console.log(ex);
        return false;
    }
};


/**
 * obtiene los valores del JWT si esta bien formado, o regresa falso si no esta correcto
 * @param {string} token 
 * @returns {objetct} el objeto del payoad
 * @return {bool} false en caso de algun error
 */
jwt.descifrar = (token) => {
    try {
        var decoded = jsonwebtoken.verify(token, process.env.JWTKEY);
    }
    catch (ex) {
        console.log( ex );
        return false;
    }
    return decoded;
};

module.exports = jwt;