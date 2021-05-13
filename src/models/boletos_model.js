const mysql = require("../lib/mysql");

// constructor
/**
 * c
 * @param {object} boleto el objeto con los datos del boleto
 */
const Boleto = function(boleto) {
    this.boleto_usuario = boleto.usuario;
    this.boleto_funcion = boleto.funcion;
};

/**
 * crea una nueva entrada de boletos
 * @param {string} usuario el objeto usuario con los datos a registrar
 * @param {function} result callback que se hara con el resultado
 */
 Boleto.insert = (boleto, result) => {
    mysql.query("INSERT INTO boletos SET ?", boleto, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        console.log("Boleto registrado: ", { id: res.insertId, ...boleto });
        result(null, { id: boleto.insertId, ...boleto });
    });
};

module.exports = Boleto;