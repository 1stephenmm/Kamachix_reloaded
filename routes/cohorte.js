var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //valida si esta creada la variable de sesion caso contrario envia mensaje de error
  if(req.session.name!=null) {
    if(req.session.rol!=1){
      res.render('cohorte',{title:'Cohorte', rols:'display:none'});
    }else{
      res.render('cohorte',{title:'Cohorte', rols:'display:block'});
    }
  }
  else {
    res.send("No inicio Sesión Apropiadamente");
    res.end();
  }
});

module.exports = router;
