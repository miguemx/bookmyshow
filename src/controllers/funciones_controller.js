const FuncionesModel = require("../models/funciones_model.js");
const jwt = require('../lib/jwt');

exports.listar = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se han recibido datos"
        });
        return;
    }
    
    FuncionesModel.getAll((error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message
            });
        }
        else {
            res.send(data);
        } 
    });
};

/**
 * busca un usuario en particular
 * @param {*} req objeto con la solicitud
 * @param {*} res objeto con la respuesta
 */
exports.ciudad = (req, res) => {
    let token = req.header('xauth');
    if ( !token ) {
        res.status(401).send({
            message: "Acceso no autorizado"
        });
        return;
    }
    
    let payload = jwt.descifrar(token);
    if ( !payload ) {
        res.status(401).send({
            message: "Acceso no autorizado"
        });
        return;
    }

    FuncionesModel.findByCity(req.params.ciudadId, (error, data) => {
        if (error) {
            if (error.status === "not_found") {
                res.status(404).send({
                    message: `No hay funciones en tu ciudad  ${req.params.ciudadId}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Error 500 " + req.params.ciudadId
                });
            }
        } 
        else {
            res.send(data);
        } 
    });
};
