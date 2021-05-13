module.exports = app => {
    const boletos = require("../controllers/boletos_controller");
  
    // ver peliculas
    app.post("/boletos", boletos.crear);
  
  
};