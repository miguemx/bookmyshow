const BoletosModel = require("../models/boletos_model");
const jwt = require('../lib/jwt');


/**
 * crea un nuevo usuario
 * @param {object} req request 
 * @param {object} res response
 * @returns 
 */
 exports.crear = (req, res) => {
    const token = req.header("xauth");
    if ( !token ) {
        res.status(401).send({
            message: "Acceso no autorizado. Llave inexistente."
        });
        return;
    }
    let payload = jwt.descifrar(token);
    if ( !payload ) {
        res.status(401).send({
            message: "Acceso no autorizado. Datos de sesion no válidos."
        });
        return;
    }

    if (!req.body.funcion) {
        res.status(400).send({
            message: "No se han recibido datos"
        });
        return;
    }
    console.log( payload );
    const boleto = new BoletosModel({
        usuario: payload.customer,
        funcion: req.body.funcion,
    });

    BoletosModel.insert(boleto, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message
            });
        }
        else {
            data.message = 'Boleto reservado correctamente';
            res.status(201).send(data);
        } 
    });
};
