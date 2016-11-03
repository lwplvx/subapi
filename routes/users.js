var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list/', function(req, res, next) {
  res.send('list with a resource');
});

module.exports = router;
