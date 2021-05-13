module.exports = app => {
    const usuarios = require("../controllers/usuarios_controller.js");
  
    // crea un usuario
    app.post("/usuarios", usuarios.crear);
  
    // lista los usuarios
    app.get("/usuarios", usuarios.listar);
  
    // ver un usuario
    app.get("/usuarios/:usuarioId", usuarios.ver);

    // iniciar sesion
    app.post( "/usuarios/login", usuarios.login )
  
  
};