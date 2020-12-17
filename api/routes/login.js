var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  res.send('Loggeado correctamente!');
});

router.get('/', function(req, res, next) {
  res.send('hola estas en la api de login');
});

module.exports = router;
