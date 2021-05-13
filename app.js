var express = require("express");
var app = express();
app.use( express.json() );

require("./src/rutas/usuarios_rutas")(app);
require("./src/rutas/funciones_rutas")(app);
require("./src/rutas/boletos_rutas")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server running on port " + port);
});
