var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //valida si existe variable de session
  if(req.session.name!=null) {
    if(req.session.rol!=1){
      res.render('indicadores',{title:'Indicadores', rols:'display:none', refe: 'logout', textmsg: 'Salir'});
    }else{
      res.render('indicadores',{title:'Indicadores', rols:'display:block', arch: 'display:block', refe: 'logout', textmsg: 'Salir'});
    }

  }
  else {
    res.render('indicadores',{title:'Indicadores', rols:'display:none', arch: 'display:none', refe: 'login', textmsg: 'Iniciar'});
  }
});

module.exports = router;
