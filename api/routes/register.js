var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  res.send('Registrado Correctamente!');
});

router.get('/', function(req, res, next) {
  res.send('hola estas en la api de registro');
});

module.exports = router;
