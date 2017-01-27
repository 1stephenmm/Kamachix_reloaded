var express = require('express');
var router = express.Router();
var configdb = require("../config/dbConfig.js");

//variable que controla el pool de conexiones
var pool = configdb.configdb();
//metodo que se llama despues de invocar por POST a la pagina
//la funcion anonima que resive tiene tres parametros
//req que es la peticion
//res que esla respuesta
//next que es la siguiente function

router.get('/', function(req, res, next) {

  if(req.query.c == 1)
    var sql = 'SELECT sl."Programa" FROM "Datawarehouse"."KPI_Satisfaction_level" sl GROUP BY sl."Programa" ORDER BY sl."Programa"';
  else if (req.query.c ==2)
    var sql = 'SELECT sl."Anho" FROM "Datawarehouse"."KPI_Satisfaction_level" sl GROUP BY sl."Anho" ORDER BY sl."Anho"';
  else return console.log("error");
  //aqui se crea la conexion a DB
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    //Aqui es donde se realiza el query de la DB
    //resive el sql, el arreglo siguiente contiene los parametros que van en el sql  preparado
    //la funcion anonima recive la variable de err que controla el error  y la result
    //que es la que controla el resultado de la consulta el cual es un JSON
    client.query(sql, function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.json(result);
    });
  });
  //se ejecuta si el usuario o password no son correctas y no se puede conectar al SGBD
  pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack)
  });

});

module.exports = router;
