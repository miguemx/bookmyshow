const mysql = require("../lib/mysql");

// constructor
const FuncionView = function(funcionView) {
    this.pelicula_id = pelicula.id;
    this.pelicula_nombre = pelicula.nombre;
    this.pelicula_poster  = pelicula.poster;
};

FuncionView.findByCity = (ciudadId, result) => {
    mysql.query(`SELECT * FROM view_funciones WHERE ciudad_id = ${ciudadId}`, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if (res.length) {
            console.log("Encontrado: ", res);
            result(null, res);
            return;
        }

        result({ status: "not_found" }, null);
    });
};

FuncionView.getAll = result => {
    mysql.query("SELECT * FROM view_funciones", (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("funciones: ", res);
        result(null, res);
    });
};

module.exports = FuncionView;