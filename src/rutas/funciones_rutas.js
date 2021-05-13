module.exports = app => {
    const funciones = require("../controllers/funciones_controller.js");
  
    // ver peliculas
    app.get("/funciones/ciudad/:ciudadId", funciones.ciudad);
  
  
};