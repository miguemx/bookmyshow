const UsuariosModel = require("../models/usuarios_model.js");
const jwt = require('../lib/jwt');

/**
 * crea un nuevo usuario
 * @param {object} req request 
 * @param {object} res response
 * @returns 
 */
exports.crear = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se han recibido datos"
        });
        return;
    }
    
    const usuario = new UsuariosModel({
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasena: req.body.contrasena
    });

    UsuariosModel.insert(usuario, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message
            });
        }
        else {
            res.status(201).send(data);
        } 
    });
};

/**
 * 
 * @param {object} req request
 * @param {*} res response
 */
exports.listar = (req, res) => {
    UsuariosModel.getAll((error, data) => {
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
exports.ver = (req, res) => {
    UsuariosModel.find(req.params.usuarioId, (error, data) => {
        if (error) {
            if (error.status === "not_found") {
                res.status(404).send({
                    message: `Not found  ${req.params.usuarioId}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Error  " + req.params.usuarioId
                });
            }
        } 
        else {
            res.send(data);
        } 
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.login = ( req, res ) => {
    if (!req.body.correo) {
        res.status(400).send({
            message: "No se han recibido datos"
        });
        return;
    }
    console.log( "BODYYYYYY",req.body );
    let { correo, contrasena } = req.body;
    UsuariosModel.findByEmail(correo, (error, data) => {
        if (error) {
            if (error.status === "not_found") {
                res.status(404).send({
                    message: `Not found  ${correo}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Error  " + correo
                });
            }
        } 
        else {
            if ( data.usuario_contrasena === contrasena ) {                    
                let token = jwt.cifrar({ customer: data.usuario_id });
                if ( token ) {
                    res.setHeader( 'xauth',token );
                }
                res.send(data);
            }
            else {
                res.status(401).send({
                    message: `Credenciales incorrectas  ${correo}.`
                });
            }
        } 
    });


}
