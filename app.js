var express = require("express");
var app = express();
app.use( express.json() );

require("./src/rutas/usuarios_rutas")(app);
require("./src/rutas/funciones_rutas")(app);
require("./src/rutas/boletos_rutas")(app);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
